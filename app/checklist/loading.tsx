import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header skeleton */}
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>

        {/* Progress steps skeleton */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full" />
                {step < 3 && <Skeleton className="h-0.5 w-16 mx-2" />}
              </div>
            ))}
          </div>
        </div>

        {/* Main content skeleton */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Forms section skeleton */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <div className="grid md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((form) => (
                <div key={form} className="border rounded-lg p-4">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-3 w-full mb-3" />
                  <Skeleton className="h-8 w-24" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
