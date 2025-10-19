import type React from "react"
import { AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react"

interface CalloutProps {
  type?: "info" | "warning" | "success" | "error"
  children: React.ReactNode
}

export function Callout({ type = "info", children }: CalloutProps) {
  const styles = {
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-900",
      icon: <Info className="h-5 w-5 text-blue-600" />,
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-900",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
    },
    success: {
      container: "bg-green-50 border-green-200 text-green-900",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
    },
    error: {
      container: "bg-red-50 border-red-200 text-red-900",
      icon: <AlertCircle className="h-5 w-5 text-red-600" />,
    },
  }

  const style = styles[type]

  return (
    <div className={`my-6 flex gap-3 rounded-lg border p-4 ${style.container}`}>
      <div className="flex-shrink-0 mt-0.5">{style.icon}</div>
      <div className="flex-1 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
