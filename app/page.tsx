import type { Metadata } from "next"
import LandingPageClient from "./LandingPageClient"

export const metadata: Metadata = {
  title: "VehicleReregister - Simplify Vehicle Registration for Interstate Moves",
  description:
    "Get personalized vehicle registration checklists for interstate moves. Skip DMV confusion with step-by-step guides, required forms, and deadlines for all 50 states. Free service covering all US states.",
  keywords: [
    "vehicle registration",
    "interstate move",
    "DMV forms",
    "car registration checklist",
    "vehicle title transfer",
    "state registration requirements",
    "moving vehicle registration",
    "DMV requirements by state",
  ],
  openGraph: {
    title: "VehicleReregister - Simplify Vehicle Registration for Interstate Moves",
    description:
      "Get personalized vehicle registration checklists for interstate moves. Skip DMV confusion with step-by-step guides, required forms, and deadlines for all 50 states.",
    type: "website",
    url: "https://vehiclereregister.com",
    images: [
      {
        url: "/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "VehicleReregister Homepage - Vehicle Registration Made Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VehicleReregister - Simplify Vehicle Registration for Interstate Moves",
    description:
      "Get personalized vehicle registration checklists for interstate moves. Skip DMV confusion with step-by-step guides, required forms, and deadlines.",
    images: ["/og-image-home.jpg"],
  },
  alternates: {
    canonical: "https://vehiclereregister.com",
  },
}

export default function LandingPage() {
  return <LandingPageClient />
}
