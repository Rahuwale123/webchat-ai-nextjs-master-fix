import type React from "react"
import type { Metadata } from "next"
import { Afacad  } from "next/font/google"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toast"

const inter = Inter({ subsets: ["latin"] })

const afacadFlux = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-afacad-flux",
})

export const metadata: Metadata = {
  title: "BAAP AI - Create Your Custom AI Chatbot",
  description: "Transform any website into an intelligent chatbot in minutes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${afacadFlux.variable} font-afacad-flux`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
