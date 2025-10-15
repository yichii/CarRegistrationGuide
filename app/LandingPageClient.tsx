"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Check,
  Car,
  MapPin,
  FileText,
  Clock,
  Shield,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Target,
} from "lucide-react"
import Link from "next/link"
import { useState, lazy, Suspense } from "react"
import { useRouter } from "next/navigation"
import { HeroForm } from "@/components/hero-form"
import { Skeleton } from "@/components/ui/skeleton"

const LazyAccordion = lazy(() =>
  import("@/components/lazy-accordion").then((mod) => ({
    default: mod.LazyAccordion,
  })),
)
const LazyAccordionItem = lazy(() =>
  import("@/components/lazy-accordion").then((mod) => ({
    default: mod.LazyAccordionItem,
  })),
)
const LazyAccordionTrigger = lazy(() =>
  import("@/components/lazy-accordion").then((mod) => ({
    default: mod.LazyAccordionTrigger,
  })),
)
const LazyAccordionContent = lazy(() =>
  import("@/components/lazy-accordion").then((mod) => ({
    default: mod.LazyAccordionContent,
  })),
)

function FAQSkeleton() {
  return (
    <div className="space-y-4" role="status" aria-label="Loading frequently asked questions">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="bg-white rounded-lg shadow-lg border-0 px-6">
          <div className="py-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading content...</span>
    </div>
  )
}

export default function LandingPageClient() {
  const [showStartMoveSection, setShowStartMoveSection] = useState(false)
  const [fromState, setFromState] = useState("")
  const [toState, setToState] = useState("")
  const router = useRouter()

  const handleStartGuide = () => {
    if (fromState && toState && fromState !== toState) {
      router.push(`/guide?from=${fromState}&to=${toState}`)
    }
  }

  const canStartGuide = fromState && toState && fromState !== toState

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50" role="banner">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Link
                href="/"
                className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
              >
                <Car className="h-8 w-8 text-blue-600" aria-hidden="true" />
                <span className="text-xl font-bold text-foreground">CarRegistrationGuide</span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              <Link
                href="#how-it-works"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
                aria-describedby="how-it-works-desc"
              >
                How It Works
              </Link>
              <span id="how-it-works-desc" className="sr-only">
                Learn about our 3-step process
              </span>

              <Link
                href="#example"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
                aria-describedby="example-desc"
              >
                Example
              </Link>
              <span id="example-desc" className="sr-only">
                See a sample checklist for California to Texas move
              </span>

              <Link
                href="#about"
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md px-2 py-1"
                aria-describedby="about-desc"
              >
                About
              </Link>
              <span id="about-desc" className="sr-only">
                Learn about our service and transparency
              </span>
            </nav>
            <div className="flex items-center space-x-4">
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-blue-500/20 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                asChild
              >
                <Link href="/start" aria-describedby="get-guide-desc">
                  <Zap className="w-4 h-4 mr-2" aria-hidden="true" />
                  Get Your Guide
                </Link>
              </Button>
              <span id="get-guide-desc" className="sr-only">
                Start creating your personalized vehicle registration checklist
              </span>
            </div>
          </div>
        </div>
      </header>

      <section className="pt-16 pb-16 sm:pt-20 sm:pb-20" role="main" aria-labelledby="hero-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Re-Register Your Car With Confidence
              <span className="text-blue-600 block">Skip DMV Confusion</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Get the right forms and step-by-step instructions before you visit the DMV.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <HeroForm />
            </div>
            <div
              className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8 text-sm"
              role="list"
              aria-label="Service benefits"
            >
              <div
                className="flex items-center bg-green-50 px-4 py-2 rounded-full border border-green-200"
                role="listitem"
              >
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" aria-hidden="true" />
                <span className="text-green-800 font-medium">No DMV visits required</span>
              </div>
              <div
                className="flex items-center bg-blue-50 px-4 py-2 rounded-full border border-blue-200"
                role="listitem"
              >
                <Shield className="h-5 w-5 text-blue-600 mr-2" aria-hidden="true" />
                <span className="text-blue-800 font-medium">100% secure & compliant</span>
              </div>
              <div
                className="flex items-center bg-purple-50 px-4 py-2 rounded-full border border-purple-200"
                role="listitem"
              >
                <Star className="h-5 w-5 text-purple-600 mr-2" aria-hidden="true" />
                <span className="text-purple-800 font-medium">Money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-muted/50" aria-labelledby="social-proof-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p id="social-proof-heading" className="text-muted-foreground font-medium">
              Trusted by thousands of vehicle owners
            </p>
          </div>
          <div
            className="flex justify-center items-center space-x-8 opacity-60"
            role="list"
            aria-label="Partner organizations"
          >
            <div className="text-2xl font-bold text-muted-foreground" role="listitem">
              DMV
            </div>
            <div className="text-2xl font-bold text-muted-foreground" role="listitem">
              AutoTrader
            </div>
            <div className="text-2xl font-bold text-muted-foreground" role="listitem">
              CarMax
            </div>
            <div className="text-2xl font-bold text-muted-foreground" role="listitem">
              Carvana
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted/50" aria-labelledby="how-it-works-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How CarRegistrationGuide Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" role="list" aria-label="Process steps">
            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"
              role="listitem"
            >
              <div
                className="absolute top-4 right-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
                aria-label="Step 1"
              >
                1
              </div>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <MapPin className="h-8 w-8 text-blue-600" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <CardTitle className="text-xl">Tell us where you're moving</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Select your current and new state, and answer a few quick questions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"
              role="listitem"
            >
              <div
                className="absolute top-4 right-4 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
                aria-label="Step 2"
              >
                2
              </div>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <FileText className="h-8 w-8 text-green-600" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <CardTitle className="text-xl">Get your custom checklist</CardTitle>
                </div>
                <CardDescription className="text-base">
                  We'll tell you what forms to fill out, what documents to bring, and when it's all due.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"
              role="listitem"
            >
              <div
                className="absolute top-4 right-4 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
                aria-label="Step 3"
              >
                3
              </div>
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Clock className="h-8 w-8 text-purple-600" aria-hidden="true" />
                </div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <CardTitle className="text-xl">Download forms & get reminders</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Get links to required documents like Form 130-U, inspection details, and optional email reminders.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Supported States Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Supported States</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We currently support all 50 U.S. states. Some of the most common moves include:
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <CardContent className="pt-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">CA</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-sm">TX</span>
                        </div>
                      </div>
                      <span className="text-gray-700 font-medium">California → Texas</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">NY</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-sm">FL</span>
                        </div>
                      </div>
                      <span className="text-gray-700 font-medium">New York → Florida</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">IL</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-sm">AZ</span>
                        </div>
                      </div>
                      <span className="text-gray-700 font-medium">Illinois → Arizona</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">WA</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-sm">TX</span>
                        </div>
                      </div>
                      <span className="text-gray-700 font-medium">Washington → Texas</span>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold text-sm">FL</span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-sm">GA</span>
                        </div>
                      </div>
                      <span className="text-gray-700 font-medium">Florida → Georgia</span>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-200 text-center">
                      <span className="text-gray-600 font-medium">+ 45 other states supported</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8 pt-6 border-t border-gray-200">
                  <p className="text-lg text-gray-700 mb-4">
                    Whether you're moving across the country or just across state lines, we've got you covered.
                  </p>
                  <Button variant="outline" size="lg" className="bg-transparent" asChild>
                    <Link href="/start">
                      Start Your Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Example Preview Section */}
      <section id="example" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">What you get — here's an example</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-blue-300 shadow-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-green-500"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-300">
                      <span className="text-blue-600 font-semibold text-sm">CA</span>
                    </div>
                    <span className="font-medium text-gray-700">California</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-700">Texas</span>
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-300">
                      <span className="text-green-600 font-semibold text-sm">TX</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-center text-gray-900">Moving from California to Texas?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    You'll need:
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg border border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-800 font-medium">Form 130-U</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg border border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-800 font-medium">Vehicle Inspection Certificate</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg border border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-800 font-medium">Proof of Insurance</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg border border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-800 font-medium">Original Title</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 rounded-lg p-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span className="font-semibold text-orange-800">Due within 30 days of moving</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold text-lg">💡</span>
                    <div>
                      <span className="font-semibold text-blue-800">Pro Tip: </span>
                      <span className="text-blue-700">Get your vehicle inspected before visiting the DMV</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust / Transparency Section */}
      <section id="about" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Built to simplify, not to file</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          We are not affiliated with any DMV or government agency.
                        </h3>
                        <p className="text-gray-600 text-sm">Independent service providing guidance only.</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <FileText className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          We don't file paperwork on your behalf — we just show you what to do.
                        </h3>
                        <p className="text-gray-600 text-sm">You maintain full control of your registration process.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Users className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          We collect state-specific requirements so you don't have to.
                        </h3>
                        <p className="text-gray-600 text-sm">
                          Researched and organized by people who've moved between states.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Check className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">We never sell your personal information.</h3>
                        <p className="text-gray-600 text-sm">Your privacy and data security are our priority.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/50" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Common Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get quick answers to the most frequently asked questions about our service.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Suspense fallback={<FAQSkeleton />}>
              <LazyAccordion
                type="single"
                collapsible
                className="space-y-4"
                role="region"
                aria-labelledby="faq-heading"
              >
                <LazyAccordionItem value="item-1" className="bg-card rounded-lg shadow-lg border-0 px-6">
                  <LazyAccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
                    Do you actually file anything for me?
                  </LazyAccordionTrigger>
                  <LazyAccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    No. We don't file paperwork for you — we help you understand exactly what to do. We provide the
                    right forms, deadlines, and instructions for your new state.
                  </LazyAccordionContent>
                </LazyAccordionItem>

                <LazyAccordionItem value="item-2" className="bg-card rounded-lg shadow-lg border-0 px-6">
                  <LazyAccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
                    Is CarRegistrationGuide free to use?
                  </LazyAccordionTrigger>
                  <LazyAccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    Yes. The core checklist and form guidance are completely free. In the future, we may offer optional
                    services like form-filling, printable packets, or email reminders.
                  </LazyAccordionContent>
                </LazyAccordionItem>

                <LazyAccordionItem value="item-3" className="bg-card rounded-lg shadow-lg border-0 px-6">
                  <LazyAccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
                    Do you support all 50 states?
                  </LazyAccordionTrigger>
                  <LazyAccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    Yes — we support moves to all 50 U.S. states. Each state has unique requirements, and we tailor your
                    checklist based on where you're moving.
                  </LazyAccordionContent>
                </LazyAccordionItem>

                <LazyAccordionItem value="item-4" className="bg-card rounded-lg shadow-lg border-0 px-6">
                  <LazyAccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
                    Is this affiliated with the DMV?
                  </LazyAccordionTrigger>
                  <LazyAccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    No. We are not affiliated with any DMV, state agency, or government entity. We're an independent
                    service that helps you handle your own paperwork more easily.
                  </LazyAccordionContent>
                </LazyAccordionItem>

                <LazyAccordionItem value="item-5" className="bg-card rounded-lg shadow-lg border-0 px-6">
                  <LazyAccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
                    How long does it take to get my checklist?
                  </LazyAccordionTrigger>
                  <LazyAccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                    Less than 2 minutes. Just answer a few questions and we'll generate your personalized checklist
                    instantly.
                  </LazyAccordionContent>
                </LazyAccordionItem>
              </LazyAccordion>
            </Suspense>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Have more questions?</p>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                asChild
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/20"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to get your personalized checklist?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Tell us where you're moving and we'll show you exactly what you need to do.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-white/20 hover:scale-105"
            asChild
          >
            <Link href="/start">
              <Zap className="mr-2 h-5 w-5" />
              Get Your Guide
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer with Disclaimer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Car className="h-8 w-8 text-blue-400" aria-hidden="true" />
                <span className="text-xl font-bold">CarRegistrationGuide</span>
              </div>
              <p className="text-gray-400">Simplifying vehicle registration guidance for interstate moves.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Service</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/start" className="hover:text-white transition-colors">
                    Get Your Guide
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#example" className="hover:text-white transition-colors">
                    Example
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    State Requirements
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                <strong>Disclaimer:</strong> CarRegistrationGuide is an independent service and is not affiliated with
                any Department of Motor Vehicles (DMV), state agency, or government entity. We do not submit
                registration paperwork on your behalf. We provide informational checklists and form guidance to help you
                complete the process yourself.
              </p>
            </div>
            <div className="text-center text-gray-400">
              <p>© 2025 CarRegistrationGuide. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
