"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface State {
  code: string
  name: string
}

interface StateComboboxProps {
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  availableStates: State[]
  error?: boolean
}

export function StateCombobox({ value, onValueChange, placeholder, availableStates, error }: StateComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredStates = React.useMemo(() => {
    if (!searchQuery) {
      return availableStates
    }
    const lowerCaseQuery = searchQuery.toLowerCase()
    return availableStates.filter(
      (state) => state.name.toLowerCase().includes(lowerCaseQuery) || state.code.toLowerCase().includes(lowerCaseQuery),
    )
  }, [searchQuery, availableStates])

  const displayValue = availableStates.find((state) => state.code === value)?.name || ""

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label={`${placeholder}. ${value ? `Currently selected: ${displayValue}` : "No state selected"}`}
          className={cn(
            "w-full px-6 sm:px-4 py-5 sm:py-4 border rounded-lg text-lg sm:text-base h-16 sm:h-14 justify-between bg-white touch-manipulation transition-all duration-200",
            "hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-2",
            "active:scale-[0.98] active:bg-gray-50 hover:shadow-sm",
            error && "border-red-300 focus:border-red-500 focus:ring-red-200",
          )}
        >
          <span className="truncate text-left font-medium sm:font-normal" aria-hidden="true">
            {value ? displayValue : placeholder}
          </span>
          <ChevronsUpDown className="ml-3 sm:ml-2 h-6 w-6 sm:h-5 sm:w-5 shrink-0 opacity-50" aria-hidden="true" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        key={open ? "open-content" : "closed-content"}
        className="w-[--radix-popover-trigger-width] p-0 max-h-[70vh] sm:max-h-80 shadow-lg border-0 rounded-xl"
        align="start"
        sideOffset={8}
        collisionPadding={16}
        role="dialog"
        aria-label="State selection"
      >
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-14 sm:h-12 text-lg sm:text-base px-4 border-b"
            aria-label={`Search for ${placeholder.toLowerCase()}`}
          />
          <CommandList className="max-h-[60vh] sm:max-h-60 overflow-auto" role="listbox" aria-label="Available states">
            <CommandEmpty className="py-8 sm:py-6 text-center text-base sm:text-sm text-gray-500" role="status">
              No state found matching "{searchQuery}".
            </CommandEmpty>
            <CommandGroup>
              {filteredStates.map((state) => (
                <CommandItem
                  key={state.code}
                  value={state.name}
                  onSelect={() => {
                    onValueChange(state.code)
                    setOpen(false)
                    setSearchQuery("")
                  }}
                  className="py-4 sm:py-3 px-6 sm:px-4 text-lg sm:text-base cursor-pointer touch-manipulation hover:bg-gray-100 focus:bg-gray-100 aria-selected:bg-blue-50 transition-colors duration-150 active:bg-blue-100"
                  role="option"
                  aria-selected={value === state.code}
                >
                  <Check
                    className={cn(
                      "mr-4 sm:mr-3 h-6 w-6 sm:h-5 sm:w-5",
                      value === state.code ? "opacity-100 text-blue-600" : "opacity-0",
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate font-medium sm:font-normal">
                    {state.name} ({state.code})
                  </span>
                  {value === state.code && <span className="sr-only">Currently selected</span>}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
