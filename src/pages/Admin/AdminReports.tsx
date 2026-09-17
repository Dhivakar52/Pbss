import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomPanel from '@/common/CustomPanel'
import { Field, TextField, SelectField } from '@/components/FormPrimitives'
import { AdminDataTable } from '@/components/AdminDataTable'
import { mockStudents, type StudentRecord } from '@/data/mockStudents'
import {
  FileText,
  Search,
  RotateCcw,
  Download,
  ArrowLeft,
  Printer,
  Edit3,
  User,
  Briefcase,
  MapPin,
  GraduationCap,
  Trash2,
  AlertTriangle
} from 'lucide-react'
import { toast } from '@/components/ui/toast'
import logoImg from '@/assets/images/logo.png'

export const AdminReports: React.FC = () => {
  const navigate = useNavigate()

  // Report Selector (Defaults to empty)
  const [reportType, setReportType] = useState<string>('')

  // Detailed Filter Form state (Defaults to empty - no preselected values)
  const [academicYear, setAcademicYear] = useState('')
  const [schoolBranch, setSchoolBranch] = useState('')
  const [applicationStatus, setApplicationStatus] = useState('')
  const [playSchool, setPlaySchool] = useState('')
  const [physicallyChallenged, setPhysicallyChallenged] = useState('')
  const [gender, setGender] = useState('')
  const [motherTongue, setMotherTongue] = useState('')
  const [nationality, setNationality] = useState('')
  const [alumni, setAlumni] = useState('')
  const [religion, setReligion] = useState('')
  const [caste, setCaste] = useState('')
  const [community, setCommunity] = useState('')
  const [siblings, setSiblings] = useState('')
  const [regNoSearch, setRegNoSearch] = useState('')

  // Filter Panel side drawer open state
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)

  // View Details CustomPanel State & Delete Confirmation State
  const [viewingStudent, setViewingStudent] = useState<StudentRecord | null>(null)
  const [deletingStudent, setDeletingStudent] = useState<StudentRecord | null>(null)

  // Report Data Output State
  const [reportData, setReportData] = useState<StudentRecord[]>(mockStudents)

  // Filter Handler
  const handleSearch = () => {
    let filtered = mockStudents.filter((item) => {
      if (academicYear && item.academicYear !== academicYear) return false
      if (schoolBranch && item.schoolBranch !== schoolBranch) return false
      if (applicationStatus && item.applicationStatus !== applicationStatus) return false
      if (gender && item.gender !== gender) return false
      if (motherTongue && item.motherTongue.toLowerCase() !== motherTongue.toLowerCase()) return false
      if (regNoSearch && !item.registrationNumber.toLowerCase().includes(regNoSearch.toLowerCase())) return false
      return true
    })
    setReportData(filtered)
    toast.success(`Generated ${reportType || 'Detailed'} Report: ${filtered.length} records found`)
  }

  // Clear Handler
  const handleClear = () => {
    setReportType('')
    setAcademicYear('')
    setSchoolBranch('')
    setApplicationStatus('')
    setPlaySchool('')
    setPhysicallyChallenged('')
    setGender('')
    setMotherTongue('')
    setNationality('')
    setAlumni('')
    setReligion('')
    setCaste('')
    setCommunity('')
    setSiblings('')
    setRegNoSearch('')
    setReportData(mockStudents)
    toast.info('Report filters cleared')
  }

  // Export Handler
  const handleExportExcel = () => {
    toast.success('Report exported to Excel successfully!')
  }

  // Edit Action Handler
  const handleEdit = (student: StudentRecord) => {
    localStorage.setItem('editingStudent', JSON.stringify(student))
    toast.success(`Opening Application Details form to edit ${student.studentName}`)
    navigate('/home/application-details')
  }

  // Delete Action Handler
  const handleDeleteConfirm = () => {
    if (!deletingStudent) return
    setReportData((prev) => prev.filter((s) => s.id !== deletingStudent.id))
    toast.success(`Deleted student report record: ${deletingStudent.registrationNumber}`)
    setDeletingStudent(null)
  }

  // ================= MAIN REPORT LIST & CUSTOM PANEL SIDE DRAWER =================
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <AdminDataTable
        title="Report Application Master List"
        subtitle="Detailed record listing."
        data={reportData}
        onView={(student) => setViewingStudent(student)}
        onEdit={handleEdit}
        onDelete={(student) => setDeletingStudent(student)}
        showCheckmarkCols={true}
        onToggleFilterPanel={() => setIsFilterPanelOpen(true)}
        onExportExcel={handleExportExcel}
        onPrint={() => window.print()}
      />

      {/* ================= CUSTOM SIDE DRAWER FILTER PANEL ================= */}
      <CustomPanel
        isOpen={isFilterPanelOpen}
        title="Reports & Custom Filter Options"
        onClose={() => setIsFilterPanelOpen(false)}
        onSave={() => {
          handleSearch()
          setIsFilterPanelOpen(false)
        }}
        saveLabel="Generate Report"
        width="540px"
      >
        <div className="space-y-4">
          <div className="p-3.5 bg-blue-50/80 dark:bg-blue-950/40 rounded-xl border border-blue-100 dark:border-blue-900 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-blue-900 dark:text-blue-200 block">Report Type</span>
              <span className="text-[11px] text-blue-700/80 dark:text-blue-400">Select report output format</span>
            </div>
            <div className="w-44">
              <SelectField
                value={reportType}
                onChange={(val) => setReportType(val)}
                placeholder="-- Select Report --"
                options={[
                  { value: 'Detailed', label: 'Detailed Report' },
                  { value: 'Summary', label: 'Application Summary' },
                  { value: 'Branch', label: 'Branch-wise Report' },
                  { value: 'Status', label: 'Status Report' },
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Academic Year">
              <SelectField
                value={academicYear}
                onChange={setAcademicYear}
                placeholder="-- Select --"
                options={['2025-26', '2024-25']}
              />
            </Field>

            <Field label="School Applied For">
              <SelectField
                value={schoolBranch}
                onChange={setSchoolBranch}
                placeholder="-- Select --"
                options={['T.Nagar-PSBB', 'KK Nagar-PSBB', 'Nungambakkam-PSBB']}
              />
            </Field>

            <Field label="Application Status">
              <SelectField
                value={applicationStatus}
                onChange={setApplicationStatus}
                placeholder="-- Select --"
                options={['Declared', 'Approved', 'Pending', 'Draft']}
              />
            </Field>

            <Field label="Child Goes to Play School">
              <SelectField
                value={playSchool}
                onChange={setPlaySchool}
                placeholder="-- Select --"
                options={['Yes', 'No']}
              />
            </Field>

            <Field label="Physically Challenged">
              <SelectField
                value={physicallyChallenged}
                onChange={setPhysicallyChallenged}
                placeholder="-- Select --"
                options={['Yes', 'No']}
              />
            </Field>

            <Field label="Gender">
              <SelectField
                value={gender}
                onChange={setGender}
                placeholder="-- Select --"
                options={['Male', 'Female']}
              />
            </Field>

            <Field label="Mother Tongue">
              <SelectField
                value={motherTongue}
                onChange={setMotherTongue}
                placeholder="-- Select --"
                options={['Tamil', 'English', 'Telugu', 'Hindi', 'Malayalam', 'Kannada']}
              />
            </Field>

            <Field label="Nationality">
              <SelectField
                value={nationality}
                onChange={setNationality}
                placeholder="-- Select --"
                options={['Indian', 'NRI', 'Foreign National']}
              />
            </Field>

            <Field label="Alumni">
              <SelectField
                value={alumni}
                onChange={setAlumni}
                placeholder="-- Select --"
                options={['Yes', 'No']}
              />
            </Field>

            <Field label="Religion">
              <SelectField
                value={religion}
                onChange={setReligion}
                placeholder="-- Select --"
                options={['Hindu', 'Christian', 'Muslim', 'Jain', 'Sikh']}
              />
            </Field>

            <Field label="Community">
              <SelectField
                value={community}
                onChange={setCommunity}
                placeholder="-- Select --"
                options={['FC', 'BC', 'MBC', 'SC', 'ST']}
              />
            </Field>

            <Field label="Registration Number">
              <SelectField
                value={regNoSearch}
                onChange={setRegNoSearch}
                placeholder="-- Select --"
                options={[
                  'T25-0001', 'T25-0002', 'T25-0003', 'T25-0004', 'T25-0005',
                  'T25-0006', 'T25-0007', 'T25-0008', 'T25-0009', 'T25-0010'
                ]}
              />
            </Field>
          </div>

          <div className="pt-3 flex justify-between items-center border-t border-slate-200 dark:border-slate-800">
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
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                viewingStudent.applicationStatus === 'Declared' ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30' :
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
