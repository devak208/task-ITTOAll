"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Icons } from "./Icons"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const { forgotPassword, isLoading } = useAuth()
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await forgotPassword(email)
      navigate("/verify-otp", { state: { email } })
    } catch (error) {
      // Error is handled in the context
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 bg-black rounded-lg flex items-center justify-center mb-4">
              <Icons.Shield className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">Forgot your password?</h2>
            <p className="text-gray-600">Enter your email address and we'll send you an OTP to reset your password.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200"
                  placeholder="Enter your email address"
                />                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Icons.Email className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >              {isLoading ? (
                <div className="flex items-center">
                  <Icons.Spinner className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                  Sending OTP...
                </div>
              ) : (
                "Send OTP"
              )}
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm font-medium text-black hover:text-gray-600 transition-colors duration-200"
              >                <Icons.ArrowLeft className="mr-1 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
