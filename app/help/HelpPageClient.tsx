"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Car,
  ArrowLeft,
  Search,
  FileText,
  MapPin,
  Clock,
  DollarSign,
  Shield,
  Users,
  ExternalLink,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function HelpPageClient() {
  const [searchQuery, setSearchQuery] = useState("")

  const helpCategories = [
    {
      title: "Getting Started",
      icon: <MapPin className="h-6 w-6" />,
      description: "Learn how to use VehicleReregister and get your personalized checklist",
      articles: [
        { title: "How to create your checklist", href: "#getting-started" },
        { title: "Understanding your results", href: "#understanding-results" },
        { title: "What information you'll need", href: "#required-info" },
        { title: "Supported states and territories", href: "#supported-states" },
      ],
    },
    {
      title: "Vehicle Registration Basics",
      icon: <FileText className="h-6 w-6" />,
      description: "Essential information about vehicle registration requirements",
      articles: [
        { title: "Registration vs. Title transfer", href: "#registration-vs-title" },
        { title: "Required documents checklist", href: "#required-documents" },
        { title: "Understanding registration deadlines", href: "#deadlines" },
        { title: "Common registration mistakes to avoid", href: "#common-mistakes" },
      ],
    },
    {
      title: "State-Specific Guides",
      icon: <Shield className="h-6 w-6" />,
      description: "Detailed guides for popular destination states",
      articles: [
        { title: "Moving to Texas - Complete guide", href: "#texas-guide" },
        { title: "Moving to Florida - What you need to know", href: "#florida-guide" },
        { title: "Moving to California - Registration requirements", href: "#california-guide" },
        { title: "All 50 states requirements overview", href: "#all-states" },
      ],
    },
    {
      title: "Costs and Fees",
      icon: <DollarSign className="h-6 w-6" />,
      description: "Understanding registration costs and fee structures",
      articles: [
        { title: "Typical registration fee ranges", href: "#fee-ranges" },
        { title: "Additional costs to expect", href: "#additional-costs" },
        { title: "Sales tax on vehicle transfers", href: "#sales-tax" },
        { title: "Fee payment methods by state", href: "#payment-methods" },
      ],
    },
    {
      title: "Special Situations",
      icon: <Users className="h-6 w-6" />,
      description: "Guidance for unique circumstances and special cases",
      articles: [
        { title: "Student vehicle registration", href: "#student-registration" },
        { title: "Military personnel guidelines", href: "#military-guidelines" },
        { title: "Vehicles with liens", href: "#lien-vehicles" },
        { title: "Temporary vs. permanent moves", href: "#temporary-moves" },
      ],
    },
    {
      title: "Troubleshooting",
      icon: <Clock className="h-6 w-6" />,
      description: "Solutions for common problems and issues",
      articles: [
        { title: "Lost or missing title", href: "#lost-title" },
        { title: "Failed vehicle inspection", href: "#failed-inspection" },
        { title: "DMV rejected my paperwork", href: "#rejected-paperwork" },
        { title: "Registration deadline extensions", href: "#deadline-extensions" },
      ],
    },
  ]

  const filteredCategories = helpCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.articles.some((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <Car className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">CarRegistrationGuide</span>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/start">Get Your Guide</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Help Center</h1>
            <p className="text-xl text-gray-600 mb-8">
              Find comprehensive guides, tutorials, and resources for vehicle registration across all 50 states.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Get Your Checklist
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/faq">
                <FileText className="h-4 w-4 mr-2" />
                Browse FAQ
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">
                <Users className="h-4 w-4 mr-2" />
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {filteredCategories.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try searching with different keywords or browse all categories.</p>
                  <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-4">
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category, index) => (
                  <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{category.icon}</div>
                        <span className="text-lg">{category.title}</span>
                      </CardTitle>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {category.articles.map((article, articleIndex) => (
                          <Link
                            key={articleIndex}
                            href={article.href}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                          >
                            <span className="text-sm text-gray-700 group-hover:text-blue-600">{article.title}</span>
                            <ExternalLink className="h-3 w-3 text-gray-400 group-hover:text-blue-600" />
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Popular Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Popular Resources</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">State Registration Deadlines</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Quick reference for registration deadlines in all 50 states.
                  </p>
                  <Button variant="outline" size="sm">
                    View Deadlines
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">Required Documents Checklist</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Comprehensive list of documents needed for vehicle registration.
                  </p>
                  <Button variant="outline" size="sm">
                    View Checklist
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">Fee Calculator</h3>
                  <p className="text-gray-600 text-sm mb-4">Estimate registration costs for your destination state.</p>
                  <Button variant="outline" size="sm">
                    Calculate Fees
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">DMV Office Locator</h3>
                  <p className="text-gray-600 text-sm mb-4">Find DMV offices and their hours in your new state.</p>
                  <Button variant="outline" size="sm">
                    Find Offices
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Can't find what you're looking for? Our support team is ready to assist you.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
