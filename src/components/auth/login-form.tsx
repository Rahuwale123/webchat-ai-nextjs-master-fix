"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/toast"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/login/json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem("authToken", data.access_token)
        toast.success("Welcome back!", "Login successful. Redirecting to dashboard...")

        // Redirect after a short delay to show the toast
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } else {
        toast.error("Login Failed", data.detail || "Invalid email or password")
      }
    } catch (error) {
      toast.error("Connection Error", "Unable to connect to server. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="space-y-4">
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="email" className="text-white flex items-center space-x-2 text-sm font-medium">
            <Mail className="w-4 h-4" />
            <span>Email Address</span>
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 pl-11 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
              placeholder="Enter your email"
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
          </div>
        </motion.div>

        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label htmlFor="password" className="text-white flex items-center space-x-2 text-sm font-medium">
            <Lock className="w-4 h-4" />
            <span>Password</span>
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 pl-11 pr-11 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/60 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
              placeholder="Enter your password"
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Signing in...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </div>
        )}
      </motion.button>
    </motion.form>
  )
}
