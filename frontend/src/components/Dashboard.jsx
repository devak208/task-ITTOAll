"use client"
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      navigate("/login")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 md:h-9 md:w-9 bg-black rounded-lg flex items-center justify-center">
                <svg className="h-4 w-4 md:h-5 md:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h1 className="text-lg md:text-xl font-semibold text-black">Dashboard</h1>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-gray-600 focus:outline-none"
              >
                <svg
                  className={`${mobileMenuOpen ? "hidden" : "block"} h-5 w-5`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${mobileMenuOpen ? "block" : "hidden"} h-5 w-5`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {/* User Avatar */}
                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-300">
                  {user?.avatar ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>

                {/* User Info */}
                <div>
                  <div className="text-sm font-medium text-black">{user?.name || "User"}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors duration-200"
              >
                <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${mobileMenuOpen ? "block" : "hidden"} md:hidden border-t border-gray-200`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-300">
                  {user?.avatar ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                  ) : (
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-black">{user?.name || "User"}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
              </div>
            </div>
            <div className="p-3">
              <button
                onClick={handleLogout}
                className="w-full flex justify-center items-center px-3 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors duration-200"
              >
                <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
            Welcome back, {user?.name || "User"}!
          </h2>
          <p className="text-gray-600">Here's what's happening with your account today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Account Status Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Account Status
                </h3>
                <p className="text-2xl font-bold text-black">
                  {user?.isVerified ? "Verified" : "Pending"}
                </p>
              </div>
              <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Member Since Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Member Since
                </h3>
                <p className="text-2xl font-bold text-black">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Today"}
                </p>
              </div>
              <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Login Method Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Login Method
                </h3>
                <p className="text-2xl font-bold text-black">
                  {user?.googleId ? "Google" : "Email"}
                </p>
              </div>
              <div className="h-12 w-12 bg-black rounded-lg flex items-center justify-center">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-6 6c-3 0-6 1-6 1s-3-1-6-1a6 6 0 01-6-6c0-3 3-6 6-6a6 6 0 016 6z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 rounded-t-lg">
            <h2 className="text-lg font-semibold text-black">Profile Information</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Picture */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center border border-gray-300">
                  {user?.avatar ? (
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                    />
                  ) : (
                    <span className="text-xl font-semibold text-gray-700">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-black mb-1">
                    {user?.name || "Unknown User"}
                  </h3>
                  <p className="text-gray-600">{user?.email}</p>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    User ID
                  </label>
                  <p className="text-sm text-black font-mono bg-gray-50 p-3 border border-gray-200 rounded overflow-x-auto">
                    {user?.id}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Account Created
                  </label>
                  <p className="text-sm text-black">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
