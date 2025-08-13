import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"
import { ErrorBoundary } from "@/components/error-boundary"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: {
    default: "VehicleReregister - Simplify Vehicle Registration for Interstate Moves",
    template: "%s | VehicleReregister",
  },
  description:
    "Get personalized vehicle registration checklists for interstate moves. Skip DMV confusion with step-by-step guides, required forms, and deadlines for all 50 states.",
  keywords: [
    "vehicle registration",
    "interstate move",
    "DMV forms",
    "car registration",
    "vehicle title transfer",
    "state registration requirements",
    "moving checklist",
    "vehicle re-registration",
  ],
  authors: [{ name: "VehicleReregister Team" }],
  creator: "VehicleReregister",
  publisher: "VehicleReregister",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vehiclereregister.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vehiclereregister.com",
    title: "VehicleReregister - Simplify Vehicle Registration for Interstate Moves",
    description:
      "Get personalized vehicle registration checklists for interstate moves. Skip DMV confusion with step-by-step guides, required forms, and deadlines for all 50 states.",
    siteName: "VehicleReregister",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VehicleReregister - Vehicle Registration Made Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VehicleReregister - Simplify Vehicle Registration for Interstate Moves",
    description:
      "Get personalized vehicle registration checklists for interstate moves. Skip DMV confusion with step-by-step guides, required forms, and deadlines for all 50 states.",
    images: ["/og-image.jpg"],
    creator: "@vehiclereregister",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${openSans.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "VehicleReregister",
              description:
                "Get personalized vehicle registration checklists for interstate moves. Skip DMV confusion with step-by-step guides, required forms, and deadlines for all 50 states.",
              url: "https://vehiclereregister.com",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              provider: {
                "@type": "Organization",
                name: "VehicleReregister",
                url: "https://vehiclereregister.com",
              },
              featureList: [
                "Personalized vehicle registration checklists",
                "All 50 US states supported",
                "Required forms and documents",
                "Registration deadlines and timelines",
                "Special circumstances handling",
                "Downloadable PDF guides",
              ],
            }),
          }}
        />
        <style>{`
html {
  font-family: ${workSans.style.fontFamily}, ${openSans.style.fontFamily};
  --font-work-sans: ${workSans.variable};
  --font-open-sans: ${openSans.variable};
}
        `}</style>
      </head>
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}
