"use client"
import { motion } from "framer-motion"
import { Bot, Globe, Brain, Code, ArrowRight, Sparkles } from "lucide-react"
import AuthTabs from "@/components/auth/auth-tabs"
import { FloatingElements } from "@/components/ui/floating-elements"

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden font-afacad-flux">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-animation"></div>
      <FloatingElements />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center"
          >
           {/* <div className="flex items-center space-x-3 text-white">
              <div className="relative">
                <img src="image.png" alt="" className="w-15 h-12" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                BAAP AI
              </h1>
          </div> */}

          <div className="flex items-center space-x-3 px-4 py-2">
            <img
              src="image.png"
              alt="BAAP AI Logo"
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
            />
            <h1 className="text-[1.19rem] md:text-[1.325rem] font-bold text-white tracking-wide font-afacad-flux">
              BAAP <span className="text-blue-100">AI</span>
            </h1>

          </div>

          </motion.div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center space-x-2 text-blue-200"
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm font-medium font-afacad-flux">AI-Powered Solution</span>
                </motion.div>

                <h2 className="text-5xl lg:text-6xl font-bold leading-tight font-afacad-flux">
                  Create Your
                  <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    Custom AI Chatbot
                  </span>
                  in Minutes
                </h2>

                <p className="text-xl text-blue-100 leading-relaxed font-afacad-flux">
                  Transform any website into an intelligent chatbot. Simply provide a URL, and our AI will create a
                  smart assistant that understands your content.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: Globe, title: "Any Website", desc: "Scrape any URL" },
                  { icon: Brain, title: "AI-Powered", desc: "Smart responses" },
                  { icon: Code, title: "Easy Integration", desc: "One-click embed" },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="glass-effect rounded-2xl p-4 text-center"
                  >
                    <feature.icon className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <h3 className="font-semibold text-sm font-afacad-flux">{feature.title}</h3>
                    <p className="text-xs text-blue-200 mt-1 font-afacad-flux">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center space-x-2 text-yellow-400"
              >
                <span className="text-lg font-medium font-afacad-flux">Get started now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* Right Side - Auth Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full"
            >
              <AuthTabs />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}
