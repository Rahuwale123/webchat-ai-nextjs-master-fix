"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, MessageCircle, Check, ExternalLink, Code2 } from "lucide-react"
import { CheckCircle } from "lucide-react"
import { toast } from "@/components/ui/toast"
interface ResultSectionProps {
  userId: string
}

export default function ResultSection({ userId }: ResultSectionProps) {
  const [copied, setCopied] = useState(false)

  const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  return "http://localhost:3000" // Fallback for SSR or unexpected cases
}

const baseUrl = getBaseUrl()
  const iframeCode = `<iframe
  src="${baseUrl}/chatbot?collection_name=${userId}"
  width="400"
  height="600"
  style="background: transparent !important; border: none; position: fixed; bottom: 20px; right: 20px; z-index: 9999; border-radius: 12px; overflow: hidden;"
  allowtransparency="true"
  frameborder="0"
  title="AI Chatbot">
</iframe>`

  const copyCode = () => {
    navigator.clipboard.writeText(iframeCode)
    setCopied(true)
    toast.success("Code Copied!", "Embed code has been copied to your clipboard")
    setTimeout(() => setCopied(false), 3000)
  }

  const testChatbot = () => {
    const chatbotUrl = `${baseUrl}/chatbot?collection_name=${userId}`
    window.open(chatbotUrl, "_blank")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
    >
      {/* Success Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </motion.div>

        <motion.h2
          className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          🎉 Your Chatbot is Ready!
        </motion.h2>

        <motion.p
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Your AI-powered chatbot has been successfully created. Copy the embed code below and add it to your website.
        </motion.p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[
          { title: "Instant Responses", desc: "AI-powered answers in real-time", color: "from-blue-500 to-cyan-500" },
          { title: "Easy Integration", desc: "One-click embed on any website", color: "from-purple-500 to-pink-500" },
          { title: "Smart Learning", desc: "Understands your content deeply", color: "from-green-500 to-emerald-500" },
        ].map((feature, index) => (
          <div
            key={feature.title}
            className={`bg-gradient-to-r ${feature.color} p-4 rounded-xl text-white text-center`}
          >
            <h4 className="font-semibold mb-1">{feature.title}</h4>
            <p className="text-sm opacity-90">{feature.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Code Container */}
      <motion.div
        className="bg-gray-900 rounded-xl overflow-hidden mb-8 shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Code2 className="w-5 h-5 text-gray-300" />
            <span className="text-gray-300 font-medium">Embed Code</span>
          </div>
          <motion.button
            onClick={copyCode}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              copied ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copied!" : "Copy Code"}</span>
          </motion.button>
        </div>
        <div className="p-6">
          <pre className="text-green-400 text-sm overflow-x-auto leading-relaxed">
            <code>{iframeCode}</code>
          </pre>
        </div>
      </motion.div>

      {/* Action Button - Only Test Chatbot */}
      <motion.div
        className="flex justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          onClick={testChatbot}
          className="flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:shadow-lg font-medium"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle className="w-5 h-5" />
          <span>Test Your Chatbot</span>
          <ExternalLink className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Instructions */}
      <motion.div
        className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <h3 className="font-semibold text-blue-800 mb-2">How to use your chatbot:</h3>
        <ol className="text-blue-700 space-y-1 text-sm">
          <li>1. Copy the embed code above</li>
          <li>2. Paste it into your website's HTML before the closing &lt;/body&gt; tag</li>
          <li>3. Your chatbot will appear as a floating widget on your site</li>
          <li>4. Visitors can click to chat and get instant AI-powered responses</li>
        </ol>
      </motion.div>
    </motion.div>
  )
}
