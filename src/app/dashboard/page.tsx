"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sparkles, Zap, Target } from "lucide-react"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import InputSection from "@/components/dashboard/input-section"
import SimpleLoader from "@/components/dashboard/simple-loader"
import ResultSection from "@/components/dashboard/result-section"
import ExistingChatbot from "@/components/dashboard/existing-chatbot"
import FileUploadSection from "@/components/dashboard/file-upload-section"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "@/components/ui/toast"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [showLoader, setShowLoader] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null)
  const [existingChatbot, setExistingChatbot] = useState<any>(null)
  const [hasShownCompletionToast, setHasShownCompletionToast] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    // Check for existing chatbot
    if (user?.id) {
      const saved = localStorage.getItem(`chatbot_${user.id}`)
      if (saved) {
        setExistingChatbot(JSON.parse(saved))
      }
    }
  }, [user])

  // Progress tracking function
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (currentTaskId && showLoader) {
      const checkProgress = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/scraping-progress/${currentTaskId}`)
          if (response.ok) {
            const data = await response.json()
            console.log("Progress data:", data)

            if (data.status === "completed" || data.is_completed) {
              clearInterval(interval)
              setShowLoader(false)
              setShowResult(true)

              // Show completion toast only once
              if (!hasShownCompletionToast) {
                toast.success("Chatbot Created!", "Your AI chatbot is ready to use!")
                setHasShownCompletionToast(true)
              }

              // Save chatbot data
              const chatbotData = {
                userId: user?.id,
                createdAt: new Date().toISOString(),
                ...data,
              }
              localStorage.setItem(`chatbot_${user?.id}`, JSON.stringify(chatbotData))
              setExistingChatbot(chatbotData)
            } else if (data.status === "error" || data.error) {
              clearInterval(interval)
              setShowLoader(false)
              toast.error("Processing Failed", data.error || "An error occurred during processing")
            }
          }
        } catch (error) {
          console.error("Error checking progress:", error)
        }
      }

      // Check immediately and then every 3 seconds
      checkProgress()
      interval = setInterval(checkProgress, 3000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [currentTaskId, showLoader, user?.id, hasShownCompletionToast])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-afacad-flux">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4 font-afacad-flux"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </motion.div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 font-afacad-flux">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 py-8"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium text-sm font-afacad-flux">AI-Powered Chatbot Builder</span>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-afacad-flux">
            Create Your AI Chatbot
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-afacad-flux">
            Transform any website into an intelligent chatbot that understands your content and provides instant,
            accurate responses to your visitors.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { icon: Zap, text: "Lightning Fast", color: "from-yellow-400 to-orange-500" },
              { icon: Target, text: "Highly Accurate", color: "from-green-400 to-blue-500" },
              { icon: Sparkles, text: "AI-Powered", color: "from-purple-400 to-pink-500" },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`flex items-center space-x-2 bg-gradient-to-r ${feature.color} text-white px-4 py-2 rounded-full shadow-lg`}
              >
                <feature.icon className="w-4 h-4" />
                <span className="font-medium text-sm font-afacad-flux">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Area */}
        {existingChatbot && !showLoader && (
          <>
            <ExistingChatbot chatbot={existingChatbot} userId={user.id} onShowResult={() => setShowResult(true)} />

            {/* File Upload Section for Existing Chatbot */}
            <FileUploadSection
              userId={user.id}
              onStartProcessing={(isProcessing) => {
                setShowLoader(isProcessing)
                setHasShownCompletionToast(false)
              }}
            />
          </>
        )}

        {!existingChatbot && !showLoader && !showResult && (
          <InputSection
            onStartProcessing={(taskId) => {
              setCurrentTaskId(taskId)
              setShowLoader(true)
              setShowResult(false)
              setHasShownCompletionToast(false) // Reset toast flag
            }}
            userId={user.id}
          />
        )}

        {showLoader && <SimpleLoader />}

        {showResult && <ResultSection userId={user.id} />}
      </main>
    </div>
  )
}
