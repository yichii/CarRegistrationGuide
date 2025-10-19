import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DownloadButtonProps {
  href: string
  label: string
}

export function DownloadButton({ href, label }: DownloadButtonProps) {
  return (
    <div className="my-6">
      <Button asChild className="gap-2">
        <a href={href} download>
          <Download className="h-4 w-4" />
          {label}
        </a>
      </Button>
    </div>
  )
}
