import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { TextField, DobDateField } from "@/components/FormPrimitives"
import { Loader2, RefreshCw, ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/toast"

const CreateAccount = () => {
  const navigate = useNavigate()

  // Register form state
  const [regUserId, setRegUserId] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regConfirmPassword, setRegConfirmPassword] = useState('')
  const [regUserName, setRegUserName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regDob, setRegDob] = useState('')
  const [captchaCode, setCaptchaCode] = useState('10wbh1')
  const [captchaInput, setCaptchaInput] = useState('')
  const [agreeChecked, setAgreeChecked] = useState(false)
  const [regErrors, setRegErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  // Regenerate random captcha
  const generateCaptcha = () => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaCode(result)
  }

  // Handle Create Account submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors: Record<string, string> = {}

    if (!regUserId.trim()) errors.regUserId = 'User Id is required'
    if (!regPassword) errors.regPassword = 'Password is required'
    else if (regPassword.length < 8) errors.regPassword = 'Password must be at least 8 characters'

    if (!regConfirmPassword) errors.regConfirmPassword = 'Confirm Password is required'
    else if (regPassword !== regConfirmPassword) errors.regConfirmPassword = 'Passwords do not match'

    if (!regUserName.trim()) errors.regUserName = 'User Name is required'
    if (!regEmail.trim()) errors.regEmail = 'Preferred email id is required'
    if (!regDob) errors.regDob = "User's Date of Birth is required"

    if (!captchaInput.trim()) errors.captchaInput = 'Word verification is required'
    else if (captchaInput.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      errors.captchaInput = 'Word verification characters do not match'
    }

    if (!agreeChecked) errors.agreeChecked = 'Please check I Agree to proceed'

    setRegErrors(errors)
    if (Object.keys(errors).length > 0) {
      toast.error('Please fix the errors before submitting.')
      return
    }

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    toast.success('Account created successfully! You can now log in.')
    setIsLoading(false)
    navigate('/')
  }

  // Clear Register form
  const handleClearRegister = () => {
    setRegUserId('')
    setRegPassword('')
    setRegConfirmPassword('')
    setRegUserName('')
    setRegEmail('')
    setRegDob('')
    setCaptchaInput('')
    setAgreeChecked(false)
    setRegErrors({})
  }

  return (
    <div className="min-h-screen w-full bg-[#f0f7ff] flex flex-col justify-between font-sans">
      <div>
        {/* ================= TOP BAR ================= */}

        {/* ================= MAIN CONTENT CONTAINER ================= */}
        <div className="w-full flex justify-center px-4 mt-7 pb-10">
          <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-sky-100 p-6 sm:p-8">

            {/* Top back navigation */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="inline-flex items-center text-xs font-semibold text-[#0088b6] hover:underline gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
              </button>
            </div>

            {/* Title Header */}
            <div className="text-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#0284c7] tracking-tight">
                Create Your Account
              </h2>
              <div className="mt-2">
                <button
                  type="button"
                  onClick={() => toast.info('Displaying full registration instructions.')}
                  className="bg-sky-50 text-[#0284c7] font-semibold text-xs sm:text-sm px-4 py-1.5 rounded border border-sky-200 hover:bg-sky-100 shadow-sm transition-colors"
                >
                  Click here to read the complete Instructions
                </button>
              </div>
            </div>

            {/* Form Grid using FormPrimitives */}
            <form onSubmit={handleRegisterSubmit} className="space-y-4 mt-6">

              {/* 1. User Id */}
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-2">
                <label htmlFor="regUserId" className="text-xs sm:text-sm font-semibold text-slate-700 sm:text-right">
                  User Id : <span className="text-red-500">*</span>
                </label>
                <div>
                  <TextField
                    id="regUserId"
                    value={regUserId}
                    onChange={(val) => {
                      setRegUserId(val)
                      setRegErrors(prev => ({ ...prev, regUserId: '' }))
                    }}
                    error={!!regErrors.regUserId}
                    className="border-slate-300"
                  />
                  {regErrors.regUserId && (
                    <p className="text-xs text-red-500 mt-0.5">{regErrors.regUserId}</p>
                  )}
                </div>
              </div>

              {/* 2. Password with Eye Icon Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-start gap-2">
                <label htmlFor="regPassword" className="text-xs sm:text-sm font-semibold text-slate-700 sm:text-right pt-2">
                  Password : <span className="text-red-500">*</span>
                </label>
                <div>
                  <TextField
                    id="regPassword"
                    showPasswordToggle
                    value={regPassword}
                    onChange={(val) => {
                      setRegPassword(val)
                      setRegErrors(prev => ({ ...prev, regPassword: '' }))
                    }}
                    error={!!regErrors.regPassword}
                    className="border-slate-300"
                  />
                  <p className="text-[11px] text-red-600 mt-1 italic">
                    (It should not be less than 8 characters letters. Create your own password)
                  </p>
                  {regErrors.regPassword && (
                    <p className="text-xs text-red-500 mt-0.5">{regErrors.regPassword}</p>
                  )}
                </div>
              </div>

              {/* 3. Confirm Password with Eye Icon Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-2">
                <label htmlFor="regConfirmPassword" className="text-xs sm:text-sm font-semibold text-slate-700 sm:text-right">
                  Confirm Password : <span className="text-red-500">*</span>
                </label>
                <div>
                  <TextField
                    id="regConfirmPassword"
                    showPasswordToggle
                    value={regConfirmPassword}
                    onChange={(val) => {
                      setRegConfirmPassword(val)
                      setRegErrors(prev => ({ ...prev, regConfirmPassword: '' }))
                    }}
                    error={!!regErrors.regConfirmPassword}
                    className="border-slate-300"
                  />
                  {regErrors.regConfirmPassword && (
                    <p className="text-xs text-red-500 mt-0.5">{regErrors.regConfirmPassword}</p>
                  )}
                </div>
              </div>

              {/* 4. User Name */}
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-2">
                <label htmlFor="regUserName" className="text-xs sm:text-sm font-semibold text-slate-700 sm:text-right">
                  User Name : <span className="text-red-500">*</span>
                </label>
                <div>
                  <TextField
                    id="regUserName"
                    value={regUserName}
                    onChange={(val) => {
                      setRegUserName(val)
                      setRegErrors(prev => ({ ...prev, regUserName: '' }))
                    }}
                    error={!!regErrors.regUserName}
                    className="border-slate-300"
                  />
                  {regErrors.regUserName && (
                    <p className="text-xs text-red-500 mt-0.5">{regErrors.regUserName}</p>
                  )}
                </div>
              </div>

              {/* 5. Preferred email id for communication */}
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-2">
                <label htmlFor="regEmail" className="text-xs sm:text-sm font-semibold text-slate-700 sm:text-right">
                  Preferred email id for communication : <span className="text-red-500">*</span>
                </label>
                <div>
                  <TextField
                    id="regEmail"
                    type="email"
                    value={regEmail}
                    onChange={(val) => {
                      setRegEmail(val)
                      setRegErrors(prev => ({ ...prev, regEmail: '' }))
                    }}
                    error={!!regErrors.regEmail}
                    className="border-slate-300"
                  />
                  {regErrors.regEmail && (
                    <p className="text-xs text-red-500 mt-0.5">{regErrors.regEmail}</p>
                  )}
                </div>
              </div>

              {/* 6. User's Date of Birth using DobDateField from FormPrimitives */}
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-2">
                <label htmlFor="regDob" className="text-xs sm:text-sm font-semibold text-slate-700 sm:text-right">
                  User's Date of Birth : <span className="text-red-500">*</span>
                </label>
                <div>
                  <DobDateField
                    placeholder="Select Date of Birth"
                    value={regDob ? new Date(regDob) : undefined}
                    onChange={(date) => {
                      setRegDob(date ? date.toISOString().split('T')[0] : '')
                      setRegErrors(prev => ({ ...prev, regDob: '' }))
                    }}
                    error={!!regErrors.regDob}
                  />
                  {regErrors.regDob && (
                    <p className="text-xs text-red-500 mt-0.5">{regErrors.regDob}</p>
                  )}
                </div>
              </div>

              {/* 7. Word Verification Box */}
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-2">
                <label className="text-xs sm:text-sm font-semibold text-slate-700 sm:text-right">
                  Word Verification :
                </label>
                <div className="flex items-center gap-2">
                  <div className="bg-black text-white px-4 py-1.5 text-lg font-mono font-bold tracking-widest rounded select-none shadow-inner">
                    {captchaCode}
                  </div>
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-1.5 text-slate-500 hover:text-slate-800 transition-colors"
                    title="Refresh Captcha"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* 8. Type the characters you see above */}
              <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] items-center gap-2">
                <label htmlFor="captchaInput" className="text-xs sm:text-sm font-semibold text-slate-700 sm:text-right">
                  Type the characters you see above : <span className="text-red-500">*</span>
                </label>
                <div>
                  <TextField
                    id="captchaInput"
                    value={captchaInput}
                    onChange={(val) => {
                      setCaptchaInput(val)
                      setRegErrors(prev => ({ ...prev, captchaInput: '' }))
                    }}
                    className="max-w-[200px] border-slate-300"
                    error={!!regErrors.captchaInput}
                  />
                  {regErrors.captchaInput && (
                    <p className="text-xs text-red-500 mt-0.5">{regErrors.captchaInput}</p>
                  )}
                </div>
              </div>

              {/* 9. I Agree Checkbox & Terms Box */}
              <div className="flex flex-col sm:flex-row gap-3 items-start pt-2">
                <div className="flex items-center gap-1.5 sm:w-[170px] sm:justify-end pt-1">
                  <input
                    type="checkbox"
                    id="agree"
                    checked={agreeChecked}
                    onChange={(e) => {
                      setAgreeChecked(e.target.checked)
                      setRegErrors(prev => ({ ...prev, agreeChecked: '' }))
                    }}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="agree" className="text-xs sm:text-sm font-semibold text-slate-700 cursor-pointer">
                    I Agree <span className="text-red-500">*</span>
                  </label>
                </div>

                <div className="flex-1 w-full">
                  <textarea
                    readOnly
                    rows={4}
                    className="w-full text-xs p-2.5 border border-slate-300 rounded bg-slate-50 text-slate-700 resize-none font-sans leading-relaxed"
                    value={`This registration process works on Mozilla 3.0 / Google Chrome 13.0 and above.\n\nRead the sample registration form. Read all the points carefully before you start filling the Online Registration Form.`}
                  />
                  {regErrors.agreeChecked && (
                    <p className="text-xs text-red-500 mt-1">{regErrors.agreeChecked}</p>
                  )}
                </div>
              </div>

              {/* Action Buttons: SUBMIT and CLEAR */}
              <div className="flex justify-center gap-4 pt-6">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="px-8 h-10 text-white font-bold text-sm rounded shadow-md border border-sky-600 btn-app-gradient"
                  style={{ background: "var(--app-gradient)" }}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'SUBMIT'}
                </Button>

                <Button
                  type="button"
                  onClick={handleClearRegister}
                  className="px-8 h-10 bg-gradient-to-b from-slate-100 to-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-sm rounded shadow-sm border border-slate-300"
                >
                  CLEAR
                </Button>
              </div>

            </form>
          </div>
        </div>
      </div>

      {/* ================= AGE ELIGIBILITY FOOTER ================= */}

    </div>
  )
}

export default CreateAccount
