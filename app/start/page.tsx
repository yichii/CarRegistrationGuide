import type { Metadata } from "next"
import StartPageClient from "./StartPageClient"

export const metadata: Metadata = {
  title: "Get Started - Create Your Vehicle Registration Checklist",
  description:
    "Tell us about your interstate move and get a personalized vehicle registration checklist. Select your states, vehicle types, and special circumstances for customized guidance.",
  keywords: [
    "vehicle registration checklist",
    "interstate move form",
    "DMV requirements",
    "car registration guide",
    "vehicle registration wizard",
    "state-to-state vehicle registration",
  ],
  openGraph: {
    title: "Get Started - Create Your Vehicle Registration Checklist | VehicleReregister",
    description:
      "Tell us about your interstate move and get a personalized vehicle registration checklist. Select your states, vehicle types, and special circumstances.",
    type: "website",
    url: "https://vehiclereregister.com/start",
    images: [
      {
        url: "/og-image-start.jpg",
        width: 1200,
        height: 630,
        alt: "Create Your Vehicle Registration Checklist",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function StartPage() {
  return <StartPageClient />
}
