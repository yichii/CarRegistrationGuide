import type { Metadata } from "next"
import FAQPageClient from "./FAQPageClient"

export const metadata: Metadata = {
  title: "Frequently Asked Questions | VehicleReregister",
  description:
    "Get answers to common questions about vehicle registration, interstate moves, DMV requirements, and our service.",
  keywords: "vehicle registration FAQ, DMV questions, interstate move help, car registration answers",
  openGraph: {
    title: "FAQ - Vehicle Registration Questions Answered",
    description: "Find answers to the most common questions about vehicle registration when moving between states.",
    type: "website",
  },
}

export default function FAQPage() {
  return <FAQPageClient />
}
