"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  DollarSign,
  Calculator,
  Car,
  FileText,
  Shield,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react"
import { STATE_COSTS, DEFAULT_STATE_COSTS, VEHICLE_TYPE_MODIFIERS } from "@/lib/cost-data"
import { US_STATES } from "@/lib/checklists"

interface CostCalculatorProps {
  fromState: string
  toState: string
  vehicles: string[]
  isStudent?: boolean
  isMilitary?: boolean
  hasLienholder?: boolean
  className?: string
}

interface CostBreakdown {
  registrationFee: number
  titleFee: number
  plateFee: number
  inspectionFee: number
  salesTax: number
  processingFee: number
  lienholderFee: number
  subtotal: number
  discounts: number
  total: number
}

export function CostCalculator({
  fromState,
  toState,
  vehicles = [], // Add default empty array
  isStudent = false,
  isMilitary = false,
  hasLienholder = false,
  className = "",
}: CostCalculatorProps) {
  const [vehicleValue, setVehicleValue] = useState<string>("15000")
  const [showComparison, setShowComparison] = useState(true) // Default to showing comparison

  const safeVehicles = Array.isArray(vehicles) && vehicles.length > 0 ? vehicles : ["car"]

  const calculateCosts = (stateCode: string, vehicleTypes: string[], value: number): CostBreakdown => {
    if (!Array.isArray(vehicleTypes) || vehicleTypes.length === 0) {
      vehicleTypes = ["car"]
    }

    const stateCosts = STATE_COSTS[stateCode] || DEFAULT_STATE_COSTS
    const vehicleCount = vehicleTypes.length

    // Calculate base fees
    let registrationFee = 0
    if (typeof stateCosts.registrationFee === "number") {
      registrationFee = stateCosts.registrationFee
    } else {
      // Use average of min/max for calculation
      registrationFee = (stateCosts.registrationFee.min + stateCosts.registrationFee.max) / 2
    }

    // Apply vehicle type modifiers
    const vehicleModifier =
      vehicleTypes.reduce((acc, type) => {
        return acc + (VEHICLE_TYPE_MODIFIERS[type as keyof typeof VEHICLE_TYPE_MODIFIERS] || 1)
      }, 0) / vehicleCount

    registrationFee *= vehicleModifier * vehicleCount

    const titleFee = stateCosts.titleFee * vehicleCount
    const plateFee = stateCosts.plateFee * vehicleCount
    const inspectionFee = (stateCosts.inspectionFee || 0) * vehicleCount
    const processingFee = (stateCosts.processingFee || 0) * vehicleCount
    const lienholderFee = hasLienholder ? (stateCosts.lienholderFee || 15) * vehicleCount : 0

    // Calculate sales tax on vehicle value
    const salesTax = (value * stateCosts.salesTaxRate) / 100

    const subtotal = registrationFee + titleFee + plateFee + inspectionFee + processingFee + lienholderFee + salesTax

    // Calculate discounts
    let discounts = 0
    if (isMilitary && stateCosts.militaryDiscount) {
      discounts += (subtotal * stateCosts.militaryDiscount) / 100
    }
    if (isStudent && stateCosts.studentDiscount) {
      discounts += (subtotal * stateCosts.studentDiscount) / 100
    }

    const total = subtotal - discounts

    return {
      registrationFee: Math.round(registrationFee * 100) / 100,
      titleFee: Math.round(titleFee * 100) / 100,
      plateFee: Math.round(plateFee * 100) / 100,
      inspectionFee: Math.round(inspectionFee * 100) / 100,
      salesTax: Math.round(salesTax * 100) / 100,
      processingFee: Math.round(processingFee * 100) / 100,
      lienholderFee: Math.round(lienholderFee * 100) / 100,
      subtotal: Math.round(subtotal * 100) / 100,
      discounts: Math.round(discounts * 100) / 100,
      total: Math.round(total * 100) / 100,
    }
  }

  const vehicleValueNum = useMemo(() => {
    const num = Number.parseFloat(vehicleValue) || 0
    return Math.max(0, num)
  }, [vehicleValue])

  const destinationCosts = useMemo(
    () => calculateCosts(toState, safeVehicles, vehicleValueNum), // Use safeVehicles
    [toState, safeVehicles, vehicleValueNum, isStudent, isMilitary, hasLienholder],
  )

  const originCosts = useMemo(
    () => calculateCosts(fromState, safeVehicles, vehicleValueNum), // Use safeVehicles
    [fromState, safeVehicles, vehicleValueNum, isStudent, isMilitary, hasLienholder],
  )

  const savings = originCosts.total - destinationCosts.total
  const fromStateName = US_STATES.find((s) => s.code === fromState)?.name || fromState
  const toStateName = US_STATES.find((s) => s.code === toState)?.name || toState

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getCostDifferences = (originCosts: CostBreakdown, destCosts: CostBreakdown) => {
    const differences = [
      { name: "Registration Fee", origin: originCosts.registrationFee, dest: destCosts.registrationFee },
      { name: "Title Fee", origin: originCosts.titleFee, dest: destCosts.titleFee },
      { name: "License Plate Fee", origin: originCosts.plateFee, dest: destCosts.plateFee },
      { name: "Sales Tax", origin: originCosts.salesTax, dest: destCosts.salesTax },
      { name: "Inspection Fee", origin: originCosts.inspectionFee, dest: destCosts.inspectionFee },
    ]

    return differences
      .map((diff) => ({
        ...diff,
        difference: diff.dest - diff.origin,
        percentChange: diff.origin > 0 ? ((diff.dest - diff.origin) / diff.origin) * 100 : 0,
      }))
      .filter((diff) => Math.abs(diff.difference) > 5) // Only show significant differences
      .sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference))
  }

  const costDifferences = useMemo(
    () => getCostDifferences(originCosts, destinationCosts),
    [originCosts, destinationCosts],
  )

  const CostBreakdownCard = ({
    title,
    costs,
    stateName,
    isComparison = false,
  }: {
    title: string
    costs: CostBreakdown
    stateName: string
    isComparison?: boolean
  }) => (
    <Card className={`${isComparison ? "border-gray-200" : "border-blue-200 bg-blue-50/30"}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Calculator className="h-5 w-5 text-blue-600" />
          <span>{title}</span>
        </CardTitle>
        <p className="text-sm text-gray-600">{stateName}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="flex items-center space-x-1">
              <Car className="h-3 w-3" />
              <span>Registration Fee</span>
            </span>
            <span className="font-medium">{formatCurrency(costs.registrationFee)}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center space-x-1">
              <FileText className="h-3 w-3" />
              <span>Title Fee</span>
            </span>
            <span className="font-medium">{formatCurrency(costs.titleFee)}</span>
          </div>
          <div className="flex justify-between">
            <span>License Plate Fee</span>
            <span className="font-medium">{formatCurrency(costs.plateFee)}</span>
          </div>
          {costs.inspectionFee > 0 && (
            <div className="flex justify-between">
              <span className="flex items-center space-x-1">
                <Shield className="h-3 w-3" />
                <span>Inspection Fee</span>
              </span>
              <span className="font-medium">{formatCurrency(costs.inspectionFee)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Sales Tax</span>
            <span className="font-medium">{formatCurrency(costs.salesTax)}</span>
          </div>
          <div className="flex justify-between">
            <span>Processing Fee</span>
            <span className="font-medium">{formatCurrency(costs.processingFee)}</span>
          </div>
          {costs.lienholderFee > 0 && (
            <div className="flex justify-between">
              <span>Lienholder Fee</span>
              <span className="font-medium">{formatCurrency(costs.lienholderFee)}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="flex justify-between text-sm font-medium">
          <span>Subtotal</span>
          <span>{formatCurrency(costs.subtotal)}</span>
        </div>

        {costs.discounts > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discounts</span>
            <span>-{formatCurrency(costs.discounts)}</span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total Estimated Cost</span>
          <span className="text-blue-600">{formatCurrency(costs.total)}</span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Cost Calculator</h2>
            <p className="text-gray-600">Estimate your vehicle registration costs</p>
          </div>
        </div>
        <div className="text-right">
          <div
            className={`text-lg font-bold ${savings > 0 ? "text-green-600" : savings < 0 ? "text-red-600" : "text-gray-600"}`}
          >
            {savings > 0 ? "Save " : savings < 0 ? "Pay " : ""}
            {formatCurrency(Math.abs(savings))}
          </div>
          <p className="text-sm text-gray-500">vs {fromStateName}</p>
        </div>
      </div>

      {/* Vehicle Value Input */}
      <Card className="border-green-200 bg-green-50/30">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="vehicle-value" className="text-sm font-medium">
              Vehicle Value (for sales tax calculation)
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="vehicle-value"
                type="number"
                value={vehicleValue}
                onChange={(e) => setVehicleValue(e.target.value)}
                placeholder="15000"
                className="pl-10 h-12"
                min="0"
                step="100"
              />
            </div>
            <p className="text-xs text-gray-500">
              Enter the current market value of your vehicle for accurate sales tax calculation
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <div className="grid gap-6 md:grid-cols-1">
        <CostBreakdownCard
          title={`Registration Costs in ${toStateName}`}
          costs={destinationCosts}
          stateName={`Moving to ${toStateName}`}
        />
      </div>

      {/* Comparison Toggle */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setShowComparison(!showComparison)}
          className="flex items-center space-x-2"
        >
          <Calculator className="h-4 w-4" />
          <span>
            {showComparison ? "Hide" : "Compare with"} {fromStateName}
          </span>
        </Button>
      </div>

      {/* Comparison View */}
      {showComparison && (
        <div className="space-y-6">
          {/* Cost Comparison Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            <CostBreakdownCard
              title={`${fromStateName} Costs`}
              costs={originCosts}
              stateName={`Current state: ${fromStateName}`}
              isComparison
            />
            <CostBreakdownCard
              title={`${toStateName} Costs`}
              costs={destinationCosts}
              stateName={`New state: ${toStateName}`}
            />
          </div>

          {/* Enhanced Savings/Cost Difference */}
          <Card
            className={`border-2 ${savings > 0 ? "border-green-200 bg-green-50" : savings < 0 ? "border-red-200 bg-red-50" : "border-gray-200 bg-gray-50"}`}
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {savings > 0 ? (
                    <TrendingDown className="h-6 w-6 text-green-600" />
                  ) : savings < 0 ? (
                    <TrendingUp className="h-6 w-6 text-red-600" />
                  ) : (
                    <Minus className="h-6 w-6 text-gray-600" />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {savings > 0 ? "You'll Save Money!" : savings < 0 ? "Higher Registration Costs" : "Similar Costs"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Moving from {fromStateName} to {toStateName}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-3xl font-bold ${savings > 0 ? "text-green-600" : savings < 0 ? "text-red-600" : "text-gray-600"}`}
                  >
                    {formatCurrency(Math.abs(savings))}
                  </div>
                  {savings !== 0 && (
                    <Badge variant={savings > 0 ? "default" : "destructive"} className="mt-1">
                      {((Math.abs(savings) / originCosts.total) * 100).toFixed(1)}%{" "}
                      {savings > 0 ? "savings" : "increase"}
                    </Badge>
                  )}
                </div>
              </div>

              {costDifferences.length > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Biggest Cost Differences:</h4>
                  <div className="space-y-2">
                    {costDifferences.slice(0, 3).map((diff, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700">{diff.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`font-medium ${diff.difference > 0 ? "text-red-600" : "text-green-600"}`}>
                            {diff.difference > 0 ? "+" : ""}
                            {formatCurrency(diff.difference)}
                          </span>
                          {Math.abs(diff.percentChange) > 10 && (
                            <Badge variant="outline" className="text-xs">
                              {diff.percentChange > 0 ? "+" : ""}
                              {diff.percentChange.toFixed(0)}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50/30">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Calculator className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-2">State Comparison Insights</h4>
                  <div className="text-sm text-blue-800 space-y-1">
                    {savings > 100 && (
                      <p>
                        • {toStateName} has significantly lower registration costs than {fromStateName}
                      </p>
                    )}
                    {savings < -100 && (
                      <p>
                        • {toStateName} has higher registration costs, mainly due to{" "}
                        {costDifferences[0]?.name.toLowerCase() || "various fees"}
                      </p>
                    )}
                    {Math.abs(savings) <= 100 && (
                      <p>
                        • Registration costs are similar between {fromStateName} and {toStateName}
                      </p>
                    )}
                    {destinationCosts.salesTax > originCosts.salesTax * 1.5 && (
                      <p>• {toStateName} has a higher sales tax rate on vehicle purchases</p>
                    )}
                    {(isStudent || isMilitary) && (destinationCosts.discounts > 0 || originCosts.discounts > 0) && (
                      <p>• Don't forget to apply for available discounts in your new state</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Disclaimer */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Important Disclaimer</p>
              <p>
                These are estimated costs based on standard fees and may vary depending on your specific situation,
                vehicle age, local taxes, and current regulations. Always verify exact costs with your local DMV before
                proceeding with registration.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
