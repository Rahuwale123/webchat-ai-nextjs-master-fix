"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/toast"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

interface FileUploadSectionProps {
  userId: string
  onStartProcessing: (isProcessing: boolean) => void
}

export default function FileUploadSection({ userId, onStartProcessing }: FileUploadSectionProps) {
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (files.length === 0) {
      toast.warning("No Files Selected", "Please upload at least one file to enhance your chatbot.")
      return
    }

    setIsLoading(true)
    onStartProcessing(true)

    try {
      const token = localStorage.getItem("authToken")
      let successCount = 0

      for (const file of files) {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("collection_name", userId) // Ensure files are added to the user's collection

        try {
          const response = await fetch(`${API_BASE_URL}/upload-and-process`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          })

          if (response.ok) {
            successCount++
          } else {
            const errorData = await response.json()
            console.error("File upload error:", errorData)
            toast.error(`Failed to process ${file.name}`, errorData.detail || "Unknown error")
          }
        } catch (error) {
          console.error("Error uploading file:", file.name, error)
          toast.error(`Error uploading ${file.name}`, "Network or server error")
        }
      }

      if (successCount > 0) {
        toast.success(
          `${successCount} ${successCount === 1 ? "File" : "Files"} Processed`,
          "Your chatbot has been enhanced with new information!",
        )
        setFiles([])
      }
    } catch (error) {
      console.error("Processing error:", error)
      toast.error("Processing Failed", "An unexpected error occurred")
    } finally {
      setIsLoading(false)
      onStartProcessing(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
    >
      <div className="space-y-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Enhance Your Chatbot</h2>
            <p className="text-gray-600">Upload additional files to make your chatbot even smarter</p>
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
            <input
              type="file"
              multiple
              accept=".pdf,.txt,.doc,.docx,.svg"
              onChange={handleFileUpload}
              disabled={isLoading}
              className="hidden"
              id="enhance-file-upload"
            />
            <label
              htmlFor="enhance-file-upload"
              className={`cursor-pointer ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <Upload className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-gray-600">Click to upload or drag files here</p>
              <p className="text-sm text-gray-400 mt-1">Supported: PDF, TXT, DOC, DOCX, SVG</p>
            </label>
          </div>

          {/* Uploaded Files */}
          {files.length > 0 && (
            <div className="space-y-2 mt-4">
              <p className="text-sm font-medium text-gray-700">{files.length} file(s) selected:</p>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    onClick={() => removeFile(index)}
                    disabled={isLoading}
                    className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading || files.length === 0}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Processing Files...</span>
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              <span>Enhance Chatbot with Files</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  )
}
