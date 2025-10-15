import type { Metadata } from "next"
import { US_STATES } from "@/lib/checklists"
import ChecklistPageClient from "./ChecklistPageClient"

export async function generateMetadata({
  searchParams,
}: { searchParams: { [key: string]: string | string[] | undefined } }): Promise<Metadata> {
  const fromState = (searchParams.from as string) || ""
  const toState = (searchParams.to as string) || ""

  const fromStateName = US_STATES[fromState] || fromState
  const toStateName = US_STATES[toState] || toState

  const title =
    fromState && toState
      ? `${fromStateName} to ${toStateName} Vehicle Registration Checklist`
      : "Vehicle Registration Checklist"

  const description =
    fromState && toState
      ? `Complete vehicle registration checklist for moving from ${fromStateName} to ${toStateName}. Get required forms, deadlines, and step-by-step instructions for your interstate move.`
      : "Get your personalized vehicle registration checklist with required forms, deadlines, and step-by-step instructions for your interstate move."

  return {
    title,
    description,
    keywords: [
      `${fromStateName} to ${toStateName} vehicle registration`,
      `${toStateName} vehicle registration requirements`,
      `${fromStateName} vehicle registration transfer`,
      "interstate vehicle registration",
      "DMV checklist",
      "vehicle registration forms",
      "car registration requirements",
    ],
    openGraph: {
      title: `${title} | VehicleReregister`,
      description,
      type: "website",
      url: `https://vehiclereregister.com/checklist?from=${fromState}&to=${toState}`,
      images: [
        {
          url: "/og-image-checklist.jpg",
          width: 1200,
          height: 630,
          alt: `${fromStateName} to ${toStateName} Vehicle Registration Checklist`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function ChecklistPage() {
  return <ChecklistPageClient />
}
