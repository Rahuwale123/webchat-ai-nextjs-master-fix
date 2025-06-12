"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Globe, Cog, Brain, Database, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { toast } from "@/components/ui/toast"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

interface ProgressSectionProps {
  taskId: string
  onComplete: (data: any) => void
}

interface ProgressData {
  status: string
  progress?: number
  pages_scraped?: number
  chunks_created?: number
  error?: string
  is_completed?: boolean
}

export default function ProgressSection({ taskId, onComplete }: ProgressSectionProps) {
  const [currentStep, setCurrentStep] = useState("crawling")
  const [progressData, setProgressData] = useState<ProgressData>({ status: "crawling" })
  const [error, setError] = useState<string | null>(null)

  const steps = [
    {
      id: "crawling",
      label: "Crawling Website",
      icon: Globe,
      description: "Discovering and extracting content...",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "processing",
      label: "Processing Content",
      icon: Cog,
      description: "Analyzing and structuring data...",
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "generating_embeddings",
      label: "Generating AI Embeddings",
      icon: Brain,
      description: "Creating intelligent understanding...",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "storing",
      label: "Storing Data",
      icon: Database,
      description: "Saving to knowledge base...",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "completed",
      label: "Completed",
      icon: CheckCircle,
      description: "Your chatbot is ready!",
      color: "from-emerald-500 to-green-500",
    },
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout

    const fetchProgress = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/scraping-progress/${taskId}`)
        if (response.ok) {
          const data: ProgressData = await response.json()
          console.log("Progress data:", data) // Debug log

          setProgressData(data)
          setCurrentStep(data.status)

          if (data.status === "completed" || data.is_completed) {
            clearInterval(interval)
            toast.success("Chatbot Created!", "Your AI chatbot is ready to use!")
            onComplete(data)
          } else if (data.status === "error" || data.error) {
            clearInterval(interval)
            setError(data.error || "An error occurred during processing")
            toast.error("Processing Failed", data.error || "An error occurred during processing")
          }
        } else {
          console.error("Failed to fetch progress:", response.status)
        }
      } catch (error) {
        console.error("Error fetching progress:", error)
        setError("Failed to fetch progress")
      }
    }

    // Initial fetch
    fetchProgress()

    // Set up interval for polling
    interval = setInterval(fetchProgress, 2000)

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [taskId, onComplete])

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 border border-red-200"
      >
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-2">Processing Failed</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
    >
      <div className="text-center mb-8">
        <motion.div
          className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <Clock className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Processing Your Website</h2>
        <p className="text-gray-600">Creating your intelligent chatbot...</p>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{progressData.pages_scraped || 0}</div>
          <div className="text-sm text-blue-800">Pages Scraped</div>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{progressData.chunks_created || 0}</div>
          <div className="text-sm text-purple-800">Text Chunks</div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep
          const isCompleted = steps.findIndex((s) => s.id === currentStep) > index
          const Icon = step.icon

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-center space-x-4 p-6 rounded-xl transition-all duration-500 ${
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-lg"
                  : isCompleted
                    ? "bg-green-50 border border-green-200"
                    : "bg-gray-50 border border-gray-200 opacity-60"
              }`}
            >
              {/* Step Icon */}
              <div
                className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive
                    ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                    : isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-500"
                }`}
              >
                <Icon className="w-7 h-7" />
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white/50"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{step.label}</h3>
                <p className="text-gray-600 mb-2">{step.description}</p>

                {/* Progress Bar for Active Step */}
                {isActive && (
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>
                )}

                {/* Completion Checkmark */}
                {isCompleted && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center text-green-600 font-medium"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Completed
                  </motion.div>
                )}
              </div>

              {/* Step Number */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  isActive || isCompleted ? "bg-white text-gray-800 shadow-md" : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Current Status */}
      <motion.div
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-center space-x-2">
          <motion.div
            className="w-3 h-3 bg-blue-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
          <span className="text-blue-800 font-medium">Currently {currentStep.replace("_", " ")}... Please wait</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
