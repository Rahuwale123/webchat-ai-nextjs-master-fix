"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import LoginForm from "./login-form"
import SignupForm from "./signup-form"

export default function AuthTabs() {
  const [activeTab, setActiveTab] = useState("login")

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="glass-effect rounded-3xl p-8 backdrop-blur-xl"
    >
      <div className="w-full">
        {/* Tab Navigation */}
        <div className="grid w-full grid-cols-2 mb-8 bg-white/20 backdrop-blur-sm rounded-lg p-1">
          <button
            onClick={() => setActiveTab("login")}
            className={`py-2 px-4 rounded-md font-medium transition-all ${
              activeTab === "login" ? "bg-white text-blue-600 shadow-sm" : "text-white hover:bg-white/10"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`py-2 px-4 rounded-md font-medium transition-all ${
              activeTab === "signup" ? "bg-white text-blue-600 shadow-sm" : "text-white hover:bg-white/10"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "login" && <LoginForm />}
          {activeTab === "signup" && <SignupForm />}
        </div>
      </div>
    </motion.div>
  )
}
