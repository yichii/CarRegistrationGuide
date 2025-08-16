"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { US_STATES, EXIT_STATE_DATA, ENTRY_STATE_DATA } from "@/lib/checklists"
import { StateCombobox } from "./state-combobox"

export function HeroForm() {
  const router = useRouter()
  const [fromState, setFromState] = useState("")
  const [toState, setToState] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Filter available 'from' states based on existing exit data or selected 'to' state
  const availableFromStates = useMemo(() => {
    const allExitStates = Object.keys(EXIT_STATE_DATA)
    if (toState) {
      // If a 'to' state is selected, filter 'from' states that have both exit and entry data
      return US_STATES.filter(
        (state) => allExitStates.includes(state.code) && Object.keys(ENTRY_STATE_DATA).includes(toState),
      )
    }
    // Otherwise, show all states that have exit data
    return US_STATES.filter((state) => allExitStates.includes(state.code))
  }, [toState])

  // Filter available 'to' states based on existing entry data or selected 'from' state
  const availableToStates = useMemo(() => {
    const allEntryStates = Object.keys(ENTRY_STATE_DATA)
    if (fromState) {
      // If a 'from' state is selected, filter 'to' states that have both exit and entry data
      return US_STATES.filter(
        (state) => allEntryStates.includes(state.code) && Object.keys(EXIT_STATE_DATA).includes(fromState),
      )
    }
    // Otherwise, show all states that have entry data
    return US_STATES.filter((state) => allEntryStates.includes(state.code))
  }, [fromState])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fromState || !toState || fromState === toState) return

    setIsSubmitting(true)

    // Simulate processing time for better UX
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Redirect with query parameters to /start
    router.push(`/start?from=${fromState}&to=${toState}`)
  }

  const canSubmit = fromState && toState && fromState !== toState

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 mb-12 w-full max-w-2xl mx-auto px-6 sm:px-4"
      role="form"
      aria-labelledby="hero-form-heading"
      aria-describedby="hero-form-description"
    >
      <h2 id="hero-form-heading" className="sr-only">
        Vehicle Registration State Selection
      </h2>
      <p id="hero-form-description" className="sr-only">
        Select your current state and destination state to get started with your personalized vehicle registration
        checklist.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-3" role="group" aria-labelledby="state-selection-group">
        <h3 id="state-selection-group" className="sr-only">
          State Selection
        </h3>

        <div className="flex-1">
          <label htmlFor="from-state" className="sr-only">
            Current state (moving from)
          </label>
          <StateCombobox
            value={fromState}
            onValueChange={setFromState}
            placeholder="Moving from"
            availableStates={availableFromStates}
          />
        </div>

        <div className="flex-1">
          <label htmlFor="to-state" className="sr-only">
            Destination state (moving to)
          </label>
          <StateCombobox
            value={toState}
            onValueChange={setToState}
            placeholder="Moving to"
            availableStates={availableToStates}
          />
        </div>
      </div>

      <Button
        size="lg"
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-lg sm:text-xl px-8 py-4 h-16 sm:h-14 w-full sm:w-auto sm:self-center touch-manipulation transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group active:scale-[0.98]"
        disabled={!canSubmit || isSubmitting}
        aria-describedby={!canSubmit ? "submit-help" : undefined}
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" aria-hidden="true"></div>
            <span className="text-base sm:text-lg">Getting Started...</span>
            <span className="sr-only">Processing your request</span>
          </>
        ) : (
          <>
            <span className="text-lg sm:text-xl font-semibold">Start Now</span>
            <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </>
        )}
      </Button>

      {!canSubmit && (
        <p id="submit-help" className="sr-only">
          Please select both your current state and destination state to continue.
        </p>
      )}
    </form>
  )
}
