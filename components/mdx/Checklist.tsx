import { Check } from "lucide-react"

interface ChecklistProps {
  items: string[]
}

export function Checklist({ items }: ChecklistProps) {
  return (
    <div className="my-6 rounded-lg border border-gray-200 bg-white p-6">
      <h4 className="mb-4 font-semibold text-gray-900">Checklist</h4>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                <Check className="h-3 w-3 text-green-600" />
              </div>
            </div>
            <span className="text-sm text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
