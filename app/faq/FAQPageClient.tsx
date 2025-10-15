"use client"

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Car, Search, ArrowLeft, FileText, MapPin, DollarSign, Shield, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function FAQPageClient() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqCategories = [
    {
      title: "General Service Questions",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          question: "What is CarRegistrationGuide?",
          answer:
            "CarRegistrationGuide is an independent service that provides personalized checklists and guidance for vehicle registration when moving between states. We help you understand exactly what forms, documents, and steps are required for your specific situation.",
        },
        {
          question: "Do you file paperwork for me?",
          answer:
            "No, we don't file paperwork on your behalf. We provide you with the information, forms, and guidance you need to complete the registration process yourself. This keeps you in full control of your vehicle registration.",
        },
        {
          question: "Are you affiliated with the DMV?",
          answer:
            "No, CarRegistrationGuide is not affiliated with any DMV, state agency, or government entity. We are an independent service that helps simplify the vehicle registration process by providing clear, organized guidance.",
        },
        {
          question: "Is CarRegistrationGuide free to use?",
          answer:
            "Yes, our core service is completely free. You can generate personalized checklists, download forms, and access all guidance at no cost. We may offer optional premium features in the future.",
        },
      ],
    },
    {
      title: "Vehicle Registration Process",
      icon: <FileText className="h-5 w-5" />,
      questions: [
        {
          question: "How long do I have to register my vehicle in a new state?",
          answer:
            "Registration deadlines vary by state, typically ranging from 10 to 90 days after establishing residency. Most states require registration within 30 days. Our service provides the exact deadline for your destination state.",
        },
        {
          question: "What documents do I need to register my vehicle?",
          answer:
            "Common documents include your current vehicle title, proof of insurance, driver's license, and sometimes a vehicle inspection certificate. Requirements vary by state, which is why we provide personalized checklists based on your specific move.",
        },
        {
          question: "Do I need a vehicle inspection?",
          answer:
            "Some states require safety inspections, emissions tests, or both before registration. Our service tells you exactly what inspections are required for your destination state and where to get them.",
        },
        {
          question: "Can I register my vehicle online?",
          answer:
            "Some states offer online registration for certain situations, but most require an in-person visit to the DMV. We'll let you know what options are available in your destination state.",
        },
      ],
    },
    {
      title: "Costs and Fees",
      icon: <DollarSign className="h-5 w-5" />,
      questions: [
        {
          question: "How much does vehicle registration cost?",
          answer:
            "Registration fees vary significantly by state and can range from $30 to over $200. Fees often depend on your vehicle's value, weight, or age. Our service provides estimated costs for your destination state.",
        },
        {
          question: "Are there additional fees I should know about?",
          answer:
            "Yes, you may encounter title transfer fees, inspection fees, plate fees, and sometimes sales tax if you purchased the vehicle recently. We include all potential fees in your personalized checklist.",
        },
        {
          question: "Do I need to pay sales tax when moving states?",
          answer:
            "Sales tax requirements vary by state. Some states require you to pay sales tax on vehicles brought from other states, while others have exemptions. We provide specific guidance for your situation.",
        },
      ],
    },
    {
      title: "Special Situations",
      icon: <AlertCircle className="h-5 w-5" />,
      questions: [
        {
          question: "I'm a student - do I need to register my vehicle?",
          answer:
            "Students often have different requirements. Some states allow students to maintain registration in their home state, while others require registration after a certain period. We provide guidance based on your student status and destination state.",
        },
        {
          question: "I'm military - are there special rules for me?",
          answer:
            "Yes, military personnel often have exemptions or special procedures for vehicle registration. The Servicemembers Civil Relief Act provides certain protections. We include military-specific guidance in your checklist when applicable.",
        },
        {
          question: "What if I have a lien on my vehicle?",
          answer:
            "Vehicles with liens require additional paperwork and coordination with your lender. The lienholder information must be updated with the new state. We provide specific steps for vehicles with liens.",
        },
        {
          question: "I have multiple vehicles - do I register them all?",
          answer:
            "Yes, all vehicles you bring to a new state typically need to be registered. However, some states have different requirements for recreational vehicles, trailers, or vehicles not driven on public roads.",
        },
      ],
    },
    {
      title: "Troubleshooting",
      icon: <MapPin className="h-5 w-5" />,
      questions: [
        {
          question: "What if I lost my vehicle title?",
          answer:
            "You'll need to obtain a duplicate title from your previous state before registering in the new state. We provide links and instructions for requesting duplicate titles from all 50 states.",
        },
        {
          question: "My vehicle failed inspection - what now?",
          answer:
            "You'll need to address the inspection issues before registration. Most states allow a grace period for repairs. We provide guidance on common inspection requirements and next steps if your vehicle fails.",
        },
        {
          question: "The DMV rejected my paperwork - what should I do?",
          answer:
            "Common rejection reasons include missing signatures, incorrect forms, or insufficient documentation. Review the rejection notice carefully and ensure all requirements are met. Our checklists help prevent common mistakes.",
        },
        {
          question: "I moved temporarily - do I still need to register?",
          answer:
            "Temporary moves have different requirements depending on the duration and your intent to return. Some states have exemptions for temporary residents, while others require registration after a certain period regardless of intent.",
        },
      ],
    },
  ]

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

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
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 mb-8">
              Get answers to common questions about vehicle registration, interstate moves, and our service.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {filteredCategories.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">Try searching with different keywords or browse all categories below.</p>
                  <Button variant="outline" onClick={() => setSearchQuery("")} className="mt-4">
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-8">
                {filteredCategories.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2 text-xl">
                        {category.icon}
                        <span>{category.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="space-y-2">
                        {category.questions.map((faq, index) => (
                          <AccordionItem
                            key={index}
                            value={`${categoryIndex}-${index}`}
                            className="border border-gray-200 rounded-lg px-4"
                          >
                            <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 pb-4 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/help">Visit Help Center</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
