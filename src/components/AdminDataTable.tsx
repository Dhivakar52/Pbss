import React, { useState, useMemo } from 'react'
import Pagination from '@/common/Pagination'
import {
  Search,
  Calendar as CalendarIcon,
  SlidersHorizontal,
  Plus,
  ArrowUpDown,
  UserCheck,
  CheckCircle2,
  Clock,
  Menu,
  Eye,
  Edit3,
  Trash2,
  Filter,
  FileSpreadsheet,
  Printer
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { StudentRecord } from '@/data/mockStudents'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { toast } from '@/components/ui/toast'

interface AdminDataTableProps {
  title?: string
  subtitle?: string
  data: StudentRecord[]
  onModify?: (record: StudentRecord) => void
  onView?: (record: StudentRecord) => void
  onEdit?: (record: StudentRecord) => void
  onDelete?: (record: StudentRecord) => void
  onAddNew?: () => void
  onSelectId?: (record: StudentRecord) => void
  showCheckmarkCols?: boolean
  customFilterPanel?: React.ReactNode
  onExportExcel?: () => void
  onPrint?: () => void
  onToggleFilterPanel?: () => void
}

export const AdminDataTable: React.FC<AdminDataTableProps> = ({
  title = "Registered Students",
  subtitle = "View and manage registered student application records",
  data,
  onModify,
  onView,
  onEdit,
  onDelete,
  onAddNew,
  onSelectId,
  showCheckmarkCols = true,
  customFilterPanel,
  onExportExcel,
  onPrint,
  onToggleFilterPanel,
}) => {
  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState('')
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined)
  const [toDate, setToDate] = useState<Date | undefined>(undefined)
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(false)

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Sorting States
  const [sortField, setSortField] = useState<keyof StudentRecord>('slNo')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleSort = (field: keyof StudentRecord) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  // Filtered and Sorted Data
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Global text search
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase()
        const matchesName = item.studentName.toLowerCase().includes(q)
        const matchesReg = item.registrationNumber.toLowerCase().includes(q)
        const matchesFather = item.fatherName.toLowerCase().includes(q)
        const matchesBranch = item.schoolBranch.toLowerCase().includes(q)
        const matchesMobile = item.mobile.includes(q)
        const matchesCity = item.city.toLowerCase().includes(q)
        if (!matchesName && !matchesReg && !matchesFather && !matchesBranch && !matchesMobile && !matchesCity) {
          return false
        }
      }

      // Date Range filter
      if (fromDate) {
        const itemDate = new Date(item.date)
        if (itemDate < fromDate) return false
      }
      if (toDate) {
        const itemDate = new Date(item.date)
        if (itemDate > toDate) return false
      }

      return true
    }).sort((a, b) => {
      const valA = a[sortField]
      const valB = b[sortField]
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }, [data, searchTerm, fromDate, toDate, sortField, sortOrder])

  // Pagination calculation
  const totalRecords = filteredData.length
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalRecords)
  const paginatedData = filteredData.slice(startIndex, endIndex)

  const tableObject = useMemo(
    () => ({
      getState: () => ({ pagination: { pageIndex: safePage - 1, pageSize } }),
      setPageIndex: (index: number) => setCurrentPage(index + 1),
      setPageSize: (size: number) => {
        setPageSize(size)
        setCurrentPage(1)
      },
      previousPage: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
      nextPage: () => setCurrentPage((prev) => Math.min(prev + 1, totalPages)),
      getCanPreviousPage: () => safePage > 1,
      getCanNextPage: () => safePage < totalPages,
    }),
    [safePage, pageSize, totalPages]
  )

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200/90 dark:border-slate-800 p-5 space-y-4">
      {/* ================= CARD HEADER & SEARCH/FILTER BAR ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-800">
        {/* Left: Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#1677FF] dark:text-blue-400">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{title}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{subtitle}</p>
          </div>
        </div>

        {/* Right Controls: Search, Date Range, Filter, Add (Strictly matching Image 4) */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search Input */}
          <div className="relative flex items-center min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search Student / Reg No / Mobile"
              className="h-9 w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 pl-9 pr-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
            />
          </div>

          {/* Date Range Selector: From Date -> To Date */}
          <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-1 text-xs">
            <Popover>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-2 py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium"
                  >
                    <CalendarIcon className="h-3.5 w-3.5 text-slate-400" />
                    <span>{fromDate ? format(fromDate, 'dd/MM/yyyy') : 'From Date'}</span>
                  </button>
                }
              />
              <PopoverContent align="start" className="w-auto p-0 shadow-lg border rounded-xl">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}

                />
              </PopoverContent>
            </Popover>

            <span className="text-slate-400 font-bold">→</span>

            <Popover>
              <PopoverTrigger
                render={
                  <button
                    type="button"
                    className="flex items-center gap-1.5 px-2 py-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium"
                  >
                    <CalendarIcon className="h-3.5 w-3.5 text-slate-400" />
                    <span>{toDate ? format(toDate, 'dd/MM/yyyy') : 'To Date'}</span>
                  </button>
                }
              />
              <PopoverContent align="end" className="w-auto p-0 shadow-lg border rounded-xl">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}

                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Filter Popover Button with 3 Icons matching user reference image */}
          <Popover>
            <PopoverTrigger
              render={
                <button
                  type="button"
                  title="Filter & Export Options"
                  className={`h-9 w-9 flex items-center justify-center rounded-lg border transition-colors cursor-pointer ${isFilterPanelVisible
                    ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
              }
            />
            <PopoverContent align="end" className="w-auto p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl">
              <div className="flex items-center gap-1">
                {/* 1. Filter Icon (Funnel) */}
                <button
                  type="button"
                  onClick={() => {
                    if (onToggleFilterPanel) {
                      onToggleFilterPanel()
                    } else {
                      setIsFilterPanelVisible(!isFilterPanelVisible)
                    }
                  }}
                  title="Toggle Custom Filters"
                  className={`p-2 rounded-xl transition-all cursor-pointer ${isFilterPanelVisible
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                >
                  <Filter className="h-4 w-4" />
                </button>

                {/* 2. Export Excel Icon */}
                <button
                  type="button"
                  onClick={() => {
                    if (onExportExcel) onExportExcel()
                    else toast.success("Exported to Excel")
                  }}
                  title="Export to Excel"
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                </button>

                {/* 3. Print Icon */}
                <button
                  type="button"
                  onClick={() => {
                    if (onPrint) onPrint()
                    else window.print()
                  }}
                  title="Print Report"
                  className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
                >
                  <Printer className="h-4 w-4 text-purple-600" />
                </button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Action / Add Button (+) */}
          {onAddNew && (
            <button
              type="button"
              onClick={onAddNew}
              className="h-9 px-3 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              style={{ background: "var(--app-gradient)" }}
            >
              <Plus className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* ================= CUSTOM FILTER PANEL (TOGGLED VIA FILTER ICON) ================= */}
      {
        isFilterPanelVisible && customFilterPanel && (
          <div className="pt-2 pb-1 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200">
            {customFilterPanel}
          </div>
        )
      }

      {/* ================= DATA TABLE (STRICT 4TH IMAGE STYLING) ================= */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs border-collapse">
          {/* Dark Navy Header Row matching Image 4 */}
          <thead className="text-white font-semibold uppercase tracking-wider select-none" style={{ background: "var(--table-header-bg, #13729d)" }}>
            <tr>
              <th className="py-3 px-3.5 text-center  border-white/20">SL No</th>
              <th
                onClick={() => handleSort('registrationNumber')}
                className="py-3 px-4 cursor-pointer hover:bg-white/10 transition-colors  border-white/20"
              >
                <div className="flex items-center gap-1.5">
                  <span>Reg Number</span>
                  <ArrowUpDown className="h-3 w-3 opacity-70" />
                </div>
              </th>
              <th
                onClick={() => handleSort('studentName')}
                className="py-3 px-4 cursor-pointer hover:bg-white/10 transition-colors  border-white/20"
              >
                <div className="flex items-center gap-1.5">
                  <span>Student Name</span>
                  <ArrowUpDown className="h-3 w-3 opacity-70" />
                </div>
              </th>
              <th className="py-3 px-4  border-white/20">Parent / Guardian</th>
              <th
                onClick={() => handleSort('schoolBranch')}
                className="py-3 px-4 cursor-pointer hover:bg-white/10 transition-colors  border-white/20"
              >
                <div className="flex items-center gap-1.5">
                  <span>School Branch</span>
                  <ArrowUpDown className="h-3 w-3 opacity-70" />
                </div>
              </th>
              <th className="py-3 px-4  border-white/20">Area / City</th>
              <th className="py-3 px-4 text-center  border-white/20">Status</th>
              {showCheckmarkCols && (
                <>
                  <th className="py-3 px-2 text-center w-12 bg-red-900/60  border-white/20" title="Checkmark 1">✔</th>
                  <th className="py-3 px-2 text-center w-12 bg-purple-900/60  border-white/20" title="Checkmark 2">✔</th>
                </>
              )}
              <th className="py-3 px-4 text-center w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={showCheckmarkCols ? 9 : 7} className="py-8 text-center text-slate-400">
                  No records matching search criteria.
                </td>
              </tr>
            ) : (
              paginatedData.map((row, idx) => (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800/60"
                >
                  <td className="py-3 px-3.5 text-center font-mono text-slate-500">{startIndex + idx + 1}</td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-700 dark:text-blue-400">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectId) onSelectId(row)
                        else if (onView) onView?.(row)
                      }}
                      className="hover:underline text-[#1677FF] dark:text-blue-400 font-mono font-bold cursor-pointer text-left inline-flex items-center gap-1.5 group"
                      title={`Click to view application details for ID ${row.id}`}
                    >
                      <span className="group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                        {row.registrationNumber}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 font-mono font-semibold">
                        {row.id}
                      </span>
                    </button>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{row.studentName}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{row.fatherName}</td>
                  <td className="py-3 px-4">{row.schoolBranch}</td>
                  <td className="py-3 px-4 text-slate-500">{row.area}, {row.city}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${row.applicationStatus === 'Declared'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200'
                        : row.applicationStatus === 'Approved'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200'
                          : row.applicationStatus === 'Pending'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border border-amber-200'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                    >
                      {row.applicationStatus === 'Declared' && <CheckCircle2 className="h-3 w-3" />}
                      {row.applicationStatus === 'Pending' && <Clock className="h-3 w-3" />}
                      {row.applicationStatus}
                    </span>
                  </td>
                  {showCheckmarkCols && (
                    <>
                      <td className="py-3 px-2 text-center">
                        {row.status1 ? (
                          <span className="inline-block p-1 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300">
                            ✔
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {row.status2 ? (
                          <span className="inline-block p-1 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300">
                            ✔
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                    </>
                  )}
                  <td className="py-3 px-4 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <button
                            type="button"
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                            aria-label="Actions Menu"
                          >
                            <Menu className="h-4 w-4" />
                          </button>
                        }
                      />
                      <DropdownMenuContent align="end" className="w-36 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-xl text-xs">
                        {onView && (
                          <DropdownMenuItem
                            onClick={() => onView(row)}
                            className="cursor-pointer py-2 px-2.5 rounded-lg flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Eye className="h-3.5 w-3.5 text-blue-600" /> View
                          </DropdownMenuItem>
                        )}
                        {(onEdit || onModify) && (
                          <DropdownMenuItem
                            onClick={() => {
                              if (onEdit) onEdit(row)
                              else if (onModify) onModify(row)
                            }}
                            className="cursor-pointer py-2 px-2.5 rounded-lg flex items-center gap-2 font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Edit3 className="h-3.5 w-3.5 text-emerald-600" /> Edit
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem
                            onClick={() => onDelete(row)}
                            className="cursor-pointer py-2 px-2.5 rounded-lg flex items-center gap-2 font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-rose-600" /> Delete
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= PAGINATION FOOTER FROM COMMON ================= */}
      <Pagination table={tableObject} totalCount={totalRecords} pageSizeOptions={[5, 10, 20, 50]} />
    </div >
  )
}
