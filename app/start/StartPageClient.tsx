"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Car, ArrowRight, MapPin, Calendar, Truck, Bike, Home, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ProgressSteps } from "@/components/progress-steps"
import { US_STATES, EXIT_STATE_DATA, ENTRY_STATE_DATA } from "@/lib/checklists"
import { StateCombobox } from "@/components/state-combobox"

const VEHICLE_TYPES = [
  { id: "car", label: "Car/SUV", icon: Car },
  { id: "truck", label: "Truck", icon: Truck },
  { id: "motorcycle", label: "Motorcycle", icon: Bike },
  { id: "rv", label: "RV/Motorhome", icon: Home },
]

const LOCAL_STORAGE_KEY = "vehicleReregisterStartForm"

interface ValidationErrors {
  fromState?: string
  toState?: string
  vehicleTypes?: string
  general?: string
}

interface FormData {
  fromState: string
  toState: string
  vehicleTypes: string[]
  moveDate: string
  isStudent: boolean
  isMilitary: boolean
  hasLienholder: boolean
}

export default function StartPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  // Get initial values from URL params
  const initialFromParam = searchParams.get("from")
  const initialToParam = searchParams.get("to")
  const initialVehiclesParam = searchParams.get("vehicles")
  const initialMoveDateParam = searchParams.get("moveDate")
  const initialStudentParam = searchParams.get("student")
  const initialMilitaryParam = searchParams.get("military")
  const initialLienholderParam = searchParams.get("lienholder")

  const [fromState, setFromState] = useState(() => {
    if (initialFromParam) return initialFromParam
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        return parsedData.fromState || ""
      }
    } catch (error) {
      console.error("Failed to load fromState from localStorage:", error)
      setSaveStatus("error")
    }
    return ""
  })

  const [toState, setToState] = useState(() => {
    if (initialToParam) return initialToParam
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        return parsedData.toState || ""
      }
    } catch (error) {
      console.error("Failed to load toState from localStorage:", error)
      setSaveStatus("error")
    }
    return ""
  })

  const [vehicleTypes, setVehicleTypes] = useState<string[]>(() => {
    if (initialVehiclesParam) return initialVehiclesParam.split(",")
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        return parsedData.vehicleTypes || []
      }
    } catch (error) {
      console.error("Failed to load vehicleTypes from localStorage:", error)
      setSaveStatus("error")
    }
    return []
  })

  const [moveDate, setMoveDate] = useState(() => {
    if (initialMoveDateParam) return initialMoveDateParam
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        return parsedData.moveDate || ""
      }
    } catch (error) {
      console.error("Failed to load moveDate from localStorage:", error)
      setSaveStatus("error")
    }
    return ""
  })

  const [isStudent, setIsStudent] = useState(() => {
    if (initialStudentParam) return initialStudentParam === "true"
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        return parsedData.isStudent || false
      }
    } catch (error) {
      console.error("Failed to load isStudent from localStorage:", error)
      setSaveStatus("error")
    }
    return false
  })

  const [isMilitary, setIsMilitary] = useState(() => {
    if (initialMilitaryParam) return initialMilitaryParam === "true"
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        return parsedData.isMilitary || false
      }
    } catch (error) {
      console.error("Failed to load isMilitary from localStorage:", error)
      setSaveStatus("error")
    }
    return false
  })

  const [hasLienholder, setHasLienholder] = useState(() => {
    if (initialLienholderParam) return initialLienholderParam === "true"
    try {
      const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (savedData) {
        const parsedData = JSON.parse(savedData)
        return parsedData.hasLienholder || false
      }
    } catch (error) {
      console.error("Failed to load hasLienholder from localStorage:", error)
      setSaveStatus("error")
    }
    return false
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setSaveStatus("saving")
        const dataToSave: FormData = {
          fromState,
          toState,
          vehicleTypes,
          moveDate,
          isStudent,
          isMilitary,
          hasLienholder,
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave))
        setSaveStatus("saved")

        // Reset to idle after showing saved status
        setTimeout(() => setSaveStatus("idle"), 2000)
      } catch (error) {
        console.error("Failed to save form data to localStorage:", error)
        setSaveStatus("error")
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [fromState, toState, vehicleTypes, moveDate, isStudent, isMilitary, hasLienholder])

  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {}

    if (!fromState) {
      newErrors.fromState = "Please select your current state"
    }

    if (!toState) {
      newErrors.toState = "Please select your new state"
    }

    if (fromState && toState && fromState === toState) {
      newErrors.general = "Your current state and new state must be different"
    }

    if (vehicleTypes.length === 0) {
      newErrors.vehicleTypes = "Please select at least one vehicle type"
    }

    return newErrors
  }

  useEffect(() => {
    if (errors.fromState && fromState) {
      setErrors((prev) => ({ ...prev, fromState: undefined }))
    }
  }, [fromState, errors.fromState])

  useEffect(() => {
    if (errors.toState && toState) {
      setErrors((prev) => ({ ...prev, toState: undefined }))
    }
  }, [toState, errors.toState])

  useEffect(() => {
    if (errors.vehicleTypes && vehicleTypes.length > 0) {
      setErrors((prev) => ({ ...prev, vehicleTypes: undefined }))
    }
  }, [vehicleTypes, errors.vehicleTypes])

  useEffect(() => {
    if (errors.general && fromState && toState && fromState !== toState) {
      setErrors((prev) => ({ ...prev, general: undefined }))
    }
  }, [fromState, toState, errors.general])

  // Filter available 'from' states based on existing exit data or selected 'to' state
  const availableFromStates = useMemo(() => {
    const allExitStates = Object.keys(EXIT_STATE_DATA)
    if (toState) {
      return US_STATES.filter(
        (state) => allExitStates.includes(state.code) && Object.keys(ENTRY_STATE_DATA).includes(toState),
      )
    }
    return US_STATES.filter((state) => allExitStates.includes(state.code))
  }, [toState])

  // Filter available 'to' states based on existing entry data or selected 'from' state
  const availableToStates = useMemo(() => {
    const allEntryStates = Object.keys(ENTRY_STATE_DATA)
    if (fromState) {
      return US_STATES.filter(
        (state) => allEntryStates.includes(state.code) && Object.keys(EXIT_STATE_DATA).includes(fromState),
      )
    }
    return US_STATES.filter((state) => allEntryStates.includes(state.code))
  }, [fromState])

  const handleVehicleTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setVehicleTypes([...vehicleTypes, typeId])
    } else {
      setVehicleTypes(vehicleTypes.filter((id) => id !== typeId))
    }
  }

  const canGenerateGuide = fromState && toState && fromState !== toState && vehicleTypes.length > 0

  const handleGenerateGuide = async () => {
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const params = new URLSearchParams({
        from: fromState,
        to: toState,
        vehicles: vehicleTypes.join(","),
        moveDate: moveDate || "",
        student: isStudent.toString(),
        military: isMilitary.toString(),
        lienholder: hasLienholder.toString(),
      })

      router.push(`/checklist?${params.toString()}`)
    } catch (error) {
      console.error("Failed to navigate to checklist:", error)
      setErrors({ general: "Something went wrong. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link href="/" className="flex items-center space-x-2">
              <Car className="h-7 w-7 sm:h-8 sm:w-8 text-blue-600" />
              <span className="text-lg sm:text-xl font-bold text-gray-900">VehicleReregister</span>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block">
                <ProgressSteps currentStep={1} totalSteps={2} />
              </div>
              {saveStatus === "saving" && <span className="text-xs sm:text-sm text-gray-500">Saving...</span>}
              {saveStatus === "saved" && (
                <div className="flex items-center space-x-1 text-xs sm:text-sm text-green-600">
                  <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Saved</span>
                </div>
              )}
              {saveStatus === "error" && <span className="text-xs sm:text-sm text-red-500">Save failed</span>}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Let's get your vehicle registered in your new state
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Answer a few questions and we'll generate a custom checklist for you.
            </p>
          </div>

          {errors.general && (
            <Alert className="mb-6 border-red-200 bg-red-50 mx-4 sm:mx-0">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{errors.general}</AlertDescription>
            </Alert>
          )}

          {/* Main Form */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mx-4 sm:mx-0">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-900">Tell us about your move</CardTitle>
              <CardDescription className="text-gray-600 text-base">
                We'll use this information to create your personalized registration checklist
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* State Selection */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Where are you moving? <span className="text-red-500">*</span>
                  </h3>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      From (Current State) <span className="text-red-500">*</span>
                    </Label>
                    <StateCombobox
                      value={fromState}
                      onValueChange={setFromState}
                      placeholder="Select your current state"
                      availableStates={availableFromStates}
                      error={!!errors.fromState}
                    />
                    {errors.fromState && (
                      <p className="text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.fromState}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      To (New State) <span className="text-red-500">*</span>
                    </Label>
                    <StateCombobox
                      value={toState}
                      onValueChange={setToState}
                      placeholder="Select your new state"
                      availableStates={availableToStates}
                      error={!!errors.toState}
                    />
                    {errors.toState && (
                      <p className="text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.toState}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Vehicle Types */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                  <Car className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    What vehicles are you registering? <span className="text-red-500">*</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {VEHICLE_TYPES.map((type) => {
                    const Icon = type.icon
                    const isSelected = vehicleTypes.includes(type.id)
                    const hasError = !!errors.vehicleTypes

                    return (
                      <div key={type.id} className="space-y-3">
                        <div
                          className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 touch-manipulation active:scale-95 ${
                            isSelected
                              ? "border-blue-500 bg-blue-50 shadow-md"
                              : hasError
                                ? "border-red-300 hover:border-red-400 bg-red-50/30"
                                : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                          }`}
                          onClick={() => handleVehicleTypeChange(type.id, !isSelected)}
                        >
                          <div className="flex flex-col items-center space-y-3">
                            <Icon
                              className={`h-10 w-10 ${
                                isSelected ? "text-blue-600" : hasError ? "text-red-400" : "text-gray-400"
                              }`}
                            />
                            <span
                              className={`text-base font-medium text-center ${
                                isSelected ? "text-blue-900" : hasError ? "text-red-700" : "text-gray-700"
                              }`}
                            >
                              {type.label}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Checkbox
                            id={type.id}
                            checked={isSelected}
                            onCheckedChange={(checked) => handleVehicleTypeChange(type.id, checked as boolean)}
                            className="h-5 w-5"
                          />
                          <Label htmlFor={type.id} className="text-sm text-gray-600 cursor-pointer">
                            Select
                          </Label>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {errors.vehicleTypes && (
                  <p className="text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.vehicleTypes}</span>
                  </p>
                )}
              </div>

              {/* Additional Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 pb-2 border-b border-gray-100">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Additional Details</h3>
                </div>

                <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      When did you move? <span className="text-gray-400 font-normal">(Optional)</span>
                    </Label>
                    <Select value={moveDate} onValueChange={setMoveDate}>
                      <SelectTrigger className="h-14 text-base">
                        <SelectValue placeholder="Select timeframe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-yet">Haven't moved yet</SelectItem>
                        <SelectItem value="this-week">This week</SelectItem>
                        <SelectItem value="last-week">Last week</SelectItem>
                        <SelectItem value="2-weeks">2 weeks ago</SelectItem>
                        <SelectItem value="1-month">About 1 month ago</SelectItem>
                        <SelectItem value="2-months">2+ months ago</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">Special Circumstances</Label>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Checkbox
                          id="student"
                          checked={isStudent}
                          onCheckedChange={(checked) => setIsStudent(checked as boolean)}
                          className="h-5 w-5 mt-0.5"
                        />
                        <Label htmlFor="student" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                          I'm a student (may have different requirements)
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Checkbox
                          id="military"
                          checked={isMilitary}
                          onCheckedChange={(checked) => setIsMilitary(checked as boolean)}
                          className="h-5 w-5 mt-0.5"
                        />
                        <Label htmlFor="military" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                          I'm active military (may have exemptions)
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <Checkbox
                          id="lienholder"
                          checked={hasLienholder}
                          onCheckedChange={(checked) => setHasLienholder(checked as boolean)}
                          className="h-5 w-5 mt-0.5"
                        />
                        <Label htmlFor="lienholder" className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                          My vehicle has a lienholder/loan
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Guide Button */}
              <div className="pt-4">
                <Button
                  onClick={handleGenerateGuide}
                  disabled={!canGenerateGuide || isSubmitting}
                  className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl active:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      Generate My Registration Guide
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </>
                  )}
                </Button>
                {!canGenerateGuide && !isSubmitting && (
                  <p className="text-sm text-gray-500 text-center mt-3">
                    <span className="text-red-500">*</span> Required fields must be completed to continue
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/60 mx-4 sm:mx-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">What happens next?</h3>
            <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-semibold text-lg">1</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-3">Get Your Custom Checklist</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We'll show you exactly what documents, forms, and steps you need for your specific move
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-semibold text-lg">2</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-3">Download & Complete</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Access all required forms, get deadline reminders, and complete your registration yourself
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
