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
    <html lang="en" className={afacad.variable}>
      <head>
        <style>{`
          html, body {
            background: transparent !important;
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
            font-family: var(--font-afacad-flux), sans-serif;
          }
        `}</style>
      </head>
      <body className="font-afacad-flux">{children}</body>
    </html>
  )
}
