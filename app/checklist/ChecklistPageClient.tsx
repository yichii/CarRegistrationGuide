"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Car,
  ArrowRight,
  FileText,
  CheckCircle,
  Download,
  Clock,
  AlertCircle,
  GraduationCap,
  Shield,
  Building,
  ExternalLink,
  MapPin,
  Search,
  DollarSign,
} from "lucide-react"
import { CalendarIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import { ProgressSteps } from "@/components/progress-steps"
import { US_STATES, VEHICLE_TYPE_LABELS, MOVE_DATE_LABELS, EXIT_STATE_DATA, ENTRY_STATE_DATA } from "@/lib/checklists"
import { CostCalculator } from "@/components/cost-calculator"

// Map Lucide icon names (strings) to actual components
const LucideIcons: Record<string, any> = {
  FileText: FileText,
  CheckCircle: CheckCircle,
  Shield: Shield,
  Building: Building,
  GraduationCap: GraduationCap,
  Car: Car,
  Clock: Clock,
  AlertCircle: AlertCircle,
  MapPin: MapPin,
  Search: Search,
  DollarSign: DollarSign,
}

function ChecklistContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const fromState = searchParams.get("from") || ""
  const toState = searchParams.get("to") || ""
  const vehicles = searchParams.get("vehicles")?.split(",") || []
  const moveDate = searchParams.get("moveDate") || ""
  const isStudent = searchParams.get("student") === "true"
  const isMilitary = searchParams.get("military") === "true"
  const hasLienholder = searchParams.get("lienholder") === "true"

  const fromStateName = US_STATES[fromState] || fromState
  const toStateName = US_STATES[toState] || toState

  const exitData = EXIT_STATE_DATA[fromState]
  const entryData = ENTRY_STATE_DATA[toState]

  // Fallback if data for either state is not found
  if (!exitData || !entryData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Checklist Coming Soon!</h2>
            <p className="text-gray-600 mb-6">
              We're working hard to bring you a personalized checklist for moves from{" "}
              <span className="font-semibold">{fromStateName}</span> to{" "}
              <span className="font-semibold">{toStateName}</span>. Please check back soon!
            </p>
            <Button asChild>
              <Link href="/start">Go Back to Start</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const requiredForms = entryData.requiredForms
  const registrationSteps = [...exitData.steps, ...entryData.steps]
  const specialCircumstances = entryData.specialCircumstances
  const importantDeadline = entryData.importantDeadline

  const handleMarkAsComplete = () => {
    const params = new URLSearchParams({
      from: fromState,
      to: toState,
      vehicles: vehicles.join(","),
      moveDate: moveDate || "",
      student: isStudent.toString(),
      military: isMilitary.toString(),
      lienholder: hasLienholder.toString(),
    }).toString()
    router.push(`/success?${params}`)
  }

  const checklistQueryParams = new URLSearchParams({
    from: fromState,
    to: toState,
    vehicles: vehicles.join(","),
    moveDate: moveDate || "",
    student: isStudent.toString(),
    military: isMilitary.toString(),
    lienholder: hasLienholder.toString(),
  }).toString()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">CarRegistrationGuide</span>
            </Link>
            <ProgressSteps currentStep={2} totalSteps={2} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">{fromState}</span>
                </div>
                <span className="text-lg font-medium text-gray-700">{fromStateName}</span>
              </div>
              <ArrowRight className="h-6 w-6 text-gray-400" />
              <div className="flex items-center space-x-3">
                <span className="text-lg font-medium text-gray-700">{toStateName}</span>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">{toState}</span>
                </div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Your Registration Guide</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Here's everything you need to register your {vehicles.map((v) => VEHICLE_TYPE_LABELS[v]).join(", ")} in{" "}
              {toStateName}
            </p>
          </div>

          {/* Move Details */}
          {moveDate && (
            <Card className="mb-8 border-0 shadow-lg bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Move Status:</span>
                  <span className="text-blue-700">{MOVE_DATE_LABELS[moveDate] || moveDate}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Required Forms Section */}
          <section className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <FileText className="h-6 w-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Required Forms</h2>
            </div>

            <div className="grid gap-4">
              {requiredForms.map((form, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-start gap-3 sm:gap-4">
                    {/* LEFT: text */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 break-words">{form.name}</h3>
                        {form.required && (
                          <Badge
                            variant="destructive"
                            className="bg-red-100 text-red-700 border-red-200 shrink-0"
                          >
                            Required
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-600 break-words">{form.description}</p>
                    </div>

                    {/* RIGHT: actions */}
                    {form.url && (
                      <div className="flex flex-wrap gap-2 sm:ml-4 shrink-0 w-full sm:w-auto">
                        <Button variant="outline" className="bg-transparent whitespace-nowrap" asChild>
                          <a href={form.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Form
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" className="whitespace-nowrap" asChild>
                          <a href={form.url} download>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>

                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Steps to Register Section */}
          <section className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Steps to Register</h2>
            </div>

            <div className="space-y-4">
              {registrationSteps.map((step, index) => {
                const Icon = step.icon ? LucideIcons[step.icon] : null
                return (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">{index + 1}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {Icon && <Icon className="h-5 w-5 text-gray-600" />}
                            <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                            {step.urgent && (
                              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                                <Clock className="h-3 w-3 mr-1" />
                                Time Sensitive
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Based on Your Situation Section */}
          {(isStudent || isMilitary || hasLienholder) && specialCircumstances && (
            <section className="mb-12">
              <div className="flex items-center space-x-2 mb-6">
                <AlertCircle className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Based on Your Situation</h2>
              </div>

              <div className="space-y-4">
                {isStudent && specialCircumstances.student && (
                  <Card className="border-0 shadow-lg bg-blue-50 border-blue-200">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        {specialCircumstances.student.icon &&
                          LucideIcons[specialCircumstances.student.icon] &&
                          LucideIcons[specialCircumstances.student.icon]({
                            className: "h-6 w-6 text-blue-600 mt-1 flex-shrink-0",
                          })}
                        <div>
                          <h3 className="font-semibold text-blue-900 mb-2">Student Status</h3>
                          <p className="text-blue-700">{specialCircumstances.student.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {isMilitary && specialCircumstances.military && (
                  <Card className="border-0 shadow-lg bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        {specialCircumstances.military.icon &&
                          LucideIcons[specialCircumstances.military.icon] &&
                          LucideIcons[specialCircumstances.military.icon]({
                            className: "h-6 w-6 text-green-600 mt-1 flex-shrink-0",
                          })}
                        <div>
                          <h3 className="font-semibold text-green-900 mb-2">Military Service</h3>
                          <p className="text-green-700">{specialCircumstances.military.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {hasLienholder && specialCircumstances.lienholder && (
                  <Card className="border-0 shadow-lg bg-orange-50 border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        {specialCircumstances.lienholder.icon &&
                          LucideIcons[specialCircumstances.lienholder.icon] &&
                          LucideIcons[specialCircumstances.lienholder.icon]({
                            className: "h-6 w-6 text-orange-600 mt-1 flex-shrink-0",
                          })}
                        <div>
                          <h3 className="font-semibold text-orange-900 mb-2">Vehicle Loan</h3>
                          <p className="text-orange-700">{specialCircumstances.lienholder.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>
          )}

          {/* Cost Calculator Section */}
          

          {/* Download Section */}
          <section id="download" className="mb-12">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Take Your Checklist With You</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Download a printable PDF version of your personalized checklist to reference while gathering documents
                  and visiting the DMV.
                </p>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <a href={`/api/generate-pdf?${checklistQueryParams}`} target="_blank" rel="noopener noreferrer">
                    <Download className="h-5 w-5 mr-2" />
                    Download Full Checklist (PDF)
                  </a>
                </Button>
              </CardContent>
            </Card>
          </section>

          {/* Important Deadlines */}
          {importantDeadline && (
            <section className="mb-12">
              <Card className="border-2 border-orange-200 shadow-lg bg-orange-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-orange-900 mb-2">Important Deadline</h3>
                      <p className="text-orange-800" dangerouslySetInnerHTML={{ __html: importantDeadline }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="bg-transparent" asChild>
              <Link href="/start">
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Start Over
              </Link>
            </Button>
            <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={handleMarkAsComplete}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Complete
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChecklistPageClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
          <div className="text-center">
            <Car className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading your checklist...</p>
          </div>
        </div>
      }
    >
      <ChecklistContent />
    </Suspense>
  )
}
