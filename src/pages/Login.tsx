import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Field, TextField } from "@/components/FormPrimitives"
import { User, Lock, Loader2, LogIn, UserPlus } from "lucide-react"
import { toast } from "@/components/ui/toast"
import { useAuth } from "@/context/AuthContext"
import logoImg from "@/assets/images/logo.png"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  // Login form state
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loginErrors, setLoginErrors] = useState<{ userId?: string; password?: string }>({})

  // Handle Login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errors: { userId?: string; password?: string } = {}
    if (!userId.trim()) errors.userId = 'User ID is required'
    if (!password) errors.password = 'Password is required'
    setLoginErrors(errors)

    if (Object.keys(errors).length > 0) return

    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 600))

    const cleanUser = userId.trim().toLowerCase()

    if (cleanUser === 'admin' && password === '123') {
      toast.success('Welcome Administrator! Redirecting to Admin Panel...')
      login({ userId: 'admin', name: 'Administrator', role: 'admin', roles: ['admin'] })
      navigate('/admin/students')
    } else if (cleanUser === 'user' && password === '123') {
      toast.success('Welcome Parent/User! Redirecting...')
      login({ userId: 'user', name: 'Regular User', role: 'user', roles: ['user'] })
      navigate('/home')
    } else {
      setLoginErrors({
        userId: 'Invalid User ID or Password',
        password: 'Try user / 123 or admin / 123'
      })
      toast.error('Invalid Credentials. Use user/123 or admin/123')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen w-full bg-[#f0f7ff] flex flex-col font-sans">
      {/* ================= TOP BAR ================= */}


      {/* ================= MAIN CONTENT CONTAINER (CENTERED) ================= */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        {/* ================= LOGIN CARD ================= */}
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-sky-100 p-6 sm:p-8">
          {/* School Crest Logo */}
          <div className="flex justify-center mb-3">
            <img
              src={logoImg}
              alt="School Crest Logo"
              className="w-28 h-28 object-contain drop-shadow-md"
            />
          </div>

          {/* ================= PAGE TITLE ================= */}
          <div className="w-full text-center pt-2 pb-4 px-4">
            <h1 className="text-lg sm:text-2xl font-bold text-slate-800 tracking-wide">
              PRE-KG (2025-26) ONLINE REGISTRATION
            </h1>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* User ID Field using FormPrimitives */}
            <Field label="User ID" required error={!!loginErrors.userId} errorText={loginErrors.userId}>
              <TextField
                id="userId"
                placeholder="Enter your User ID"
                value={userId}
                onChange={(val) => {
                  setUserId(val)
                  setLoginErrors(prev => ({ ...prev, userId: undefined }))
                }}
                leftIcon={<User className="h-4 w-4 text-sky-600" />}
                error={!!loginErrors.userId}
                disabled={isLoading}
                autoComplete="username"
                className="h-11 border-slate-300 focus:ring-sky-500"
              />
            </Field>

            {/* Password Field using FormPrimitives */}
            <Field label="Password" required error={!!loginErrors.password} errorText={loginErrors.password}>
              <TextField
                id="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(val) => {
                  setPassword(val)
                  setLoginErrors(prev => ({ ...prev, password: undefined }))
                }}
                leftIcon={<Lock className="h-4 w-4 text-sky-600" />}
                showPasswordToggle
                error={!!loginErrors.password}
                disabled={isLoading}
                autoComplete="current-password"
                className="h-11 border-slate-300 focus:ring-sky-500"
              />
            </Field>

            {/* Forgot Password Link */}
            <div className="text-left pt-0.5">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  toast.info("Please contact IT support to reset your password.")
                }}
                className="text-xs text-[#0088b6] font-semibold hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* LOGIN Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 btn-app-gradient text-white text-sm font-bold rounded-lg shadow-sm transition-all mt-2 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  LOGGING IN...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  LOGIN
                </>
              )}
            </Button>

            {/* OR Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="w-full border-t border-slate-200" />
              <span className="absolute bg-white px-3 text-xs font-semibold text-slate-400">
                OR
              </span>
            </div>

            {/* CREATE NEW ACCOUNT Button (Navigates to /create) */}
            <Button
              type="button"
              onClick={() => navigate('/create')}
              className="w-full h-11 bg-white hover:bg-sky-50 border-2 border-[#0a6f9c] text-[#0a6f9c] text-sm font-bold rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="h-4 w-4" />
              CREATE NEW ACCOUNT
            </Button>
            {/* Demo Credentials Quick Click Helper */}
            {/* <div className="mt-4 p-3 rounded-lg bg-sky-50/80 border border-sky-200 text-xs text-sky-900 space-y-1.5">
            <p className="font-bold text-center text-slate-800">Quick Test Credentials:</p>
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => { setUserId('user'); setPassword('123'); setLoginErrors({}); }}
                className="px-2.5 py-1 bg-white hover:bg-sky-100 border border-sky-300 rounded font-semibold text-sky-800 shadow-2xs transition-colors cursor-pointer"
              >
                User: <span className="font-mono text-blue-700">user</span> / <span className="font-mono text-blue-700">123</span>
              </button>
              <button
                type="button"
                onClick={() => { setUserId('admin'); setPassword('123'); setLoginErrors({}); }}
                className="px-2.5 py-1 bg-white hover:bg-sky-100 border border-sky-300 rounded font-semibold text-purple-800 shadow-2xs transition-colors cursor-pointer"
              >
                Admin: <span className="font-mono text-purple-700">admin</span> / <span className="font-mono text-purple-700">123</span>
              </button>
            </div>
          </div> */}
          </form>

          {/* ================= AGE ELIGIBILITY FOOTER ================= */}
          <div className="text-center text-slate-700 pt-5 pb-2 px-4 space-y-0.5">
            <p className="text-[13px] font-semibold">
              Age eligibility minimum 3 years as on 1st June 2025
            </p>
            <p className="text-[12px]">
              (i.e., Children born between 01/06/2021 and 31/05/2022 – both days inclusive) ONLY are eligible for registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login