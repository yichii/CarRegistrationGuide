import { LoadingSpinner } from "./loading-spinner"

interface PageLoaderProps {
  message?: string
  showSpinner?: boolean
}

export function PageLoader({ message = "Loading...", showSpinner = true }: PageLoaderProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        {showSpinner && (
          <div className="mb-4 flex justify-center">
            <LoadingSpinner size="lg" />
          </div>
        )}
        <p className="text-lg text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  )
}
