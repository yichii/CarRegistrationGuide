import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Support | CarRegistrationGuide",
  description:
    "Get help with vehicle registration questions. Contact our support team for personalized assistance with your interstate move.",
  keywords: "contact support, vehicle registration help, DMV assistance, customer service",
  openGraph: {
    title: "Contact Support - Get Vehicle Registration Help",
    description: "Need help with your vehicle registration? Contact our support team for personalized assistance.",
    type: "website",
  },
}

export default function ContactPage() {
  return <ContactPageClient />
}
