import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomPanel from '@/common/CustomPanel'
import { mockStudents, type StudentRecord } from '@/data/mockStudents'
import {
  Search,
  GraduationCap,
  ArrowLeft,
  Printer,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  User,
  MapPin,
  Heart,
  FileCheck,
  AlertTriangle,
  Building,
  Phone,
  Briefcase,
  BookOpen,
  School
} from 'lucide-react'
import { toast } from '@/components/ui/toast'
import logoImg from '@/assets/images/logo.png'
import { AdminDataTable } from '@/components/AdminDataTable'
import { Field, TextField, SelectField } from '@/components/FormPrimitives'

export const AdminStudents: React.FC = () => {
  const navigate = useNavigate()

  // Filter panel state (Default to empty - no preselected values)
  const [academicYear, setAcademicYear] = useState('')
  const [schoolBranch, setSchoolBranch] = useState('')
  const [applnFrom, setApplnFrom] = useState('')
  const [applnTo, setApplnTo] = useState('')
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)

  // Active student list state
  const [students, setStudents] = useState<StudentRecord[]>(mockStudents)

  // Separate Screen View State & Delete Modal State
  const [viewingStudent, setViewingStudent] = useState<StudentRecord | null>(null)
  const [deletingStudent, setDeletingStudent] = useState<StudentRecord | null>(null)

  // Filter Handler
  const handleSearch = () => {
    let filtered = mockStudents.filter((item) => {
      if (academicYear && item.academicYear !== academicYear) return false
      if (schoolBranch && item.schoolBranch !== schoolBranch) return false
      if (applnFrom && item.registrationNumber < applnFrom) return false
      if (applnTo && item.registrationNumber > applnTo) return false
      return true
    })
    setStudents(filtered)
    toast.success(`Filtered ${filtered.length} student records`)
  }

  // Clear Filter
  const handleClear = () => {
    setAcademicYear('')
    setSchoolBranch('')
    setApplnFrom('')
    setApplnTo('')
    setStudents(mockStudents)
    toast.info('Search filters reset')
  }

  // 1. Edit Action Handler (Navigates to /admission/application-details with prefilled data)
  const handleEdit = (student: StudentRecord) => {
    localStorage.setItem('editingStudent', JSON.stringify(student))
    localStorage.setItem('fromAdmin', 'true')
    toast.success(`Opening Application Details form to edit ${student.studentName} (${student.registrationNumber})`)
    navigate('/admission/application-details')
  }

  // 2. View Action Handler
  const handleView = (student: StudentRecord) => {
    setViewingStudent(student)
  }

  // 3. Delete Action Handler
  const handleDeleteConfirm = () => {
    if (!deletingStudent) return
    setStudents((prev) => prev.filter((s) => s.id !== deletingStudent.id))
    toast.success(`Deleted student record: ${deletingStudent.registrationNumber}`)
    setDeletingStudent(null)
  }

  // ================= 1. DEDICATED SEPARATE FULL VIEW SCREEN (NOT MODAL) =================
  if (viewingStudent) {
    const s = viewingStudent
    return (
      <div className="space-y-6">
        {/* Top Header Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs">
          <button
            type="button"
            onClick={() => setViewingStudent(null)}
            className="h-9 px-4 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Student List
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="h-9 px-4 rounded-xl border border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100 text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Printer className="h-4 w-4" /> Print Full Application
            </button>

            <button
              type="button"
              onClick={() => handleEdit(s)}
              className="h-9 px-5 rounded-xl bg-[#1677FF] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Edit3 className="h-4 w-4" /> Edit Application Details
            </button>
          </div>
        </div>

        {/* Detailed Summary Banner */}
        <div
          className="text-white p-6 rounded-2xl shadow-md border-b-4 border-[#8dc63f] flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ background: "var(--app-gradient)" }}
        >
          <div className="flex items-center gap-4">
            <img src={logoImg} className="h-16 w-auto object-contain bg-white/10 p-2 rounded-xl border border-white/20" alt="Logo" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold uppercase tracking-wide">{s.studentName}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-400 text-emerald-950">
                  {s.applicationStatus}
                </span>
              </div>
              <p className="text-xs text-white/90 font-mono mt-1 font-semibold">
                Registration No: <span className="bg-white/20 px-2 py-0.5 rounded text-white font-bold">{s.registrationNumber}</span> | Academic Year: {s.academicYear}
              </p>
              <p className="text-xs text-white/80 font-medium mt-0.5">
                School Branch: {s.schoolBranch} | Applied Date: {s.date}
              </p>
            </div>
          </div>
        </div>

        {/* Full Details Cards Grid */}
        <div className="space-y-6">
          {/* Card 1: Child / Applicant Information */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0F294A] dark:text-white border-b pb-3">
              <User className="h-5 w-5 text-blue-600" />
              <span>1. Child & Personal Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Child Full Name</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.studentName}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Gender</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.gender}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Date of Birth</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.date}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Mother Tongue</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.motherTongue}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Nationality</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">Indian</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Religion</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.religion}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Caste / Community</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.caste} ({s.community})</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Goes to Play School</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.playSchool ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Card 2: Father Information */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0F294A] dark:text-white border-b pb-3">
              <Briefcase className="h-5 w-5 text-purple-600" />
              <span>2. Father's Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Father Name</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.fatherName}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Mobile Number</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.mobile}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Monthly Income Range</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.incomeRange}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Alumni Student</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.alumni ? 'Yes (PSBB Alumnus)' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Mother Information */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0F294A] dark:text-white border-b pb-3">
              <User className="h-5 w-5 text-emerald-600" />
              <span>3. Mother's Details</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Mother Name</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.motherName}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Siblings Studying in PSBB</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.siblingsStudying ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          {/* Card 4: Address & Communication */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#0F294A] dark:text-white border-b pb-3">
              <MapPin className="h-5 w-5 text-amber-600" />
              <span>4. Residential Address & Communication</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800 col-span-2">
                <span className="text-slate-500 font-medium block">Residential Address</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.area}, {s.city}</span>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="text-slate-500 font-medium block">Distance from School</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{s.distanceKm}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ================= 2. MAIN STUDENT LIST & TABLE VIEW =================
  return (
    <div className="space-y-6">
      {/* DATA TABLE WITH INTEGRATED CUSTOM FILTER PANEL VIA POPOVER FILTER ICON */}
      <AdminDataTable
        title="Student Applications Master List"
        subtitle="Manage registered pre-kg applicants."
        data={students}
        onView={handleView}
        onEdit={handleEdit}
        onAddNew={() => {
          localStorage.setItem('fromAdmin', 'true')
          navigate('/admission/application-details')
        }}
        onDelete={(student) => setDeletingStudent(student)}
        showCheckmarkCols={true}
        onToggleFilterPanel={() => setIsFilterPanelOpen(true)}
        onExportExcel={() => toast.success("Exported Student Master List to Excel")}
        onPrint={() => window.print()}
      />

      {/* ================= CUSTOM SIDE DRAWER FILTER PANEL ================= */}
      <CustomPanel
        isOpen={isFilterPanelOpen}
        title="Student Custom Filter Panel"
        onClose={() => setIsFilterPanelOpen(false)}
        onSave={() => {
          handleSearch()
          setIsFilterPanelOpen(false)
        }}
        saveLabel="Apply Filters"
        width="480px"
      >
        <div className="space-y-4">
          <Field label="Academic Year">
            <SelectField
              value={academicYear}
              onChange={(val) => setAcademicYear(val)}
              placeholder="-- Select --"
              options={["2025-26", "2024-25"]}
            />
          </Field>

          <Field label="School Applied For">
            <SelectField
              value={schoolBranch}
              onChange={(val) => setSchoolBranch(val)}
              placeholder="-- Select --"
              options={["T.Nagar-PSBB", "KK Nagar-PSBB", "Nungambakkam-PSBB"]}
            />
          </Field>

          <Field label="Appln No Range From">
            <SelectField
              value={applnFrom}
              onChange={(val) => setApplnFrom(val)}
              placeholder="-- Select --"
              options={[
                "T25-0001", "T25-0002", "T25-0003", "T25-0004", "T25-0005",
                "T25-0006", "T25-0007", "T25-0008", "T25-0009", "T25-0010"
              ]}
            />
          </Field>

          <Field label="Appln No Range To">
            <SelectField
              value={applnTo}
              onChange={(val) => setApplnTo(val)}
              placeholder="-- Select --"
              options={[
                "T25-0001", "T25-0002", "T25-0003", "T25-0004", "T25-0005",
                "T25-0006", "T25-0007", "T25-0008", "T25-0009", "T25-0010"
              ]}
            />
          </Field>

          <div className="pt-3 flex justify-between items-center border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleClear}
              className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </CustomPanel>

      {/* ================= DELETE CONFIRMATION MODAL ================= */}
      {deletingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-2.5 rounded-full bg-rose-100 dark:bg-rose-950">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Delete Registration Record?
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to delete registration <span className="font-mono font-bold text-rose-600">{deletingStudent.registrationNumber}</span> for <span className="font-bold text-slate-900 dark:text-white">{deletingStudent.studentName}</span>? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => setDeletingStudent(null)}
                className="h-9 px-4 rounded-xl border border-slate-300 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="h-9 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Trash2 className="h-4 w-4" /> Delete Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
