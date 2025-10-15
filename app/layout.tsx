import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"
import { ErrorBoundary } from "@/components/error-boundary"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

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
    default: "CarRegistrationGuide - Simplify Vehicle Registration for Interstate Moves",
    template: "%s | CarRegistrationGuide",
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
  authors: [{ name: "CarRegistrationGuide Team" }],
  creator: "CarRegistrationGuide",
  publisher: "CarRegistrationGuide",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://carregistrationguide.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://carregistrationguide.com",
    title: "CarRegistrationGuide - Simplify Vehicle Registration for Interstate Moves",
    description:
      "Get personalized vehicle registration checklists for interstate moves. Skip DMV confusion with step-by-step guides, required forms, and deadlines for all 50 states.",
    siteName: "CarRegistrationGuide",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CarRegistrationGuide - Vehicle Registration Made Simple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CarRegistrationGuide - Simplify Vehicle Registration for Interstate Moves",
    description:
      "Get personalized vehicle registration checklists for interstate moves. Skip DMV confusion with step-by-step guides, required forms, and deadlines for all 50 states.",
    images: ["/og-image.jpg"],
    creator: "@carregistrationguide",
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
  generator: "v0.app",
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
              name: "CarRegistrationGuide",
              description:
                "Get personalized vehicle registration checklists for interstate moves. Skip DMV confusion with step-by-step guides, required forms, and deadlines for all 50 states.",
              url: "https://carregistrationguide.com",
              applicationCategory: "UtilityApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              provider: {
                "@type": "Organization",
                name: "CarRegistrationGuide",
                url: "https://carregistrationguide.com",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Enhanced ResizeObserver error suppression
              (function() {
                const originalError = window.onerror;
                const originalUnhandledRejection = window.onunhandledrejection;
                
                // Suppress ResizeObserver errors
                window.onerror = function(message, source, lineno, colno, error) {
                  if (typeof message === 'string' && message.toLowerCase().includes('resizeobserver')) {
                    return true; // Prevent default error handling
                  }
                  if (originalError) {
                    return originalError.apply(this, arguments);
                  }
                  return false;
                };
                
                window.onunhandledrejection = function(event) {
                  if (event.reason && typeof event.reason.message === 'string' && 
                      event.reason.message.toLowerCase().includes('resizeobserver')) {
                    event.preventDefault();
                    return true;
                  }
                  if (originalUnhandledRejection) {
                    return originalUnhandledRejection.apply(this, arguments);
                  }
                  return false;
                };
                
                // Override console methods to suppress ResizeObserver messages
                ['error', 'warn', 'log'].forEach(method => {
                  const original = console[method];
                  console[method] = function(...args) {
                    const message = args.join(' ').toLowerCase();
                    if (message.includes('resizeobserver') || message.includes('resize observer')) {
                      return;
                    }
                    original.apply(console, args);
                  };
                });
                
                // Additional error event listener
                window.addEventListener('error', function(e) {
                  if (e.message && e.message.toLowerCase().includes('resizeobserver')) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return false;
                  }
                }, true);
                
                window.addEventListener('unhandledrejection', function(e) {
                  if (e.reason && e.reason.message && 
                      e.reason.message.toLowerCase().includes('resizeobserver')) {
                    e.preventDefault();
                    return false;
                  }
                }, true);
              })();
            `,
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
