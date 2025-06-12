"use client"

import { motion } from "framer-motion"

export function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Shapes */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-40 right-20 w-16 h-16 bg-blue-400/20 rounded-full"
        animate={{
          y: [0, 30, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="absolute bottom-40 left-1/4 w-12 h-12 bg-purple-400/20 rounded-full"
        animate={{
          y: [0, -25, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-20 right-1/3 w-24 h-24 bg-pink-400/10 rounded-full"
        animate={{
          y: [0, 20, 0],
          x: [0, 15, 0],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  )
}
