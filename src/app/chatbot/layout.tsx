import type React from "react"
import { Afacad  } from "next/font/google"

const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-afacad-flux",
})

export default function ChatbotLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${afacad.variable} font-afacad-flux`} style={{
      background: "transparent",
      margin: 0,
      padding: 0,
      height: "100%",
      overflow: "hidden",
      fontFamily: "var(--font-afacad-flux), sans-serif",
    }}>
      {children}
    </div>
  )
}
