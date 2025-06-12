"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  email: string
  username: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (token) {
      try {
        // Decode JWT token to get user info
        const payload = JSON.parse(atob(token.split(".")[1]))
        setUser({
          id: payload.sub,
          email: payload.email || "",
          username: payload.username || "User",
        })
      } catch (error) {
        console.error("Error decoding token:", error)
        localStorage.removeItem("authToken")
      }
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem("authToken")
    setUser(null)
  }

  return { user, isLoading, logout }
}
