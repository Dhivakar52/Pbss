import React, { useState } from 'react'
import { User, Save, ArrowRight, RotateCcw } from 'lucide-react'
import { toast } from '@/components/ui/toast'
import { Field, TextField, SelectField } from '@/components/FormPrimitives'
import type { GuardianDetailsState } from '../types'

interface Step3GuardianDetailsProps {
  guardian: GuardianDetailsState
  setGuardian: React.Dispatch<React.SetStateAction<GuardianDetailsState>>
  onClear: () => void
  onSaveAndExit: () => void
  onSaveAndNext: () => void
}

export const Step3GuardianDetails: React.FC<Step3GuardianDetailsProps> = ({
  guardian,
  setGuardian,
  onClear,
  onSaveAndExit,
  onSaveAndNext,
}) => {
  const [showErrors, setShowErrors] = useState(false)

  const update = (key: keyof GuardianDetailsState, val: any) => {
    setGuardian((prev) => ({ ...prev, [key]: val }))
  }

  const isReasonErr = showErrors && guardian.isApplicable && !guardian.reason.trim()
  const isGenderErr = showErrors && guardian.isApplicable && !guardian.gender
  const isTitleErr = showErrors && guardian.isApplicable && !guardian.title
  const isNameErr = showErrors && guardian.isApplicable && !guardian.name.trim()
  const isOccErr = showErrors && guardian.isApplicable && guardian.isEmployed && !guardian.occupation.trim()
  const isCompErr = showErrors && guardian.isApplicable && guardian.isEmployed && !guardian.companyName.trim()
  const isIncErr = showErrors && guardian.isApplicable && guardian.isEmployed && !guardian.monthlyIncome
  const isMobileErr = showErrors && guardian.isApplicable && !guardian.mobileNo.trim()
  const isAddrErr = showErrors && guardian.isApplicable && !guardian.officeAddress.trim()

  const handleNext = () => {
    if (guardian.isApplicable) {
      const isValid =
        guardian.reason.trim() &&
        guardian.gender &&
        guardian.title &&
        guardian.name.trim() &&
        (!guardian.isEmployed || (guardian.occupation.trim() && guardian.companyName.trim() && guardian.monthlyIncome)) &&
        guardian.mobileNo.trim() &&
        guardian.officeAddress.trim()

      if (!isValid) {
        setShowErrors(true)
        toast.error('Please fill in all mandatory fields for Guardian before proceeding.')
        return
      }
    }
    setShowErrors(false)
    onSaveAndNext()
  }

  return (
    <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2 text-sm font-bold text-[#0F294A] dark:text-white">
          <User className="h-4.5 w-4.5 text-[#1677FF] dark:text-blue-400" />
          <span>Guardian Details (If Applicable)</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Toggle Guardian Applicable */}
        <Field label="Guardian Details (If Applicable)">
          <div className="flex items-center gap-4 text-xs font-medium text-slate-700 dark:text-slate-300 mt-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="guardianApplicable"
                checked={guardian.isApplicable === true}
                onChange={() => update('isApplicable', true)}
                className="text-blue-600 focus:ring-blue-500"
              /> Yes
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="guardianApplicable"
                checked={guardian.isApplicable === false}
                onChange={() => update('isApplicable', false)}
                className="text-blue-600 focus:ring-blue-500"
              /> No
            </label>
          </div>
        </Field>

        {/* Form Fields arranged in responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Field label="Reason" required={guardian.isApplicable} span={4} error={isReasonErr}>
            <textarea
              rows={2}
              placeholder="Reason for specifying guardian"
              disabled={!guardian.isApplicable}
              value={guardian.reason}
              onChange={(e) => update('reason', e.target.value)}
              className={`w-full p-2.5 rounded-lg border text-xs focus:outline-none disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:text-slate-400 disabled:dark:text-slate-600 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 ${
                isReasonErr ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-blue-500'
              }`}
            />
          </Field>

          <Field label="Guardian's Gender" required={guardian.isApplicable} error={isGenderErr}>
            <SelectField
              placeholder="-- Select --"
              disabled={!guardian.isApplicable}
              value={guardian.gender}
              onChange={(val) => update('gender', val)}
              options={['Male', 'Female']}
              error={isGenderErr}
            />
          </Field>

          <Field label="Guardian's Name Title" required={guardian.isApplicable} error={isTitleErr}>
            <SelectField
              placeholder="-- Select --"
              disabled={!guardian.isApplicable}
              value={guardian.title}
              onChange={(val) => update('title', val)}
              options={['Mr.', 'Mrs.', 'Dr.']}
              error={isTitleErr}
            />
          </Field>

          <Field label="Guardian's Initials">
            <TextField
              placeholder="Initials"
              disabled={!guardian.isApplicable}
              value={guardian.initials}
              onChange={(val) => update('initials', val)}
            />
          </Field>

          <Field label="Guardian's Name" required={guardian.isApplicable} error={isNameErr}>
            <TextField
              placeholder="Guardian full name"
              disabled={!guardian.isApplicable}
              value={guardian.name}
              onChange={(val) => update('name', val)}
              error={isNameErr}
            />
          </Field>

          <Field label="Is Guardian Employed?">
            <div className="flex items-center gap-4 text-xs font-medium text-slate-700 dark:text-slate-300 mt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="guardianEmployed"
                  disabled={!guardian.isApplicable}
                  checked={guardian.isEmployed === true}
                  onChange={() => update('isEmployed', true)}
                  className="text-blue-600 focus:ring-blue-500"
                /> Yes
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="guardianEmployed"
                  disabled={!guardian.isApplicable}
                  checked={guardian.isEmployed === false}
                  onChange={() => update('isEmployed', false)}
                  className="text-blue-600 focus:ring-blue-500"
                /> No
              </label>
            </div>
          </Field>

          <Field label="Occupation" required={guardian.isApplicable && guardian.isEmployed} error={isOccErr}>
            <TextField
              placeholder="Enter occupation"
              disabled={!guardian.isApplicable || !guardian.isEmployed}
              value={guardian.occupation}
              onChange={(val) => update('occupation', val)}
              error={isOccErr}
            />
          </Field>

          <Field label="Institution/Company Name" required={guardian.isApplicable && guardian.isEmployed} error={isCompErr}>
            <TextField
              placeholder="Company name"
              disabled={!guardian.isApplicable || !guardian.isEmployed}
              value={guardian.companyName}
              onChange={(val) => update('companyName', val)}
              error={isCompErr}
            />
          </Field>

          <Field label="Monthly Income (Rs.)" required={guardian.isApplicable && guardian.isEmployed} error={isIncErr}>
            <SelectField
              placeholder="-- Select --"
              disabled={!guardian.isApplicable || !guardian.isEmployed}
              value={guardian.monthlyIncome}
              onChange={(val) => update('monthlyIncome', val)}
              options={['Below 50,000', '50,000 - 1,00,000', 'Above 1,00,000']}
              error={isIncErr}
            />
          </Field>

          <Field label="Guardian's Phone - Off">
            <TextField
              placeholder="Office phone"
              disabled={!guardian.isApplicable}
              value={guardian.phoneOff}
              onChange={(val) => update('phoneOff', val)}
            />
          </Field>

          <Field label="Guardian's Phone - Res">
            <TextField
              placeholder="Residence phone"
              disabled={!guardian.isApplicable}
              value={guardian.phoneRes}
              onChange={(val) => update('phoneRes', val)}
            />
          </Field>

          <Field label="Guardian's Mobile Number" required={guardian.isApplicable} error={isMobileErr}>
            <TextField
              placeholder="Mobile number"
              disabled={!guardian.isApplicable}
              value={guardian.mobileNo}
              onChange={(val) => update('mobileNo', val)}
              error={isMobileErr}
            />
          </Field>

          <Field label="Office Address" required={guardian.isApplicable} span={2} error={isAddrErr}>
            <textarea
              rows={2}
              placeholder="Enter office address"
              disabled={!guardian.isApplicable}
              value={guardian.officeAddress}
              onChange={(e) => update('officeAddress', e.target.value)}
              className={`w-full p-2.5 rounded-lg border text-xs focus:outline-none disabled:bg-slate-50 disabled:dark:bg-slate-800/50 disabled:text-slate-400 disabled:dark:text-slate-600 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 ${
                isAddrErr ? 'border-rose-500 focus:border-rose-500' : 'border-slate-200 dark:border-slate-800 focus:border-blue-500'
              }`}
            />
          </Field>
        </div>
      </div>

      {/* Responsive action buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onClear}
          className="h-10 sm:h-9 px-4 rounded-xl text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1.5 bg-white dark:bg-slate-900"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Clear
        </button>
        <button
          type="button"
          onClick={onSaveAndExit}
          className="h-10 sm:h-9 px-4 rounded-xl text-xs font-semibold border border-blue-500 dark:border-blue-600 text-[#1677FF] dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-all cursor-pointer flex items-center justify-center gap-1.5 bg-white dark:bg-slate-900"
        >
          <Save className="h-3.5 w-3.5" /> Save & Exit
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="h-10 sm:h-9 px-5 rounded-xl text-xs font-semibold bg-[#1677FF] hover:bg-[#0958D9] dark:bg-blue-600 dark:hover:bg-blue-500 text-white shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
        >
          Save & Next <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}


