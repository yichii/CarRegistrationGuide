"use client" // This component needs to be a Client Component to use useState and useRouter

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Car, MapPin, FileText, Clock, Shield, Users, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { HeroForm } from "@/components/hero-form"
// Removed US_STATES array as it's now centralized in lib/checklists.ts

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">VehicleReregister</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </Link>
              <Link href="#example" className="text-gray-600 hover:text-gray-900 transition-colors">
                Example
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Sign In
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/start">Get Your Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Original Hero Section (now below the new section) */}
      <section className="pt-16 pb-16 sm:pt-20 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Simplify Vehicle Registration
              <span className="text-blue-600 block">in Minutes, Not Hours</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Skip the DMV lines and paperwork hassles. Our automated platform handles vehicle re-registration,
              renewals, and transfers with just a few clicks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <HeroForm />
            </div>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                No DMV visits required
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                100% secure & compliant
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Money-back guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-gray-600 font-medium">Trusted by thousands of vehicle owners</p>
          </div>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">DMV</div>
            <div className="text-2xl font-bold text-gray-400">AutoTrader</div>
            <div className="text-2xl font-bold text-gray-400">CarMax</div>
            <div className="text-2xl font-bold text-gray-400">Carvana</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How VehicleReregister Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-blue-600" />
                </div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl">🛣️</span>
                  <CardTitle className="text-xl">1. Tell us where you're moving</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Select your current and new state, and answer a few quick questions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl">📋</span>
                  <CardTitle className="text-xl">2. Get your custom checklist</CardTitle>
                </div>
                <CardDescription className="text-base">
                  We'll tell you what forms to fill out, what documents to bring, and when it's all due.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-2xl">🧾</span>
                  <CardTitle className="text-xl">3. Download forms & get reminders</CardTitle>
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
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Supported States</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
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
      <section id="example" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">What you get — here's an example</h2>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-blue-200 shadow-xl bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">CA</span>
                    </div>
                    <span className="font-medium text-gray-700">California</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-700">Texas</span>
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">TX</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-center text-gray-900">Moving from California to Texas?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 mb-3">You'll need:</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Form 130-U</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Vehicle Inspection Certificate</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Proof of Insurance</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Original Title</span>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mt-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-orange-800">Due within 30 days of moving</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 font-bold text-lg">💡</span>
                    <div>
                      <span className="font-medium text-blue-800">Tip: </span>
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
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Built to simplify, not to file</h2>
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

      {/* Common Questions Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Common Questions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get quick answers to the most frequently asked questions about our service.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-white rounded-lg shadow-lg border-0 px-6">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6">
                  Do you actually file anything for me?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                  No. We don't file paperwork for you — we help you understand exactly what to do. We provide the right
                  forms, deadlines, and instructions for your new state.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-lg shadow-lg border-0 px-6">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6">
                  Is VehicleReregister free to use?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                  Yes. The core checklist and form guidance are completely free. In the future, we may offer optional
                  services like form-filling, printable packets, or email reminders.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-lg shadow-lg border-0 px-6">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6">
                  Do you support all 50 states?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                  Yes — we support moves to all 50 U.S. states. Each state has unique requirements, and we tailor your
                  checklist based on where you're moving.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-lg shadow-lg border-0 px-6">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6">
                  Is this affiliated with the DMV?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                  No. We are not affiliated with any DMV, state agency, or government entity. We're an independent
                  service that helps you handle your own paperwork more easily.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-white rounded-lg shadow-lg border-0 px-6">
                <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline py-6">
                  How long does it take to get my checklist?
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                  Less than 2 minutes. Just answer a few questions and we'll generate your personalized checklist
                  instantly.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Have more questions?</p>
              <Button variant="outline" size="lg" className="bg-transparent">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to get your personalized checklist?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Tell us where you're moving and we'll show you exactly what you need to do.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3" asChild>
            <Link href="/start">
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
                <Car className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">VehicleReregister</span>
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
                  <Link href="https://example.com/form-130u.pdf" className="hover:text-white transition-colors">
                    Form 130-U
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    State Requirements
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
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
                <strong>Disclaimer:</strong> VehicleReregister is an independent service and is not affiliated with any
                Department of Motor Vehicles (DMV), state agency, or government entity. We do not submit registration
                paperwork on your behalf. We provide informational checklists and form guidance to help you complete the
                process yourself.
              </p>
            </div>
            <div className="text-center text-gray-400">
              <p>&copy; 2024 VehicleReregister. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
