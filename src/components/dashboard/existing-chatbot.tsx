"use client"

import { motion } from "framer-motion"
import { Bot, Code, MessageCircle } from "lucide-react"

interface ExistingChatbotProps {
  chatbot: any
  userId: string
  onShowResult: () => void
}
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  return "http://localhost:3000" // Fallback for SSR or unexpected cases
}

const baseUrl = getBaseUrl()

export default function ExistingChatbot({ chatbot, userId, onShowResult }: ExistingChatbotProps) {
  const testChatbot = () => {
    window.open(`${baseUrl}?collection_name=${userId}`, "_blank")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg"
    >
      <div className="flex items-center space-x-3 mb-4">
        <Bot className="w-8 h-8" />
        <div>
          <h3 className="text-xl font-bold">🤖 Your Existing Chatbot</h3>
          <p className="text-white/80">Created on: {new Date(chatbot.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onShowResult}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
        >
          <Code className="w-4 h-4" />
          <span>View Embed Code</span>
        </button>
        <button
          onClick={testChatbot}
          className="flex items-center justify-center space-x-2 px-4 py-2 bg-white/90 text-green-600 hover:bg-white rounded-lg transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Test Chatbot</span>
        </button>
      </div>
    </motion.div>
  )
}
