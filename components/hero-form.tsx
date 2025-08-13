"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState, useMemo } from "react" // Import useMemo
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { US_STATES, EXIT_STATE_DATA, ENTRY_STATE_DATA } from "@/lib/checklists" // Import data
import { StateCombobox } from "./state-combobox" // Import the new component

export function HeroForm() {
  const router = useRouter()
  const [fromState, setFromState] = useState("")
  const [toState, setToState] = useState("")

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fromState || !toState || fromState === toState) return
    // Redirect with query parameters to /start
    router.push(`/start?from=${fromState}&to=${toState}`)
  }

  const canSubmit = fromState && toState && fromState !== toState

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-12 w-full max-w-2xl mx-auto px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
        <div className="flex-1">
          <StateCombobox
            value={fromState}
            onValueChange={setFromState}
            placeholder="Moving from"
            availableStates={availableFromStates}
          />
        </div>

        <div className="flex-1">
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
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-lg px-6 py-4 h-14 w-full sm:w-auto sm:self-center touch-manipulation transition-colors duration-200"
        disabled={!canSubmit}
      >
        Start Now
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </form>
  )
}
