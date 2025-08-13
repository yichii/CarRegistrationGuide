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
          className={cn(
            "w-full px-4 py-4 border rounded-lg text-base h-14 justify-between bg-white touch-manipulation transition-all duration-200",
            "hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
            "active:scale-[0.98] sm:active:scale-100",
            error && "border-red-300 focus:border-red-500 focus:ring-red-200",
          )}
        >
          <span className="truncate text-left">{value ? displayValue : placeholder}</span>
          <ChevronsUpDown className="ml-2 h-5 w-5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        key={open ? "open-content" : "closed-content"}
        className="w-[--radix-popover-trigger-width] p-0 max-h-[60vh] sm:max-h-80"
        align="start"
        sideOffset={4}
      >
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-12 text-base"
          />
          <CommandList className="max-h-[50vh] sm:max-h-60">
            <CommandEmpty className="py-6 text-center text-sm text-gray-500">No state found.</CommandEmpty>
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
                  className="py-3 px-4 text-base cursor-pointer touch-manipulation"
                >
                  <Check className={cn("mr-3 h-5 w-5", value === state.code ? "opacity-100" : "opacity-0")} />
                  <span className="truncate">
                    {state.name} ({state.code})
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
