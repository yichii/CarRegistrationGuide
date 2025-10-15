import type { Metadata } from "next"
import HelpPageClient from "./HelpPageClient"

export const metadata: Metadata = {
  title: "Help Center | VehicleReregister",
  description:
    "Find comprehensive guides, tutorials, and resources for vehicle registration when moving between states.",
  keywords: "help center, vehicle registration guides, DMV help, interstate move resources",
  openGraph: {
    title: "Help Center - Vehicle Registration Resources",
    description: "Access comprehensive guides and resources for vehicle registration across all 50 states.",
    type: "website",
  },
}

export default function HelpPage() {
  return <HelpPageClient />
}
