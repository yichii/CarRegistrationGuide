export interface StateCosts {
  registrationFee: number | { min: number; max: number }
  titleFee: number
  plateFee: number
  inspectionFee?: number
  salesTaxRate: number // percentage
  processingFee?: number
  militaryDiscount?: number // percentage off
  studentDiscount?: number // percentage off
  lienholderFee?: number
}

export interface VehicleTypeCostModifier {
  car: number
  truck: number
  motorcycle: number
  rv: number
}

export const VEHICLE_TYPE_MODIFIERS: VehicleTypeCostModifier = {
  car: 1.0,
  truck: 1.2,
  motorcycle: 0.7,
  rv: 1.5,
}

export const STATE_COSTS: Record<string, StateCosts> = {
  TX: {
    registrationFee: { min: 50.75, max: 81.25 },
    titleFee: 33,
    plateFee: 6.94,
    inspectionFee: 25,
    salesTaxRate: 6.25,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  FL: {
    registrationFee: { min: 27.6, max: 45.6 },
    titleFee: 77.25,
    plateFee: 28,
    salesTaxRate: 6.0,
    processingFee: 10,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  CA: {
    registrationFee: { min: 46, max: 175 },
    titleFee: 15,
    plateFee: 19,
    salesTaxRate: 7.25,
    processingFee: 8.25,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  NY: {
    registrationFee: { min: 26, max: 140 },
    titleFee: 50,
    plateFee: 25,
    inspectionFee: 21,
    salesTaxRate: 8.0,
    processingFee: 12.5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  WA: {
    registrationFee: { min: 30, max: 75 },
    titleFee: 12,
    plateFee: 10,
    salesTaxRate: 6.5,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  CO: {
    registrationFee: { min: 7.2, max: 13.2 },
    titleFee: 7.2,
    plateFee: 7.24,
    inspectionFee: 25,
    salesTaxRate: 2.9,
    processingFee: 5.39,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  VA: {
    registrationFee: { min: 40.75, max: 45.75 },
    titleFee: 15,
    plateFee: 10,
    inspectionFee: 20,
    salesTaxRate: 4.15,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  // Adding more states with representative data
  AZ: {
    registrationFee: { min: 8, max: 48 },
    titleFee: 4,
    plateFee: 12,
    salesTaxRate: 5.6,
    processingFee: 7,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  GA: {
    registrationFee: { min: 20, max: 35 },
    titleFee: 18,
    plateFee: 20,
    salesTaxRate: 4.0,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  PA: {
    registrationFee: { min: 38, max: 58 },
    titleFee: 53,
    plateFee: 20,
    inspectionFee: 35,
    salesTaxRate: 6.0,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  NC: {
    registrationFee: { min: 36, max: 56 },
    titleFee: 52,
    plateFee: 20,
    inspectionFee: 30,
    salesTaxRate: 3.0,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  OH: {
    registrationFee: { min: 34.5, max: 67.5 },
    titleFee: 15,
    plateFee: 4.5,
    inspectionFee: 20,
    salesTaxRate: 5.75,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  MI: {
    registrationFee: { min: 30, max: 120 },
    titleFee: 15,
    plateFee: 5,
    salesTaxRate: 6.0,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  NJ: {
    registrationFee: { min: 35.5, max: 84 },
    titleFee: 60,
    plateFee: 6,
    inspectionFee: 0, // Free in NJ
    salesTaxRate: 6.625,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  OR: {
    registrationFee: { min: 43, max: 86 },
    titleFee: 77,
    plateFee: 19,
    salesTaxRate: 0, // No sales tax in OR
    processingFee: 8,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  MD: {
    registrationFee: { min: 135, max: 187 },
    titleFee: 100,
    plateFee: 20,
    inspectionFee: 14,
    salesTaxRate: 6.0,
    processingFee: 10,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  MN: {
    registrationFee: { min: 35, max: 99 },
    titleFee: 8.25,
    plateFee: 4.25,
    salesTaxRate: 6.875,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  CT: {
    registrationFee: { min: 80, max: 120 },
    titleFee: 25,
    plateFee: 60,
    inspectionFee: 20,
    salesTaxRate: 6.35,
    processingFee: 10,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  IN: {
    registrationFee: { min: 21.35, max: 39.35 },
    titleFee: 15,
    plateFee: 9.75,
    salesTaxRate: 7.0,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  TN: {
    registrationFee: { min: 24, max: 36 },
    titleFee: 14,
    plateFee: 21.5,
    inspectionFee: 0, // No inspection required
    salesTaxRate: 7.0,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  AL: {
    registrationFee: { min: 23, max: 64 },
    titleFee: 15,
    plateFee: 28,
    salesTaxRate: 4.0,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  AK: {
    registrationFee: { min: 100, max: 200 },
    titleFee: 15,
    plateFee: 5,
    salesTaxRate: 0, // No state sales tax
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
  AR: {
    registrationFee: { min: 17, max: 30 },
    titleFee: 10,
    plateFee: 25,
    inspectionFee: 12,
    salesTaxRate: 6.5,
    processingFee: 5,
    militaryDiscount: 0,
    studentDiscount: 0,
  },
}

// Default costs for states not yet in the database
export const DEFAULT_STATE_COSTS: StateCosts = {
  registrationFee: { min: 30, max: 80 },
  titleFee: 25,
  plateFee: 15,
  inspectionFee: 20,
  salesTaxRate: 6.0,
  processingFee: 5,
  militaryDiscount: 0,
  studentDiscount: 0,
}
