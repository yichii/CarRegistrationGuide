"use client"

import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
            <Search className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-semibold text-gray-900">Page Not Found</CardTitle>
          <CardDescription className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-6xl font-bold text-gray-300 mb-2">404</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={() => window.history.back()} variant="outline" className="flex-1">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Button asChild className="flex-1">
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-500 mb-3">Need help with vehicle registration?</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild variant="ghost" size="sm" className="flex-1">
                <Link href="/faq">View FAQ</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="flex-1">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
