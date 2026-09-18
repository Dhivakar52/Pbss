import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomPanel from '@/common/CustomPanel'
import { Field, SelectField, TextField } from '@/components/FormPrimitives'
import { AdminDataTable } from '@/components/AdminDataTable'
import { mockStudents, type StudentRecord } from '@/data/mockStudents'
import {
  ALLOWED_REPORT_TYPES,
  getReportConfig,
  type ReportFieldConfig,
} from '@/config/reportConfigs'
import { PrintPreviewModal } from '@/components/PrintPreviewModal'
import { createPrintDataFromStudent } from '@/data/mockPrintDatasets'
import {
  User,
  Briefcase,
  MapPin,
  Trash2,
  AlertTriangle
} from 'lucide-react'
import { toast } from '@/components/ui/toast'

export const AdminReports: React.FC = () => {
  const navigate = useNavigate()

  // Selected Report Type Key — Default: 'master'
  const [selectedReportKey, setSelectedReportKey] = useState<string>('master')

  // Search Executed State (True by default so Master loads automatically on page open)
  const [isSearched, setIsSearched] = useState<boolean>(true)

  // Dynamic Filter Values dictionary
  const [filterValues, setFilterValues] = useState<Record<string, string>>({})

  // Filter Panel side drawer open state
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)

  // View Details CustomPanel State & Delete Confirmation State
  const [viewingStudent, setViewingStudent] = useState<StudentRecord | null>(null)
  const [deletingStudent, setDeletingStudent] = useState<StudentRecord | null>(null)

  // Print Preview Modal State
  const [printDocType, setPrintDocType] = useState<'registrationForm' | 'trackSheet' | null>(null)
  const [printStudent, setPrintStudent] = useState<StudentRecord | null>(null)

  // Report Data Output State (Default: mockStudents for initial Master load)
  const [reportData, setReportData] = useState<StudentRecord[]>(mockStudents)

  // Configuration for currently selected report in dropdown
  const selectedReportConfig = getReportConfig(selectedReportKey)

  // Filter value change handler
  const handleFilterChange = (key: string, value: string) => {
    setFilterValues((prev) => ({ ...prev, [key]: value }))
  }

  // Handle Report Type change (IMMEDIATELY updates selectedReportKey, clears filters, and loads selected report dataset)
  const handleReportTypeChange = (selectedVal: string) => {
    const matched = ALLOWED_REPORT_TYPES.find((r) => r.value === selectedVal || r.key === selectedVal)
    const newKey = matched ? matched.key : 'master'
    setSelectedReportKey(newKey)
    setFilterValues({})
    setReportData(mockStudents)
    setIsSearched(true)
  }

  // Reusable generic filter engine pipeline
  const applyReportFilters = (data: StudentRecord[], filters: Record<string, string>): StudentRecord[] => {
    return data.filter((item) => {
      // Loop over all populated filter values for the selected report
      for (const [key, rawVal] of Object.entries(filters)) {
        if (!rawVal || rawVal === 'Select' || rawVal === '-- Select --') continue

        const k = key.toLowerCase()
        const val = rawVal.trim().toLowerCase()

        // 1. Registration / Application Number
        if (k === 'application_number' || k === 'registration_number') {
          if (!item.registrationNumber.toLowerCase().includes(val)) return false
          continue
        }

        // 2. Student Name
        if (k === 'student_name') {
          if (!item.studentName.toLowerCase().includes(val)) return false
          continue
        }

        // 3. Father Name
        if (k === 'father_name') {
          if (!item.fatherName.toLowerCase().includes(val)) return false
          continue
        }

        // 4. Mother Name
        if (k === 'mother_name') {
          if (!item.motherName.toLowerCase().includes(val)) return false
          continue
        }

        // 5. Gender
        if (k === 'gender') {
          if (item.gender.toLowerCase() !== val) return false
          continue
        }

        // 6. Religion
        if (k === 'religion') {
          if (item.religion.toLowerCase() !== val) return false
          continue
        }

        // 7. Caste / Sub Caste
        if (k === 'caste_name' || k === 'sub_caste_name' || k === 'caste') {
          if (!item.caste.toLowerCase().includes(val)) return false
          continue
        }

        // 8. Community
        if (k === 'community') {
          if (item.community.toLowerCase() !== val) return false
          continue
        }

        // 9. Mother Tongue
        if (k === 'mother_tongue' || k === 'student_language') {
          if (item.motherTongue.toLowerCase() !== val) return false
          continue
        }

        // 10. Nationality
        if (k === 'nationality') {
          const nat = (item as any).nationality
          if (nat && String(nat).toLowerCase() !== val) return false
          continue
        }

        // 11. Academic Year
        if (k === 'academic_year') {
          if (item.academicYear !== rawVal) return false
          continue
        }

        // 12. School Branch / Applied For
        if (k === 'school_applied_for' || k === 'school_name' || k === 'othterschoolname') {
          if (item.schoolBranch !== rawVal && !item.schoolBranch.toLowerCase().includes(val)) return false
          continue
        }

        // 13. Application Status
        if (k === 'application_status') {
          if (item.applicationStatus !== rawVal) return false
          continue
        }

        // 14. Alumni Flags
        if (k.includes('alumni')) {
          const isYes = val === 'yes' || val === 'true'
          const isNo = val === 'no' || val === 'false'
          if (isYes && !item.alumni) return false
          if (isNo && item.alumni) return false
          continue
        }

        // 15. Play School
        if (k.includes('playschool')) {
          const isYes = val === 'yes' || val === 'true'
          const isNo = val === 'no' || val === 'false'
          if (isYes && !item.playSchool) return false
          if (isNo && item.playSchool) return false
          continue
        }

        // 16. Physically Challenged
        if (k.includes('physically_challenged')) {
          const isYes = val === 'yes' || val === 'true'
          const isNo = val === 'no' || val === 'false'
          if (isYes && !item.physicallyChallenged) return false
          if (isNo && item.physicallyChallenged) return false
          continue
        }

        // 17. Sibling Flags
        if (k.includes('sibling') && (k.includes('flag') || k.includes('studying'))) {
          const isYes = val === 'yes' || val === 'true'
          const isNo = val === 'no' || val === 'false'
          if (isYes && !item.siblingsStudying) return false
          if (isNo && item.siblingsStudying) return false
          continue
        }

        // Fallback generic property check
        const propVal = (item as any)[key] || (item as any)[k]
        if (propVal !== undefined && propVal !== null) {
          if (!String(propVal).toLowerCase().includes(val)) return false
        }
      }

      return true
    })
  }

  // SEARCH Handler (Triggered when user clicks Search button in side drawer)
  const handleSearch = () => {
    const filtered = applyReportFilters(mockStudents, filterValues)
    setReportData(filtered)
    setIsSearched(true)
    toast.success(`Search completed for ${selectedReportConfig.label}: ${filtered.length} records found`)
  }

  // Clear Handler
  const handleClear = () => {
    setFilterValues({})
    setReportData(mockStudents)
    toast.info('Report filters cleared')
  }

  // Export Handler
  const handleExportExcel = () => {
    toast.success(`Exported ${selectedReportConfig.label} (${reportData.length} records) to Excel successfully!`)
  }

  // Edit Action Handler
  const handleEdit = (student: StudentRecord) => {
    localStorage.setItem('editingStudent', JSON.stringify(student))
    localStorage.setItem('fromAdmin', 'true')
    toast.success(`Opening Application Details form to edit ${student.studentName}`)
    navigate('/admission/application-details')
  }

  // Delete Action Handler
  const handleDeleteConfirm = () => {
    if (!deletingStudent) return
    setReportData((prev) => prev.filter((s) => s.id !== deletingStudent.id))
    toast.success(`Deleted student report record: ${deletingStudent.registrationNumber}`)
    setDeletingStudent(null)
  }

  // Render control for each dynamic field from JSON metadata
  const renderControl = (field: ReportFieldConfig) => {
    const val = filterValues[field.key] || ''

    if (field.type === 'boolean') {
      return (
        <SelectField
          value={val}
          onChange={(v) => handleFilterChange(field.key, v)}
          placeholder="Select"
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
          ]}
        />
      )
    }

    if (field.type === 'select') {
      return (
        <SelectField
          value={val}
          onChange={(v) => handleFilterChange(field.key, v)}
          placeholder="Select"
          options={field.options || ['Yes', 'No']}
        />
      )
    }

    if (field.type === 'date') {
      return (
        <TextField
          type="date"
          value={val}
          onChange={(v) => handleFilterChange(field.key, v)}
          placeholder="Select date"
        />
      )
    }

    if (field.type === 'number') {
      return (
        <TextField
          type="number"
          value={val}
          onChange={(v) => handleFilterChange(field.key, v)}
          placeholder="Enter count"
        />
      )
    }

    return (
      <TextField
        value={val}
        onChange={(v) => handleFilterChange(field.key, v)}
        placeholder={`Enter ${field.label}`}
      />
    )
  }

  // Dynamic Page Subtitle for Main Report View
  const mainReportSubtitle = `${selectedReportConfig.label} — ${reportData.length} records found (${selectedReportConfig.fields.length} columns active)`

  // ================= MAIN REPORT LIST & CUSTOM PANEL SIDE DRAWER =================
  return (
    <div className="space-y-6">
      {/* ================= MAIN DATA TABLE ================= */}
      <AdminDataTable
        title={`Report: ${selectedReportConfig.label}`}
        subtitle={mainReportSubtitle}
        data={reportData}
        columns={selectedReportConfig.fields}
        isSearched={isSearched}
        isFilterDrawerOpen={isFilterPanelOpen}
        disableStickyCols={selectedReportKey.toLowerCase().includes('student')}
        reportTypeControl={
          <SelectField
            value={selectedReportConfig.label}
            onChange={handleReportTypeChange}
            placeholder="-- Select Report --"
            options={ALLOWED_REPORT_TYPES.map((r) => ({ value: r.value, label: r.label }))}
          />
        }
        onView={(student) => setViewingStudent(student)}
        onEdit={handleEdit}
        onDelete={(student) => setDeletingStudent(student)}
        onPrintRegistrationForm={(student) => {
          setPrintStudent(student)
          setPrintDocType('registrationForm')
        }}
        onPrintTrackSheet={(student) => {
          setPrintStudent(student)
          setPrintDocType('trackSheet')
        }}
        showCheckmarkCols={true}
        onToggleFilterPanel={() => setIsFilterPanelOpen(true)}
        onExportExcel={handleExportExcel}
        onPrint={() => window.print()}
      />

      {/* ================= PRINT PREVIEW MODAL ================= */}
      {printDocType && printStudent && (
        <PrintPreviewModal
          isOpen={!!printDocType}
          documentType={printDocType}
          data={createPrintDataFromStudent(printStudent)}
          onClose={() => {
            setPrintDocType(null)
            setPrintStudent(null)
          }}
        />
      )}

      {/* ================= CUSTOM SIDE DRAWER FILTER PANEL ================= */}
      <CustomPanel
        isOpen={isFilterPanelOpen}
        title="Reports & Custom Filter Options"
        onClose={() => setIsFilterPanelOpen(false)}
        onSave={() => {
          handleSearch()
          setIsFilterPanelOpen(false)
        }}
        saveLabel="Search"
        width="600px"
      >
        <div className="space-y-4">
          {/* ================= DYNAMIC FILTER AREA ================= */}
          <div className="p-4 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border-2 border-dashed border-blue-300 dark:border-blue-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div>
                <span className="text-xs font-bold text-blue-950 dark:text-blue-200 block uppercase tracking-wider">
                  Report Type({selectedReportConfig.label})
                </span>
                {/* <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Report-specific fields configured via JSON metadata
                </span> */}
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 rounded-full border border-blue-200 dark:border-blue-800">
                {selectedReportConfig.fields.length} Fields
              </span>
            </div>

            <div className="max-h-[480px] overflow-y-auto pr-1 space-y-3 scrollbar-thin">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {selectedReportConfig.fields.map((field) => (
                  <Field key={field.key} label={field.label} span={field.span || 1}>
                    {renderControl(field)}
                  </Field>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action Links */}
          <div className="pt-2 flex justify-between items-center border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
            >
              Reset All Filters
            </button>

            <button
              type="button"
              onClick={handleExportExcel}
              className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer flex items-center gap-1"
            >
              Export to Excel
            </button>
          </div>
        </div>
      </CustomPanel>

      {/* ================= VIEW DETAILS CUSTOM PANEL ================= */}
      <CustomPanel
        isOpen={!!viewingStudent}
        title={`Application Details - ${viewingStudent?.registrationNumber || ''}`}
        onClose={() => setViewingStudent(null)}
        onSave={() => {
          if (viewingStudent) {
            handleEdit(viewingStudent)
          }
        }}
        saveLabel="Edit Application"
        width="580px"
      >
        {viewingStudent && (
          <div className="space-y-5">
            {/* Student Banner */}
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-200 block font-semibold">Registration Number</span>
                <span className="text-lg font-extrabold tracking-wide">{viewingStudent.registrationNumber}</span>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${viewingStudent.applicationStatus === 'Declared' ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30' :
                viewingStudent.applicationStatus === 'Approved' ? 'bg-blue-500/20 text-blue-200 border border-blue-400/30' :
                  'bg-amber-500/20 text-amber-200 border border-amber-400/30'
                }`}>
                {viewingStudent.applicationStatus}
              </span>
            </div>

            {/* Child Information */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                <User className="h-4 w-4 text-blue-600" /> Child Information
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block text-[11px]">Full Name</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{viewingStudent.studentName}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block text-[11px]">Gender</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{viewingStudent.gender}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block text-[11px]">Date of Birth</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{viewingStudent.date}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block text-[11px]">Mother Tongue</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{viewingStudent.motherTongue}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block text-[11px]">Religion</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{viewingStudent.religion}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block text-[11px]">Caste / Community</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{viewingStudent.caste} ({viewingStudent.community})</span>
                </div>
              </div>
            </div>

            {/* Parents & Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                <Briefcase className="h-4 w-4 text-purple-600" /> Parents & Contact
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block text-[11px]">Father's Name</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{viewingStudent.fatherName}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block text-[11px]">Mother's Name</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{viewingStudent.motherName}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block text-[11px]">Mobile Number</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{viewingStudent.mobile}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                  <span className="text-slate-500 block text-[11px]">Income Range</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{viewingStudent.incomeRange}</span>
                </div>
              </div>
            </div>

            {/* Residence */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 border-b pb-2">
                <MapPin className="h-4 w-4 text-amber-600" /> Residence Details
              </h4>
              <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                <div>
                  <span className="text-slate-500 block text-[11px]">Area & City</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{viewingStudent.area}, {viewingStudent.city}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[11px]">Distance from School</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{viewingStudent.distanceKm}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CustomPanel>

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deletingStudent && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 bg-rose-100 dark:bg-rose-950/50 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Delete Report Record</h3>
                <p className="text-xs text-slate-500">Confirm permanent deletion of record</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300">
              Are you sure you want to delete application record <strong className="text-slate-900 dark:text-white">{deletingStudent.registrationNumber}</strong> ({deletingStudent.studentName})? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setDeletingStudent(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" /> Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
