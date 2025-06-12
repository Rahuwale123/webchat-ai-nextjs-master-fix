"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react"

interface Toast {
  id: string
  type: "success" | "error" | "warning"
  title: string
  description?: string
}

let toastCounter = 0
const toasts: Toast[] = []
const listeners: ((toasts: Toast[]) => void)[] = []

export const toast = {
  success: (title: string, description?: string) => {
    addToast({ type: "success", title, description })
  },
  error: (title: string, description?: string) => {
    addToast({ type: "error", title, description })
  },
  warning: (title: string, description?: string) => {
    addToast({ type: "warning", title, description })
  },
}

function addToast(toast: Omit<Toast, "id">) {
  const id = (++toastCounter).toString()
  const newToast = { ...toast, id }
  toasts.push(newToast)
  listeners.forEach((listener) => listener([...toasts]))

  // Auto remove after 4 seconds
  setTimeout(() => {
    removeToast(id)
  }, 4000)
}

function removeToast(id: string) {
  const index = toasts.findIndex((toast) => toast.id === id)
  if (index > -1) {
    toasts.splice(index, 1)
    listeners.forEach((listener) => listener([...toasts]))
  }
}

export function Toaster() {
  const [toastList, setToastList] = useState<Toast[]>([])

  useEffect(() => {
    listeners.push(setToastList)
    return () => {
      const index = listeners.indexOf(setToastList)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toastList.map((toast) => (
          <ToastComponent key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastComponent({ toast, onRemove }: { toast: Toast; onRemove: () => void }) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
  }

  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  }

  const iconColors = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
  }

  const Icon = icons[toast.type]

  return (
    <motion.div
      initial={{ opacity: 0, x: 300, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.5, transition: { duration: 0.2 } }}
      className={`${colors[toast.type]} border rounded-lg shadow-lg p-4 min-w-[300px] max-w-[400px]`}
    >
      <div className="flex items-start space-x-3">
        <Icon className={`w-5 h-5 ${iconColors[toast.type]} mt-0.5 flex-shrink-0`} />
        <div className="flex-1">
          <h4 className="font-semibold text-sm">{toast.title}</h4>
          {toast.description && <p className="text-sm opacity-90 mt-1">{toast.description}</p>}
        </div>
        <button onClick={onRemove} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}
