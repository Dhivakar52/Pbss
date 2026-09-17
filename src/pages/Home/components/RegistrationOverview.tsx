import React from 'react'
import {
  Printer,
  FileText,
  ChevronRight,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Eye,
  Lock
} from 'lucide-react'
import type { Step } from '../types'

interface RegistrationOverviewProps {
  steps: Step[]
  completedCount: number
  isRegistrationComplete: boolean
  activeStepId: number
  completedStepIds?: number[]
  isFromAdmin?: boolean
  onStepClick: (stepId: number) => void
  onCompleteAll: () => void
  onReset: () => void
  onPrintTrackSheet: () => void
  onPrintRegistrationForm: () => void
  onOpenSuccessModal?: () => void
}

export const RegistrationOverview: React.FC<RegistrationOverviewProps> = ({
  steps,
  completedCount,
  isRegistrationComplete,
  activeStepId,
  completedStepIds = [],
  isFromAdmin = false,
  onStepClick,
  onCompleteAll,
  onReset,
  onPrintTrackSheet,
  onPrintRegistrationForm,
  onOpenSuccessModal,
}) => {
  return (
    <div className="space-y-6">
      {/* Quick Action Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-slate-50 to-blue-50/50 dark:from-slate-900 dark:to-blue-950/40 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Registration Portal</span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">| Click any step item to open separate step form screen</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {isRegistrationComplete && onOpenSuccessModal && (
            <button
              type="button"
              onClick={onOpenSuccessModal}
              className="text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 hover:bg-emerald-200/80 dark:hover:bg-emerald-900/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 border border-emerald-300/60 dark:border-emerald-800"
            >
              <Eye className="h-3.5 w-3.5" /> View Success Details
            </button>
          )}
          <button
            type="button"
            onClick={onCompleteAll}
            className="text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-100/70 dark:bg-blue-950/70 hover:bg-blue-100 dark:hover:bg-blue-900 px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 border border-blue-200/60 dark:border-blue-800/60"
          >
            <CheckCircle2 className="h-3.5 w-3.5" /> Complete All Steps
          </button>
          <button
            type="button"
            onClick={onReset}
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-300/50 dark:border-slate-700"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Completion Notification Banner */}
      {isRegistrationComplete && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-blue-500/15 dark:from-emerald-950/50 dark:via-teal-950/30 dark:to-blue-950/40 border border-emerald-300/80 dark:border-emerald-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
                Registration Completed & Ready for Submission!
              </h3>
              <p className="text-xs text-emerald-800/90 dark:text-emerald-300/80">
                All 5 admission steps have been fully completed. Track sheet printing is now enabled.
              </p>
            </div>
          </div>
          {onOpenSuccessModal && (
            <button
              type="button"
              onClick={onOpenSuccessModal}
              className="h-9 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Eye className="h-3.5 w-3.5" /> View Submission Modal
            </button>
          )}
        </div>
      )}

      {/* Main 2-Column Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

        {/* LEFT PANEL: Registration Progress */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-[#0F294A] dark:text-slate-100">Registration Progress</h2>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-400">
              {completedCount} / 5 Completed
            </span>
          </div>

          <div className="space-y-2">
            {steps.map((step) => {
              const isActive = activeStepId === step.id
              const isDone = step.status === 'COMPLETED'
              const isPrevDone = step.id === 1 || completedStepIds.includes(step.id - 1)
              const isLocked = !isFromAdmin && !isRegistrationComplete && !isPrevDone

              return (
                <div
                  key={step.id}
                  onClick={() => onStepClick(step.id)}
                  className={`group relative flex items-center justify-between p-3 rounded-xl border transition-all ${isLocked
                      ? 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60 opacity-60 cursor-not-allowed'
                      : isActive
                        ? 'bg-[#F0F7FF] dark:bg-blue-950/40 border-[#BDE0FE] dark:border-blue-800 shadow-2xs cursor-pointer'
                        : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:bg-slate-50/80 dark:hover:bg-slate-800/70 hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer'
                    }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${isDone
                          ? 'bg-emerald-500 text-white'
                          : isLocked
                            ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700'
                            : isActive
                              ? 'bg-[#1677FF] text-white'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : isLocked ? (
                        <Lock className="h-3.5 w-3.5 text-slate-400" />
                      ) : (
                        step.id
                      )}
                    </div>

                    <span
                      className={`text-xs font-semibold truncate ${isLocked
                          ? 'text-slate-400 dark:text-slate-500'
                          : isActive
                            ? 'text-[#1677FF] dark:text-blue-400'
                            : 'text-slate-700 dark:text-slate-200'
                        }`}
                    >
                      {step.title}
                    </span>

                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isLocked ? (
                      <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                        <Lock className="h-3 w-3" /> LOCKED
                      </span>
                    ) : step.status === 'PENDING' ? (
                      <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider rounded-full bg-[#FFF0F0] dark:bg-red-950/60 text-[#FF4D4F] dark:text-red-400 uppercase border border-[#FFD6D6] dark:border-red-900">
                        PENDING
                      </span>
                    ) : step.status === 'OPTIONAL' ? (
                      <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider rounded-full bg-[#E6F4FF] dark:bg-blue-950/60 text-[#1677FF] dark:text-blue-400 uppercase border border-[#BAE0FF] dark:border-blue-900">
                        OPTIONAL
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 uppercase border border-emerald-200 dark:border-emerald-800">
                        DONE
                      </span>
                    )}

                    {step.hasSubChevron && (
                      <ChevronRight className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT PANEL: Documents & Printing */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-[#0F294A] dark:text-slate-100">Documents & Printing</h2>
          </div>

          <div className="space-y-4">
            {/* Track Sheet Card */}
            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#E6F4FF] dark:bg-blue-950/60 text-[#1677FF] dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Printer className="h-5 w-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">Track Sheet</h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-full bg-[#FFF0F0] dark:bg-red-950/60 text-[#FF4D4F] dark:text-red-400 uppercase border border-[#FFD6D6] dark:border-red-900">
                      REQUIRED
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Registration must be completed before printing.
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
                    Note: Track sheet print option will be available only after midnight of 21/01/2025 (Tuesday).
                  </p>
                </div>
              </div>

              <div className="shrink-0 self-end md:self-center">
                <button
                  type="button"
                  onClick={onPrintTrackSheet}
                  disabled={!isRegistrationComplete}
                  className={`h-9 px-4 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${isRegistrationComplete
                      ? 'bg-[#1677FF] dark:bg-blue-600 text-white hover:bg-[#0958D9] dark:hover:bg-blue-500 shadow-2xs cursor-pointer'
                      : 'bg-[#EAECEF] dark:bg-slate-800 text-[#8C98A6] dark:text-slate-500 border border-slate-200 dark:border-slate-700 cursor-not-allowed'
                    }`}
                >
                  <Printer className="h-3.5 w-3.5" /> Print Track Sheet
                </button>
              </div>
            </div>

            {/* Registration Form Card */}
            <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#F4EEFF] dark:bg-purple-950/60 text-[#722ED1] dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="h-5 w-5" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">Registration Form</h3>
                    <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider rounded-full bg-[#E6F4FF] dark:bg-blue-950/60 text-[#1677FF] dark:text-blue-400 uppercase border border-[#BAE0FF] dark:border-blue-900">
                      OPTIONAL
                    </span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 self-end md:self-center">
                <button
                  type="button"
                  onClick={onPrintRegistrationForm}
                  className="h-9 px-4 rounded-xl text-xs font-semibold bg-[#1677FF] dark:bg-blue-600 hover:bg-[#0958D9] dark:hover:bg-blue-500 text-white shadow-2xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <Printer className="h-3.5 w-3.5" /> Print Registration Form
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

