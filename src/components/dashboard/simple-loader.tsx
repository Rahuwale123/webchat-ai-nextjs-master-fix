"use client"

import { motion } from "framer-motion"
import { Bot, Sparkles } from "lucide-react"

export default function SimpleLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 text-center"
    >
      {/* Animated Bot Icon */}
      <motion.div
        className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Bot className="w-12 h-12 text-white" />
      </motion.div>

      {/* Loading Text */}
      <motion.h2
        className="text-3xl font-bold text-gray-800 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Creating Your AI Chatbot
      </motion.h2>

      <motion.p
        className="text-xl text-gray-600 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Please wait while we process your website and train your AI assistant...
      </motion.p>

      {/* Animated Progress Dots */}
      <div className="flex justify-center space-x-2 mb-8">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.2,
            }}
          />
        ))}
      </div>

      {/* Fun Facts */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <span className="text-blue-800 font-semibold">Did you know?</span>
        </div>
        <p className="text-blue-700 text-sm">
          Your AI chatbot will be able to understand context, remember conversations, and provide intelligent responses
          based on your website content!
        </p>
      </motion.div>

      {/* Processing Steps Indicator */}
      <motion.div
        className="mt-8 flex justify-center space-x-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {["Crawling Website", "Processing Content", "Training AI", "Finalizing"].map((step, index) => (
          <motion.div
            key={step}
            className="text-center"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: index * 0.5,
            }}
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-2"></div>
            <span className="text-xs text-gray-500">{step}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
