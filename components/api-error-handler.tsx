"use client"

import { useState } from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ApiError {
  message: string
  status?: number
  code?: string
}

interface ApiErrorHandlerProps {
  error: ApiError | null
  onRetry?: () => void
  onDismiss?: () => void
  className?: string
}

export function ApiErrorHandler({ error, onRetry, onDismiss, className }: ApiErrorHandlerProps) {
  const [isRetrying, setIsRetrying] = useState(false)

  if (!error) return null

  const handleRetry = async () => {
    if (!onRetry) return

    setIsRetrying(true)
    try {
      await onRetry()
    } finally {
      setIsRetrying(false)
    }
  }

  const getErrorMessage = (error: ApiError) => {
    if (error.status === 404) {
      return "The requested resource was not found. Please check your selection and try again."
    }
    if (error.status === 500) {
      return "We're experiencing technical difficulties. Please try again in a moment."
    }
    if (error.status === 429) {
      return "Too many requests. Please wait a moment before trying again."
    }
    if (!navigator.onLine) {
      return "You appear to be offline. Please check your internet connection and try again."
    }
    return error.message || "An unexpected error occurred. Please try again."
  }

  return (
    <Alert className={`border-red-200 bg-red-50 ${className}`}>
      <AlertCircle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-800">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="font-medium mb-1">Error</p>
            <p className="text-sm">{getErrorMessage(error)}</p>
            {process.env.NODE_ENV === "development" && error.code && (
              <p className="text-xs text-red-600 mt-1">Code: {error.code}</p>
            )}
          </div>
          <div className="flex gap-2 ml-4">
            {onRetry && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleRetry}
                disabled={isRetrying}
                className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
              >
                {isRetrying ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-600 mr-1" />
                ) : (
                  <RefreshCw className="h-3 w-3 mr-1" />
                )}
                Retry
              </Button>
            )}
            {onDismiss && (
              <Button size="sm" variant="ghost" onClick={onDismiss} className="text-red-700 hover:bg-red-100">
                Dismiss
              </Button>
            )}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  )
}
