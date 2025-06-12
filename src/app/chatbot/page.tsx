"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import ChatBot from "@/components/chatbot/chatbot"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

function ChatBotWrapper() {
  const searchParams = useSearchParams()
  const collectionName = searchParams.get("collection_name") || "default"

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "transparent" }}>
      <div className="w-full max-w-md" style={{ background: "transparent" }}>
        <ChatBot collectionName={collectionName} apiUrl={`${API_BASE_URL}/ask-question`} />
      </div>
    </div>
  )
}

export default function ChatBotPage() {
  return (
    <Suspense fallback={<div style={{ display: "none" }}>Loading chatbot...</div>}>
      <ChatBotWrapper />
    </Suspense>
  )
}
