"use client"

import type React from "react"

import { lazy, Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

const Accordion = lazy(() => import("@/components/ui/accordion").then((mod) => ({ default: mod.Accordion })))
const AccordionItem = lazy(() => import("@/components/ui/accordion").then((mod) => ({ default: mod.AccordionItem })))
const AccordionTrigger = lazy(() =>
  import("@/components/ui/accordion").then((mod) => ({ default: mod.AccordionTrigger })),
)
const AccordionContent = lazy(() =>
  import("@/components/ui/accordion").then((mod) => ({ default: mod.AccordionContent })),
)

interface LazyAccordionProps {
  children: React.ReactNode
  type?: "single" | "multiple"
  collapsible?: boolean
  className?: string
}

function AccordionSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="bg-white rounded-lg shadow-lg border-0 px-6">
          <div className="py-6">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  )
}

export function LazyAccordion({ children, type = "single", collapsible = true, className }: LazyAccordionProps) {
  return (
    <Suspense fallback={<AccordionSkeleton />}>
      <Accordion type={type} collapsible={collapsible} className={className}>
        {children}
      </Accordion>
    </Suspense>
  )
}

export function LazyAccordionItem({
  children,
  value,
  className,
}: { children: React.ReactNode; value: string; className?: string }) {
  return (
    <Suspense fallback={<Skeleton className="h-16 w-full rounded-lg" />}>
      <AccordionItem value={value} className={className}>
        {children}
      </AccordionItem>
    </Suspense>
  )
}

export function LazyAccordionTrigger({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Suspense fallback={<Skeleton className="h-6 w-3/4" />}>
      <AccordionTrigger className={className}>{children}</AccordionTrigger>
    </Suspense>
  )
}

export function LazyAccordionContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Suspense fallback={<Skeleton className="h-4 w-full" />}>
      <AccordionContent className={className}>{children}</AccordionContent>
    </Suspense>
  )
}
