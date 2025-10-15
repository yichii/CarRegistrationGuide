"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Car, ArrowRight, Download } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function SuccessContent() {
  const searchParams = useSearchParams()
  const fromState = searchParams.get("from") || ""
  const toState = searchParams.get("to") || ""
  const vehicles = searchParams.get("vehicles") || ""
  const moveDate = searchParams.get("moveDate") || ""
  const isStudent = searchParams.get("student") || ""
  const isMilitary = searchParams.get("military") || ""
  const hasLienholder = searchParams.get("lienholder") || ""

  const checklistQueryParams = new URLSearchParams({
    from: fromState,
    to: toState,
    vehicles: vehicles,
    moveDate: moveDate,
    student: isStudent,
    military: isMilitary,
    lienholder: hasLienholder,
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
            {/* No progress steps on success page */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex items-center justify-center">
        <Card className="w-full max-w-md text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Checklist is Ready!</h2>
            <p className="text-lg text-gray-600 mb-8">
              We've successfully generated your personalized vehicle registration guide.
            </p>
            <div className="space-y-4">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href={`/checklist?${checklistQueryParams}`}>
                  View Your Checklist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                <Link href={`/checklist?${checklistQueryParams}#download`}>
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF
                </Link>
              </Button>
              <Button variant="ghost" size="lg" className="w-full" asChild>
                <Link href="/">Go to Homepage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function SuccessClientPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
          <div className="text-center">
            <Car className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-pulse" />
            <p className="text-gray-600">Loading success page...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}
