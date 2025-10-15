import type { Metadata } from "next"
import SuccessPageClient from "./SuccessPageClient"

export const metadata: Metadata = {
  title: "Success - Your Vehicle Registration Checklist is Ready",
  description:
    "Your personalized vehicle registration checklist has been generated successfully. Download your PDF guide or view your step-by-step instructions online.",
  openGraph: {
    title: "Success - Your Vehicle Registration Checklist is Ready | VehicleReregister",
    description:
      "Your personalized vehicle registration checklist has been generated successfully. Download your PDF guide or view your step-by-step instructions.",
    type: "website",
    url: "https://vehiclereregister.com/success",
    images: [
      {
        url: "/og-image-success.jpg",
        width: 1200,
        height: 630,
        alt: "Vehicle Registration Checklist Generated Successfully",
      },
    ],
  },
  robots: {
    index: false, // Don't index success pages
    follow: true,
  },
}

export default function SuccessPage() {
  return <SuccessPageClient />
}
