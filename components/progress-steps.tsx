import { cn } from "@/lib/utils"

interface ProgressStepsProps {
  currentStep: number
  totalSteps: number
}

export function ProgressSteps({ currentStep, totalSteps }: ProgressStepsProps) {
  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
            index + 1 === currentStep
              ? "bg-blue-600 text-white dark:bg-blue-500"
              : index + 1 < currentStep
                ? "bg-green-600 text-white dark:bg-green-500"
                : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
          )}
        >
          {index + 1 < currentStep ? "✓" : index + 1}
        </div>
      ))}
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">
        Step {currentStep} of {totalSteps}
      </span>
    </div>
  )
}
