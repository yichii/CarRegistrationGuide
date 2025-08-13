"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global error:", error)

    // Log to external service in production
    if (process.env.NODE_ENV === "production") {
      console.error("Production global error:", {
        message: error.message,
        digest: error.digest,
        stack: error.stack,
      })
    }
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900 mb-2">Application Error</h1>
              <p className="text-gray-600 mb-6">
                The application encountered a critical error. Please refresh the page to continue.
              </p>
              {process.env.NODE_ENV === "development" && (
                <div className="bg-gray-100 p-3 rounded-md mb-4 text-left">
                  <p className="text-sm font-mono text-gray-800">{error.message}</p>
                  {error.digest && <p className="text-xs text-gray-600 mt-1">Error ID: {error.digest}</p>}
                </div>
              )}
              <button
                onClick={reset}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
