// lib/checklists.ts

export const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
]

export const VEHICLE_TYPE_LABELS: Record<string, string> = {
  car: "Car/SUV",
  truck: "Truck",
  motorcycle: "Motorcycle",
  rv: "RV/Motorhome",
}

export const MOVE_DATE_LABELS: Record<string, string> = {
  "not-yet": "Haven't moved yet",
  "this-week": "This week",
  "last-week": "Last week",
  "2-weeks": "2 weeks ago",
  "1-month": "About 1 month ago",
  "2-months": "2+ months ago",
}

interface ChecklistForm {
  name: string
  description: string
  url?: string
  required: boolean
}

interface ChecklistStep {
  title: string
  description: string
  icon?: string // Lucide icon name as string
  urgent?: boolean
}

interface SpecialCircumstance {
  description: string
  icon?: string
}

export interface ExitStateData {
  steps: ChecklistStep[]
}

export interface EntryStateData {
  requiredForms: ChecklistForm[]
  steps: ChecklistStep[]
  specialCircumstances?: {
    student?: SpecialCircumstance
    military?: SpecialCircumstance
    lienholder?: SpecialCircumstance
  }
  importantDeadline?: string
}

export const EXIT_STATE_DATA: Record<string, ExitStateData> = {
  CA: {
    steps: [
      {
        title: "Surrender California plates (if required)",
        description: "Some states require you to return your old plates. Check the CA DMV website.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Notify CA DMV of address change",
        description: "Update your address with the California DMV to ensure you receive important notices.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel California insurance",
        description: "Once you have new state insurance, cancel your old California policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  NY: {
    steps: [
      {
        title: "Return New York plates",
        description: "You must return your New York license plates to the NY DMV to avoid penalties.",
        icon: "Car",
        urgent: true,
      },
      {
        title: "Cancel New York insurance",
        description: "Once you have new state insurance, cancel your old New York policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  IL: {
    steps: [
      {
        title: "Remove Illinois license plates",
        description: "Remove your Illinois plates and return them if required by your new state.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Illinois insurance",
        description: "Once insured in your new state, cancel your Illinois policy to avoid double coverage.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Notify the Illinois Secretary of State",
        description: "Update your address or submit a change of residency form.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  AZ: {
    steps: [
      {
        title: "Return Arizona plates (if required)",
        description: "Some states require the surrender of Arizona plates. Check your new state’s DMV site.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Update ADOT with your move",
        description: "Notify the Arizona Department of Transportation about your move.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Arizona auto insurance",
        description: "Avoid penalties by canceling your old insurance policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  FL: {
    steps: [
      {
        title: "Return Florida license plates (if required)",
        description: "Some states require you to return your old plates to the FLHSMV.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Florida auto insurance",
        description: "Once you have new state insurance, cancel your old Florida policy to avoid penalties.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Update your address with FLHSMV",
        description: "Notify the Florida Highway Safety and Motor Vehicles of your new address.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  TX: {
    steps: [
      {
        title: "Notify Texas DMV of address change",
        description: "Update your address with the Texas DMV to ensure you receive important notices.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Texas auto insurance",
        description: "Once you have new state insurance, cancel your old Texas policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  WA: {
    steps: [
      {
        title: "Return Washington license plates (if required)",
        description: "Check with your new state's requirements regarding WA plates.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Washington auto insurance",
        description: "Ensure your new state's insurance is active before canceling your Washington policy.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Notify Washington DOL of address change",
        description: "Update your address with the Washington Department of Licensing.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  GA: {
    steps: [
      {
        title: "Return Georgia license plates (if required)",
        description: "You may need to return GA plates depending on your new state.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Georgia insurance policy",
        description: "Terminate your Georgia auto insurance after securing a new policy.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Notify the Georgia Department of Revenue",
        description: "Update your address or inform them of your out-of-state move.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  PA: {
    steps: [
      {
        title: "Return Pennsylvania plates to PennDOT",
        description: "Required to avoid suspension of your driver’s license or fines.",
        icon: "Car",
        urgent: true,
      },
      {
        title: "Cancel your Pennsylvania auto insurance",
        description: "Ensure your new insurance policy is in effect before canceling.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Submit a change of address",
        description: "Update PennDOT records with your new address or out-of-state move.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  NC: {
    steps: [
      {
        title: "Surrender North Carolina plates",
        description: "Turn in your plates to a local NC DMV office.",
        icon: "Car",
        urgent: true,
      },
      {
        title: "Cancel North Carolina auto insurance",
        description: "Do this only after registering your car in the new state.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Update your address with NC DMV",
        description: "Submit a change of address form online or in-person.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  CO: {
    steps: [
      {
        title: "Notify Colorado DMV of address change",
        description: "Update your address with the Colorado DMV.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Colorado auto insurance",
        description: "Once you have new state insurance, cancel your old Colorado policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  VA: {
    steps: [
      {
        title: "Return Virginia license plates (if required)",
        description: "Check with your new state's requirements regarding VA plates.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Virginia auto insurance",
        description: "Ensure your new state's insurance is active before canceling your Virginia policy.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Notify Virginia DMV of address change",
        description: "Update your address with the Virginia Department of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  MA: {
    steps: [
      {
        title: "Return Massachusetts license plates",
        description: "You must return your MA plates to the RMV to avoid penalties.",
        icon: "Car",
        urgent: true,
      },
      {
        title: "Cancel Massachusetts auto insurance",
        description: "Once you have new state insurance, cancel your old MA policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  OH: {
    steps: [
      {
        title: "Notify Ohio BMV of address change",
        description: "Update your address with the Ohio Bureau of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Ohio auto insurance",
        description: "Once you have new state insurance, cancel your old Ohio policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  MI: {
    steps: [
      {
        title: "Return Michigan license plates (if required)",
        description: "Check with your new state's requirements regarding MI plates.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Michigan auto insurance",
        description: "Ensure your new state's insurance is active before canceling your Michigan policy.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Notify Michigan SOS of address change",
        description: "Update your address with the Michigan Secretary of State.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  NJ: {
    steps: [
      {
        title: "Return New Jersey license plates",
        description: "You must return your NJ plates to the MVC to avoid penalties.",
        icon: "Car",
        urgent: true,
      },
      {
        title: "Cancel New Jersey auto insurance",
        description: "Once you have new state insurance, cancel your old NJ policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  OR: {
    steps: [
      {
        title: "Notify Oregon DMV of address change",
        description: "Update your address with the Oregon Department of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Oregon auto insurance",
        description: "Once you have new state insurance, cancel your old Oregon policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  MD: {
    steps: [
      {
        title: "Return Maryland license plates (if required)",
        description: "Check with your new state's requirements regarding MD plates.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Maryland auto insurance",
        description: "Ensure your new state's insurance is active before canceling your Maryland policy.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Notify Maryland MVA of address change",
        description: "Update your address with the Maryland Motor Vehicle Administration.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  MN: {
    steps: [
      {
        title: "Notify Minnesota DVS of address change",
        description: "Update your address with the Minnesota Driver and Vehicle Services.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Minnesota auto insurance",
        description: "Once you have new state insurance, cancel your old Minnesota policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  CT: {
    steps: [
      {
        title: "Notify Connecticut DMV of address change",
        description: "Update your address with the Connecticut Department of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Connecticut auto insurance",
        description: "Once you have new state insurance, cancel your old Connecticut policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  IN: {
    steps: [
      {
        title: "Notify Indiana BMV of address change",
        description: "Update your address with the Indiana Bureau of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Indiana auto insurance",
        description: "Once you have new state insurance, cancel your old Indiana policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  TN: {
    steps: [
      {
        title: "Notify Tennessee DMV of address change",
        description: "Update your address with the Tennessee Department of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Tennessee auto insurance",
        description: "Once you have new state insurance, cancel your old Tennessee policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  AL: {
    steps: [
      {
        title: "Notify Alabama DMV of address change",
        description: "Update your address with the Alabama Department of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Alabama auto insurance",
        description: "Once you have new state insurance, cancel your old Alabama policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  AK: {
    steps: [
      {
        title: "Notify Alaska DMV of address change",
        description: "Update your address with the Alaska Division of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Alaska auto insurance",
        description: "Once you have new state insurance, cancel your old Alaska policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  AR: {
    steps: [
      {
        title: "Notify Arkansas DMV of address change",
        description: "Update your address with the Arkansas Department of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Arkansas auto insurance",
        description: "Once you have new state insurance, cancel your old Arkansas policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  DE: {
    steps: [
      {
        title: "Notify Delaware DMV of address change",
        description: "Update your address with the Delaware Division of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Delaware auto insurance",
        description: "Once you have new state insurance, cancel your old Delaware policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  HI: {
    steps: [
      {
        title: "Notify Hawaii DMV of address change",
        description: "Update your address with the Hawaii Department of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Hawaii auto insurance",
        description: "Once you have new state insurance, cancel your old Hawaii policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  ID: {
    steps: [
      {
        title: "Notify Idaho DMV of address change",
        description: "Update your address with the Idaho Division of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Idaho auto insurance",
        description: "Once you have new state insurance, cancel your old Idaho policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  IA: {
    steps: [
      {
        title: "Notify Iowa DOT of address change",
        description: "Update your address with the Iowa Department of Transportation.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Iowa auto insurance",
        description: "Once you have new state insurance, cancel your old Iowa policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  KS: {
    steps: [
      {
        title: "Notify Kansas DMV of address change",
        description: "Update your address with the Kansas Department of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Kansas auto insurance",
        description: "Once you have new state insurance, cancel your old Kansas policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  KY: {
    steps: [
      {
        title: "Notify Kentucky DMV of address change",
        description: "Update your address with the Kentucky Department of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Kentucky auto insurance",
        description: "Once you have new state insurance, cancel your old Kentucky policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  LA: {
    steps: [
      {
        title: "Notify Louisiana OMV of address change",
        description: "Update your address with the Louisiana Office of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Louisiana auto insurance",
        description: "Once you have new state insurance, cancel your old Louisiana policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  ME: {
    steps: [
      {
        title: "Notify Maine BMV of address change",
        description: "Update your address with the Maine Bureau of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Maine auto insurance",
        description: "Once you have new state insurance, cancel your old Maine policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  MS: {
    steps: [
      {
        title: "Notify Mississippi DMV of address change",
        description: "Update your address with the Mississippi Department of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Mississippi auto insurance",
        description: "Once you have new state insurance, cancel your old Mississippi policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  MO: {
    steps: [
      {
        title: "Notify Missouri DOR of address change",
        description: "Update your address with the Missouri Department of Revenue.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Missouri auto insurance",
        description: "Once you have new state insurance, cancel your old Missouri policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  MT: {
    steps: [
      {
        title: "Notify Montana MVD of address change",
        description: "Update your address with the Montana Motor Vehicle Division.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Montana auto insurance",
        description: "Once you have new state insurance, cancel your old Montana policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  NE: {
    steps: [
      {
        title: "Notify Nebraska DMV of address change",
        description: "Update your address with the Nebraska Department of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
      {
        title: "Cancel Nebraska auto insurance",
        description: "Once you have new state insurance, cancel your old Nebraska policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  NV: {
    steps: [
      {
        title: "Return Nevada plates (if required)",
        description: "Some states require you to return your old plates. Check your new state's DMV requirements.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Nevada auto insurance",
        description: "Once you have new state insurance, cancel your old Nevada policy.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Notify Nevada DMV of address change",
        description: "Update your address with the Nevada DMV to ensure you receive important notices.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  NH: {
    steps: [
      {
        title: "Return New Hampshire plates (if required)",
        description: "Check if your new state requires you to surrender your NH plates.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel New Hampshire auto insurance",
        description: "Once insured in your new state, cancel your New Hampshire policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  NM: {
    steps: [
      {
        title: "Return New Mexico plates (if required)",
        description: "Some states require you to return your old plates to avoid penalties.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel New Mexico auto insurance",
        description: "Avoid double coverage by canceling your old insurance policy.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Notify New Mexico MVD",
        description: "Update your address with the New Mexico Motor Vehicle Division.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  ND: {
    steps: [
      {
        title: "Return North Dakota plates (if required)",
        description: "Check your new state's requirements for surrendering old plates.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel North Dakota auto insurance",
        description: "Once you have new state insurance, cancel your old North Dakota policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  OK: {
    steps: [
      {
        title: "Return Oklahoma plates (if required)",
        description: "Some states require you to return your old plates. Check the Oklahoma Tax Commission website.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Oklahoma auto insurance",
        description: "Once insured in your new state, cancel your Oklahoma policy.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Notify Oklahoma Tax Commission",
        description: "Update your address with the Oklahoma Tax Commission.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  RI: {
    steps: [
      {
        title: "Return Rhode Island plates (if required)",
        description: "Check if your new state requires you to surrender your RI plates.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Rhode Island auto insurance",
        description: "Once you have new state insurance, cancel your old Rhode Island policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  SC: {
    steps: [
      {
        title: "Return South Carolina plates (if required)",
        description: "Some states require you to return your old plates to the SC DMV.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel South Carolina auto insurance",
        description: "Avoid penalties by canceling your old insurance policy.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Notify SC DMV of address change",
        description: "Update your address with the South Carolina Department of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  SD: {
    steps: [
      {
        title: "Return South Dakota plates (if required)",
        description: "Check your new state's requirements for surrendering old plates.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel South Dakota auto insurance",
        description: "Once insured in your new state, cancel your South Dakota policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  UT: {
    steps: [
      {
        title: "Return Utah plates (if required)",
        description: "Some states require you to return your old plates. Check the Utah DMV website.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Utah auto insurance",
        description: "Once you have new state insurance, cancel your old Utah policy.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Notify Utah DMV of address change",
        description: "Update your address with the Utah Division of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  VT: {
    steps: [
      {
        title: "Return Vermont plates (if required)",
        description: "Check if your new state requires you to surrender your VT plates.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Vermont auto insurance",
        description: "Once insured in your new state, cancel your Vermont policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
  WV: {
    steps: [
      {
        title: "Return West Virginia plates (if required)",
        description: "Some states require you to return your old plates to avoid penalties.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel West Virginia auto insurance",
        description: "Avoid double coverage by canceling your old insurance policy.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Notify West Virginia DMV",
        description: "Update your address with the West Virginia Division of Motor Vehicles.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  WI: {
    steps: [
      {
        title: "Return Wisconsin plates (if required)",
        description: "Check your new state's requirements for surrendering old plates.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Wisconsin auto insurance",
        description: "Once you have new state insurance, cancel your old Wisconsin policy.",
        icon: "Shield",
        urgent: false,
      },
      {
        title: "Notify Wisconsin DOT",
        description: "Update your address with the Wisconsin Department of Transportation.",
        icon: "MapPin",
        urgent: false,
      },
    ],
  },
  WY: {
    steps: [
      {
        title: "Return Wyoming plates (if required)",
        description: "Some states require you to return your old plates. Check the Wyoming DOT website.",
        icon: "Car",
        urgent: false,
      },
      {
        title: "Cancel Wyoming auto insurance",
        description: "Once insured in your new state, cancel your Wyoming policy.",
        icon: "Shield",
        urgent: false,
      },
    ],
  },
}

export const ENTRY_STATE_DATA: Record<string, EntryStateData> = {
  TX: {
    requiredForms: [
      {
        name: "Texas Form 130-U",
        description: "Application for Texas Title and/or Registration",
        url: "/forms/texas-form-130u.pdf",
        required: true,
      },
      {
        name: "Vehicle Inspection Report (VIR)",
        description: "Required safety and emissions inspection",
        required: true,
      },
      {
        name: "Proof of Texas Auto Insurance",
        description: "Minimum liability coverage required by Texas law",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Get a Texas vehicle inspection",
        description: "Have your vehicle inspected at an authorized Texas inspection station.",
        icon: "CheckCircle",
        urgent: true,
      },
      {
        title: "Obtain Texas auto insurance",
        description: "Purchase auto insurance from a Texas-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Texas Form 130-U",
        description: "Fill out the Application for Texas Title and/or Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local County Tax Assessor-Collector office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    specialCircumstances: {
      student: {
        description:
          "As a student, you may be able to keep your previous state's registration temporarily. Check with the Texas DMV for specific student exemptions.",
        icon: "GraduationCap",
      },
      military: {
        description:
          "Active duty military personnel may be eligible for fee waivers or exemptions. Bring your military ID and orders to the County Tax Assessor-Collector office.",
        icon: "Shield",
      },
      lienholder: {
        description:
          "If your vehicle has a loan, your lienholder may hold the title. You'll need to contact them to arrange for the title to be sent to Texas or released.",
        icon: "Building",
      },
    },
    importantDeadline:
      "You typically have **30 days** from your move date to register your vehicle in Texas. Late registration may result in penalties and fees.",
  },
  FL: {
    requiredForms: [
      {
        name: "Florida Application for Certificate of Title With/Without Registration (HSMV 82040)",
        description: "Required for new Florida residents to title and register their vehicle.",
        url: "/forms/florida-hsmv-82040.pdf",
        required: true,
      },
      {
        name: "Proof of Florida Auto Insurance",
        description: "Minimum Personal Injury Protection (PIP) and Property Damage Liability (PDL) required.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Florida auto insurance",
        description: "Purchase auto insurance from a Florida-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete HSMV Form 82040",
        description: "Fill out the Application for Certificate of Title With/Without Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit a Florida Tax Collector's office or DMV",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    specialCircumstances: {
      student: {
        description:
          "Florida has specific residency rules for students. You may be exempt from immediate registration if you maintain out-of-state residency for school purposes.",
        icon: "GraduationCap",
      },
      military: {
        description:
          "Active duty military personnel stationed in Florida may have special exemptions or extended deadlines for vehicle registration. Check with the FLHSMV.",
        icon: "Shield",
      },
      lienholder: {
        description:
          "If your vehicle has a loan, your lienholder will need to send the original title to Florida for transfer. This process can take time, so start early.",
        icon: "Building",
      },
    },
    importantDeadline:
      "You typically have **10 days** from becoming a Florida resident to register your vehicle. Penalties may apply for late registration.",
  },
  IL: {
    requiredForms: [
      {
        name: "Application for Vehicle Transaction(s) (VSD 190)",
        description: "Use this form to apply for title and registration in Illinois.",
        url: "/forms/illinois-vsd-190.pdf",
        required: true,
      },
      {
        name: "Proof of Illinois Auto Insurance",
        description: "Minimum liability coverage required by Illinois law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Apply for an Illinois title and registration",
        description: "Submit the VSD 190 form with proof of ownership and residency.",
        icon: "FileText",
        urgent: true,
      },
      {
        title: "Visit an Illinois Secretary of State facility",
        description: "Bring required documents and pay applicable fees.",
        icon: "Building",
        urgent: false,
      },
      {
        title: "Pass an emissions test (if required)",
        description: "Required in certain Illinois counties like Cook and surrounding areas.",
        icon: "CheckCircle",
        urgent: false,
      },
    ],
    specialCircumstances: {
      student: {
        description:
          "Students may have specific residency requirements. Check with the Illinois Secretary of State for details.",
        icon: "GraduationCap",
      },
    },
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Illinois.",
  },
  AZ: {
    requiredForms: [
      {
        name: "Application for Title and Registration (Form 96-0236)",
        description: "Required for titling and registering your vehicle in Arizona.",
        url: "/forms/arizona-form-96-0236.pdf",
        required: true,
      },
      {
        name: "Proof of Arizona Auto Insurance",
        description: "Minimum liability coverage required by Arizona law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Get a Level I vehicle inspection (if required)",
        description: "Typically required for out-of-state vehicles with missing or mismatched VINs.",
        icon: "Search",
        urgent: false,
      },
      {
        title: "Register at an AZ MVD office or authorized third-party provider",
        description: "Bring your out-of-state title, ID, and proof of insurance.",
        icon: "Building",
        urgent: true,
      },
      {
        title: "Pass an emissions test (in certain counties)",
        description: "Required in metro areas like Phoenix and Tucson.",
        icon: "CheckCircle",
        urgent: false,
      },
    ],
    specialCircumstances: {
      military: {
        description:
          "Active duty military personnel may be exempt from certain fees or have extended deadlines. Check with the Arizona MVD.",
        icon: "Shield",
      },
    },
    importantDeadline:
      "You typically have **15 days** from establishing residency to register your vehicle in Arizona.",
  },
  GA: {
    requiredForms: [
      {
        name: "Application for Certificate of Title (Form MV-1)",
        description: "Required for titling and registering your vehicle in Georgia.",
        url: "/forms/georgia-mv-1.pdf",
        required: true,
      },
      {
        name: "Proof of Georgia Auto Insurance",
        description: "Minimum liability coverage required by Georgia law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Apply for a Georgia title and registration",
        description: "Bring your out-of-state title, proof of insurance, and ID to your local county tag office.",
        icon: "FileText",
        urgent: true,
      },
      {
        title: "Pay title and registration fees",
        description: "Fees vary depending on your vehicle and location.",
        icon: "DollarSign",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Georgia.",
  },
  PA: {
    requiredForms: [
      {
        name: "Form MV-1",
        description: "Required for first-time Pennsylvania titling of out-of-state vehicles.",
        url: "/forms/pennsylvania-mv-1.pdf",
        required: true,
      },
      {
        name: "Proof of Pennsylvania Auto Insurance",
        description: "Minimum liability coverage required by Pennsylvania law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Apply for a Pennsylvania title and registration",
        description: "Submit Form MV-1, proof of ownership, and ID at a PennDOT location.",
        icon: "FileText",
        urgent: true,
      },
      {
        title: "Submit proof of insurance and VIN verification",
        description: "These are required to complete registration.",
        icon: "Shield",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **20 days** from establishing residency to register your vehicle in Pennsylvania.",
  },
  NC: {
    requiredForms: [
      {
        name: "North Carolina Title Application (MVR-1)",
        description: "Required for titling and registering your vehicle in North Carolina.",
        url: "/forms/north-carolina-mvr-1.pdf",
        required: true,
      },
      {
        name: "Proof of North Carolina Auto Insurance",
        description: "Minimum liability coverage required by North Carolina law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Have your vehicle inspected",
        description: "A safety and emissions inspection is required for most counties.",
        icon: "CheckCircle",
        urgent: true,
      },
      {
        title: "Apply for title and registration in NC",
        description: "Bring proof of ownership, insurance, and ID to the DMV.",
        icon: "FileText",
        urgent: true,
      },
      {
        title: "Pay title, registration, and tax fees",
        description: "North Carolina charges a Highway Use Tax in place of sales tax.",
        icon: "DollarSign",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in North Carolina.",
  },
  CA: {
    requiredForms: [
      {
        name: "Application for Title or Registration (REG 343)",
        description: "Required for new California residents to title and register their vehicle.",
        url: "/forms/california-reg-343.pdf",
        required: true,
      },
      {
        name: "Smog Inspection Certificate",
        description: "Most vehicles require a smog inspection before registration.",
        required: true,
      },
      {
        name: "Proof of California Auto Insurance",
        description: "Minimum liability coverage required by California law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain California auto insurance",
        description: "Purchase auto insurance from a California-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a smog inspection",
        description: "Have your vehicle inspected at a certified Smog Check station.",
        icon: "CheckCircle",
        urgent: true,
      },
      {
        title: "Complete REG 343 form",
        description: "Fill out the Application for Title or Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit a California DMV office or authorized business partner",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    specialCircumstances: {
      student: {
        description:
          "Non-resident students may be exempt from California registration if their vehicle is properly registered in their home state and they are enrolled full-time.",
        icon: "GraduationCap",
      },
      military: {
        description:
          "Non-resident military personnel stationed in California may be exempt from registration fees if their vehicle is properly registered in their home state.",
        icon: "Shield",
      },
    },
    importantDeadline:
      "You typically have **20 days** from establishing residency or gaining employment to register your vehicle in California. Penalties may apply for late registration.",
  },
  NY: {
    requiredForms: [
      {
        name: "Vehicle Registration/Title Application (MV-82)",
        description: "Required for new New York residents to title and register their vehicle.",
        url: "/forms/new-york-mv-82.pdf",
        required: true,
      },
      {
        name: "Proof of New York Auto Insurance",
        description: "Minimum liability coverage required by New York law.",
        
        required: true,
      },
      {
        name: "Vehicle Inspection Report",
        description: "All vehicles must pass a safety and emissions inspection annually.",
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain New York auto insurance",
        description: "Purchase auto insurance from a New York-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a New York vehicle inspection",
        description: "Have your vehicle inspected at an authorized New York inspection station.",
        icon: "CheckCircle",
        urgent: true,
      },
      {
        title: "Complete MV-82 form",
        description: "Fill out the Vehicle Registration/Title Application.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit a New York DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    specialCircumstances: {
      student: {
        description:
          "Non-resident students may be exempt from New York registration if their vehicle is properly registered in their home state and they are enrolled full-time.",
        icon: "GraduationCap",
      },
      military: {
        description:
          "Non-resident military personnel stationed in New York may be exempt from registration fees if their vehicle is properly registered in their home state.",
        icon: "Shield",
      },
    },
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in New York. Penalties may apply for late registration.",
  },
  WA: {
    requiredForms: [
      {
        name: "Vehicle Certificate of Ownership Application (Form TD-420-001)",
        description: "Required for titling and registering your vehicle in Washington.",
        url: "/forms/washington-td-420-001.pdf",
        required: true,
      },
      {
        name: "Proof of Washington Auto Insurance",
        description: "Minimum liability coverage required by Washington law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Washington auto insurance",
        description: "Purchase auto insurance from a Washington-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN inspection (if required)",
        description: "Required for vehicles without a Washington title or if the VIN is missing/altered.",
        icon: "Search",
        urgent: false,
      },
      {
        title: "Complete Form TD-420-001",
        description: "Fill out the Vehicle Certificate of Ownership Application.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit a Washington DOL office or vehicle licensing agent",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Washington. Penalties may apply for late registration.",
  },
  CO: {
    requiredForms: [
      {
        name: "Colorado Title Application (DR 2395)",
        description: "Required for titling and registering your vehicle in Colorado.",
        url: "/forms/colorado-dr-2395.pdf",
        required: true,
      },
      {
        name: "Proof of Colorado Auto Insurance",
        description: "Minimum liability coverage required by Colorado law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Colorado auto insurance",
        description: "Purchase auto insurance from a Colorado-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get an emissions inspection (if required)",
        description: "Required in certain counties (e.g., Denver metro area).",
        icon: "CheckCircle",
        urgent: false,
      },
      {
        title: "Complete DR 2395 form",
        description: "Fill out the Colorado Title Application.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local County Motor Vehicle office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **90 days** from establishing residency to register your vehicle in Colorado.",
  },
  VA: {
    requiredForms: [
      {
        name: "Application for Certificate of Title and Registration (VSA 17A)",
        description: "Required for titling and registering your vehicle in Virginia.",
        url: "/forms/virginia-vsa-17a.pdf",
        required: true,
      },
      {
        name: "Proof of Virginia Auto Insurance",
        description: "Minimum liability coverage required by Virginia law.",
        
        required: true,
      },
      {
        name: "Vehicle Inspection Report",
        description: "All vehicles must pass a safety inspection annually.",
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Virginia auto insurance",
        description: "Purchase auto insurance from a Virginia-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a Virginia safety inspection",
        description: "Have your vehicle inspected at an authorized Virginia inspection station.",
        icon: "CheckCircle",
        urgent: true,
      },
      {
        title: "Complete VSA 17A form",
        description: "Fill out the Application for Certificate of Title and Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit a Virginia DMV Customer Service Center",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Virginia.",
  },
  MA: {
    requiredForms: [
      {
        name: "Application for Registration & Title (RMV-1)",
        description: "Required for new Massachusetts residents to title and register their vehicle.",
        url: "/forms/massachusetts-rmv-1.pdf",
        required: true,
      },
      {
        name: "Proof of Massachusetts Auto Insurance",
        description: "Minimum liability coverage required by Massachusetts law.",
        
        required: true,
      },
      {
        name: "Vehicle Inspection Report",
        description: "All vehicles must pass a safety and emissions inspection annually.",
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Massachusetts auto insurance",
        description: "Purchase auto insurance from a Massachusetts-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a Massachusetts vehicle inspection",
        description: "Have your vehicle inspected at an authorized Massachusetts inspection station.",
        icon: "CheckCircle",
        urgent: true,
      },
      {
        title: "Complete RMV-1 form",
        description: "Fill out the Application for Registration & Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit a Massachusetts RMV Service Center",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Massachusetts. Penalties may apply for late registration.",
  },
  OH: {
    requiredForms: [
      {
        name: "Application for Certificate of Title to a Motor Vehicle (BMV 3774)",
        description: "Required for titling and registering your vehicle in Ohio.",
        url: "/forms/ohio-bmv-3774.pdf",
        required: true,
      },
      {
        name: "Proof of Ohio Auto Insurance",
        description: "Minimum liability coverage required by Ohio law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Ohio auto insurance",
        description: "Purchase auto insurance from an Ohio-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN inspection (if required)",
        description: "Required for out-of-state vehicles.",
        icon: "Search",
        urgent: true,
      },
      {
        title: "Complete BMV 3774 form",
        description: "Fill out the Application for Certificate of Title to a Motor Vehicle.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local Deputy Registrar agency",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    specialCircumstances: {
      student: {
        description:
          "Non-resident students may be exempt from Ohio registration if their vehicle is properly registered in their home state and they are enrolled full-time.",
        icon: "GraduationCap",
      },
    },
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Ohio. Penalties may apply for late registration.",
  },
  MI: {
    requiredForms: [
      {
        name: "Application for Michigan Title and Registration (Form TR-11L)",
        description: "Required for titling and registering your vehicle in Michigan.",
        url: "/forms/michigan-tr-11l.pdf",
        required: true,
      },
      {
        name: "Proof of Michigan No-Fault Auto Insurance",
        description: "Michigan requires no-fault insurance.",
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Michigan no-fault auto insurance",
        description: "Purchase no-fault auto insurance from a Michigan-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Form TR-11L",
        description: "Fill out the Application for Michigan Title and Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit a Michigan Secretary of State office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    specialCircumstances: {
      military: {
        description:
          "Non-resident military personnel stationed in Michigan may be exempt from certain fees or have extended deadlines. Check with the Michigan SOS.",
        icon: "Shield",
      },
    },
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Michigan.",
  },
  NJ: {
    requiredForms: [
      {
        name: "Vehicle Registration Application (Form BA-49)",
        description: "Required for new New Jersey residents to title and register their vehicle.",
        url: "/forms/new-jersey-ba-49.pdf",
        required: true,
      },
      {
        name: "Proof of New Jersey Auto Insurance",
        description: "Minimum liability coverage required by New Jersey law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain New Jersey auto insurance",
        description: "Purchase auto insurance from a New Jersey-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN verification (if required)",
        description: "Required for out-of-state vehicles.",
        icon: "Search",
        urgent: false,
      },
      {
        title: "Complete Form BA-49",
        description: "Fill out the Vehicle Registration Application.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit a New Jersey MVC agency",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    specialCircumstances: {
      lienholder: {
        description:
          "If your vehicle has a loan, your lienholder will need to send the original title to New Jersey for transfer. This process can take time, so start early.",
        icon: "Building",
      },
    },
    importantDeadline:
      "You typically have **60 days** from establishing residency to register your vehicle in New Jersey. Penalties may apply for late registration.",
  },
  OR: {
    requiredForms: [
      {
        name: "Application for Title and Registration (Form 735-226)",
        description: "Required for titling and registering your vehicle in Oregon.",
        url: "/forms/oregon-735-226.pdf",
        required: true,
      },
      {
        name: "Proof of Oregon Auto Insurance",
        description: "Minimum liability coverage required by Oregon law.",
        
        required: true,
      },
      {
        name: "Vehicle Identification Number (VIN) Inspection",
        description: "Required for out-of-state vehicles.",
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Oregon auto insurance",
        description: "Purchase auto insurance from an Oregon-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN inspection",
        description: "Have your vehicle's VIN inspected by an authorized Oregon DMV agent.",
        icon: "Search",
        urgent: true,
      },
      {
        title: "Complete Form 735-226",
        description: "Fill out the Application for Title and Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit an Oregon DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Oregon. Penalties may apply for late registration.",
  },
  MD: {
    requiredForms: [
      {
        name: "Application for Certificate of Title (Form VR-005)",
        description: "Required for titling and registering your vehicle in Maryland.",
        url: "/forms/maryland-vr-005.pdf",
        required: true,
      },
      {
        name: "Maryland Safety Inspection Certificate",
        description: "Required for all used vehicles before titling and registration.",
        required: true,
      },
      {
        name: "Proof of Maryland Auto Insurance",
        description: "Minimum liability coverage required by Maryland law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Maryland auto insurance",
        description: "Purchase auto insurance from a Maryland-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a Maryland safety inspection",
        description: "Have your vehicle inspected at a licensed Maryland inspection station.",
        icon: "CheckCircle",
        urgent: true,
      },
      {
        title: "Complete Form VR-005",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit a Maryland MVA office or authorized tag and title service",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    specialCircumstances: {
      military: {
        description:
          "Non-resident military personnel stationed in Maryland may be exempt from certain fees or have extended deadlines. Check with the Maryland MVA.",
        icon: "Shield",
      },
    },
    importantDeadline:
      "You typically have **60 days** from establishing residency to register your vehicle in Maryland. Penalties may apply for late registration.",
  },
  MN: {
    requiredForms: [
      {
        name: "Application for Title and Registration (Form PS2000)",
        description: "Required for titling and registering your vehicle in Minnesota.",
        url: "/forms/minnesota-ps2000.pdf",
        required: true,
      },
      {
        name: "Proof of Minnesota No-Fault Auto Insurance",
        description: "Minnesota requires no-fault insurance.",
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Minnesota no-fault auto insurance",
        description: "Purchase no-fault auto insurance from a Minnesota-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Form PS2000",
        description: "Fill out the Application for Title and Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit a Minnesota DVS office or deputy registrar",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    specialCircumstances: {
      student: {
        description:
          "Non-resident students may be exempt from Minnesota registration if their vehicle is properly registered in their home state and they are enrolled full-time.",
        icon: "GraduationCap",
      },
    },
    importantDeadline:
      "You typically have **60 days** from establishing residency to register your vehicle in Minnesota. Penalties may apply for late registration.",
  },
  CT: {
    requiredForms: [
      {
        name: "Application for Certificate of Title and Registration (Form H-13B)",
        description: "Required for new Connecticut residents to title and register their vehicle.",
        url: "/forms/connecticut-h-13b.pdf",
        required: true,
      },
      {
        name: "Proof of Connecticut Auto Insurance",
        description: "Minimum liability coverage required by Connecticut law.",
        
        required: true,
      },
      {
        name: "VIN Verification (Form H-13B)",
        description: "Required for out-of-state vehicles, part of the H-13B form.",
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Connecticut auto insurance",
        description: "Purchase auto insurance from a Connecticut-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN verification",
        description: "Have your vehicle's VIN verified by an authorized Connecticut DMV official.",
        icon: "Search",
        urgent: true,
      },
      {
        title: "Complete Form H-13B",
        description: "Fill out the Application for Certificate of Title and Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit a Connecticut DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **60 days** from establishing residency to register your vehicle in Connecticut. Penalties may apply for late registration.",
  },
  IN: {
    requiredForms: [
      {
        name: "Application for Certificate of Title (Form 44049)",
        description: "Required for titling and registering your vehicle in Indiana.",
        url: "/forms/indiana-44049.pdf",
        required: true,
      },
      {
        name: "Proof of Indiana Auto Insurance",
        description: "Minimum liability coverage required by Indiana law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Indiana auto insurance",
        description: "Purchase auto insurance from an Indiana-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Form 44049",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit an Indiana BMV branch",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    specialCircumstances: {
      student: {
        description:
          "Non-resident students may be exempt from Indiana registration if their vehicle is properly registered in their home state and they are enrolled full-time.",
        icon: "GraduationCap",
      },
    },
    importantDeadline:
      "You typically have **60 days** from establishing residency to register your vehicle in Indiana. Penalties may apply for late registration.",
  },
  TN: {
    requiredForms: [
      {
        name: "Application for Vehicle Title and Registration (Form RV-F1310101)",
        description: "Required for titling and registering your vehicle in Tennessee.",
        url: "/forms/tennessee-rv-f1310101.pdf",
        required: true,
      },
      {
        name: "Proof of Tennessee Auto Insurance",
        description: "Minimum liability coverage required by Tennessee law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Tennessee auto insurance",
        description: "Purchase auto insurance from a Tennessee-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Form RV-F1310101",
        description: "Fill out the Application for Vehicle Title and Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local County Clerk's office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Tennessee. Penalties may apply for late registration.",
  },
  AL: {
    requiredForms: [
      {
        name: "Application for Certificate of Title (MVT 5-1)",
        description: "Required for titling and registering your vehicle in Alabama.",
        url: "/forms/alabama-mvt-5-1.pdf",
        required: true,
      },
      {
        name: "Proof of Alabama Auto Insurance",
        description: "Minimum liability coverage required by Alabama law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Alabama auto insurance",
        description: "Purchase auto insurance from an Alabama-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete MVT 5-1 form",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local County Tag Office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Alabama. Penalties may apply for late registration.",
  },
  AK: {
    requiredForms: [
      {
        name: "Application for Title & Registration (Form 812)",
        description: "Required for titling and registering your vehicle in Alaska.",
        url: "/forms/alaska-form-812.pdf",
        required: true,
      },
      {
        name: "Proof of Alaska Auto Insurance",
        description: "Minimum liability coverage required by Alaska law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Alaska auto insurance",
        description: "Purchase auto insurance from an Alaska-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Form 812",
        description: "Fill out the Application for Title & Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit an Alaska DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **10 days** from establishing residency to register your vehicle in Alaska. Penalties may apply for late registration.",
  },
  AR: {
    requiredForms: [
      {
        name: "Application for Certificate of Title (Form 10-381)",
        description: "Required for titling and registering your vehicle in Arkansas.",
        url: "/forms/arkansas-form-10-381.pdf",
        required: true,
      },
      {
        name: "Proof of Arkansas Auto Insurance",
        description: "Minimum liability coverage required by Arkansas law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Arkansas auto insurance",
        description: "Purchase auto insurance from an Arkansas-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN verification (if required)",
        description: "Required for out-of-state vehicles.",
        icon: "Search",
        urgent: true,
      },
      {
        title: "Complete Form 10-381",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local Revenue Office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Arkansas. Penalties may apply for late registration.",
  },
  DE: {
    requiredForms: [
      {
        name: "Application for Certificate of Title (MV2)",
        description: "Required for titling and registering your vehicle in Delaware.",
        url: "/forms/delaware-mv2.pdf",
        required: true,
      },
      {
        name: "Proof of Delaware Auto Insurance",
        description: "Minimum liability coverage required by Delaware law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Delaware auto insurance",
        description: "Purchase auto insurance from a Delaware-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN inspection and emissions test",
        description: "Required for all vehicles before titling and registration.",
        icon: "CheckCircle",
        urgent: true,
      },
      {
        title: "Complete MV2 form",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit a Delaware DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **60 days** from establishing residency to register your vehicle in Delaware. Penalties may apply for late registration.",
  },
  HI: {
    requiredForms: [
      {
        name: "Application for Certificate of Title (CS-L (MVR) 1)",
        description: "Required for titling and registering your vehicle in Hawaii.",
        url: "/forms/hawaii-cs-l-mvr1.pdf",
        required: true,
      },
      {
        name: "Proof of Hawaii Auto Insurance",
        description: "Minimum liability coverage required by Hawaii law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Hawaii auto insurance",
        description: "Purchase auto insurance from a Hawaii-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a safety inspection",
        description: "Required for all vehicles before titling and registration.",
        icon: "CheckCircle",
        urgent: true,
      },
      {
        title: "Complete CS-L (MVR) 1 form",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local County Motor Vehicle Registration office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Hawaii. Penalties may apply for late registration.",
  },
  ID: {
    requiredForms: [
      {
        name: "Application for Certificate of Title (ITD 3337)",
        description: "Required for titling and registering your vehicle in Idaho.",
        url: "/forms/idaho-itd-3337.pdf",
        required: true,
      },
      {
        name: "Proof of Idaho Auto Insurance",
        description: "Minimum liability coverage required by Idaho law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Idaho auto insurance",
        description: "Purchase auto insurance from an Idaho-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN inspection (if required)",
        description: "Required for out-of-state vehicles.",
        icon: "Search",
        urgent: true,
      },
      {
        title: "Complete ITD 3337 form",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local County Assessor's office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **90 days** from establishing residency to register your vehicle in Idaho. Penalties may apply for late registration.",
  },
  IA: {
    requiredForms: [
      {
        name: "Application for Certificate of Title and Registration (Form 411007)",
        description: "Required for titling and registering your vehicle in Iowa.",
        url: "/forms/iowa-411007.pdf",
        required: true,
      },
      {
        name: "Proof of Iowa Auto Insurance",
        description: "Minimum liability coverage required by Iowa law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Iowa auto insurance",
        description: "Purchase auto insurance from an Iowa-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Form 411007",
        description: "Fill out the Application for Certificate of Title and Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local County Treasurer's office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Iowa. Penalties may apply for late registration.",
  },
  KS: {
    requiredForms: [
      {
        name: "Application for Certificate of Title (Form TR-212)",
        description: "Required for titling and registering your vehicle in Kansas.",
        url: "/forms/kansas-tr-212.pdf",
        required: true,
      },
      {
        name: "Proof of Kansas Auto Insurance",
        description: "Minimum liability coverage required by Kansas law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Kansas auto insurance",
        description: "Purchase auto insurance from a Kansas-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN inspection (if required)",
        description: "Required for out-of-state vehicles.",
        icon: "Search",
        urgent: true,
      },
      {
        title: "Complete Form TR-212",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local County Treasurer's office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **90 days** from establishing residency to register your vehicle in Kansas. Penalties may apply for late registration.",
  },
  KY: {
    requiredForms: [
      {
        name: "Application for Kentucky Certificate of Title/Registration (Form TC96-182)",
        description: "Required for titling and registering your vehicle in Kentucky.",
        url: "/forms/kentucky-tc96-182.pdf",
        required: true,
      },
      {
        name: "Proof of Kentucky Auto Insurance",
        description: "Minimum liability coverage required by Kentucky law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Kentucky auto insurance",
        description: "Purchase auto insurance from a Kentucky-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN inspection and/or emissions test (if required)",
        description: "Required for out-of-state vehicles and in certain counties for emissions.",
        icon: "CheckCircle",
        urgent: true,
      },
      {
        title: "Complete Form TC96-182",
        description: "Fill out the Application for Kentucky Certificate of Title/Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local County Clerk's office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **15 days** from establishing residency to register your vehicle in Kentucky. Penalties may apply for late registration.",
  },
  LA: {
    requiredForms: [
      {
        name: "Vehicle Application (VEH-FORM-1)",
        description: "Required for titling and registering your vehicle in Louisiana.",
        url: "/forms/louisiana-veh-form-1.pdf",
        required: true,
      },
      {
        name: "Proof of Louisiana Auto Insurance",
        description: "Minimum liability coverage required by Louisiana law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Louisiana auto insurance",
        description: "Purchase auto insurance from a Louisiana-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN inspection (if required)",
        description: "Required for out-of-state vehicles.",
        icon: "Search",
        urgent: true,
      },
      {
        title: "Complete VEH-FORM-1",
        description: "Fill out the Vehicle Application.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local OMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Louisiana. Penalties may apply for late registration.",
  },
  ME: {
    requiredForms: [
      {
        name: "Application for Certificate of Title (MVT-1)",
        description: "Required for titling and registering your vehicle in Maine.",
        url: "/forms/maine-mvt-1.pdf",
        required: true,
      },
      {
        name: "Proof of Maine Auto Insurance",
        description: "Minimum liability coverage required by Maine law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Maine auto insurance",
        description: "Purchase auto insurance from a Maine-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN inspection (if required)",
        description: "Required for out-of-state vehicles.",
        icon: "Search",
        urgent: true,
      },
      {
        title: "Complete MVT-1 form",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local Bureau of Motor Vehicles (BMV) office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Maine. Penalties may apply for late registration.",
  },
  MS: {
    requiredForms: [
      {
        name: "Application for Mississippi Certificate of Title (Form 78-002)",
        description: "Required for titling and registering your vehicle in Mississippi.",
        url: "/forms/mississippi-78-002.pdf",
        required: true,
      },
      {
        name: "Proof of Mississippi Auto Insurance",
        description: "Minimum liability coverage required by Mississippi law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Mississippi auto insurance",
        description: "Purchase auto insurance from a Mississippi-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN inspection (if required)",
        description: "Required for out-of-state vehicles.",
        icon: "Search",
        urgent: true,
      },
      {
        title: "Complete Form 78-002",
        description: "Fill out the Application for Mississippi Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local County Tax Collector's office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Mississippi. Penalties may apply for late registration.",
  },
  MO: {
    requiredForms: [
      {
        name: "Application for Missouri Title and License (DOR-108)",
        description: "Required for titling and registering your vehicle in Missouri.",
        url: "/forms/missouri-dor-108.pdf",
        required: true,
      },
      {
        name: "Proof of Missouri Auto Insurance",
        description: "Minimum liability coverage required by Missouri law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Missouri auto insurance",
        description: "Purchase auto insurance from a Missouri-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a safety inspection (if required)",
        description: "Required for most vehicles every two years.",
        icon: "CheckCircle",
        urgent: true,
      },
      {
        title: "Complete DOR-108 form",
        description: "Fill out the Application for Missouri Title and License.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit a Missouri license office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Missouri. Penalties may apply for late registration.",
  },
  MT: {
    requiredForms: [
      {
        name: "Application for Certificate of Title (MV1)",
        description: "Required for titling and registering your vehicle in Montana.",
        url: "/forms/montana-mv1.pdf",
        required: true,
      },
      {
        name: "Proof of Montana Auto Insurance",
        description: "Minimum liability coverage required by Montana law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Montana auto insurance",
        description: "Purchase auto insurance from a Montana-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete MV1 form",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local County Treasurer's office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **60 days** from establishing residency to register your vehicle in Montana. Penalties may apply for late registration.",
  },
  NE: {
    requiredForms: [
      {
        name: "Application for Certificate of Title (DMV-6)",
        description: "Required for titling and registering your vehicle in Nebraska.",
        url: "/forms/nebraska-dmv-6.pdf",
        required: true,
      },
      {
        name: "Proof of Nebraska Auto Insurance",
        description: "Minimum liability coverage required by Nebraska law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Nebraska auto insurance",
        description: "Purchase auto insurance from a Nebraska-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Get a VIN inspection (if required)",
        description: "Required for out-of-state vehicles.",
        icon: "Search",
        urgent: true,
      },
      {
        title: "Complete DMV-6 form",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local County Treasurer's office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline:
      "You typically have **30 days** from establishing residency to register your vehicle in Nebraska. Penalties may apply for late registration.",
  },
  NV: {
    requiredForms: [
      {
        name: "Nevada Application for Vehicle Registration (VP-222)",
        description: "Required for new Nevada residents to register their vehicle.",
        url: "/forms/nevada-vp-222.pdf",
        required: true,
      },
      {
        name: "Proof of Nevada Auto Insurance",
        description: "Minimum liability coverage required by Nevada law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Nevada auto insurance",
        description: "Purchase auto insurance from a Nevada-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Nevada Form VP-222",
        description: "Fill out the Application for Vehicle Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local Nevada DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline: "You typically have **30 days** from your move date to register your vehicle in Nevada.",
  },
  NH: {
    requiredForms: [
      {
        name: "New Hampshire Application for Certificate of Title (DSMV-19)",
        description: "Required for new New Hampshire residents to title their vehicle.",
        url: "/forms/new-hampshire-dsmv-19.pdf",
        required: true,
      },
      {
        name: "Proof of New Hampshire Auto Insurance",
        description: "Minimum liability coverage required by New Hampshire law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain New Hampshire auto insurance",
        description: "Purchase auto insurance from a New Hampshire-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete New Hampshire Form DSMV-19",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local New Hampshire DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline: "You typically have **60 days** from your move date to register your vehicle in New Hampshire.",
  },
  NM: {
    requiredForms: [
      {
        name: "New Mexico Application for Certificate of Title (MVD-10003)",
        description: "Required for new New Mexico residents to title their vehicle.",
        url: "/forms/new-mexico-mvd-10003.pdf",
        required: true,
      },
      {
        name: "Proof of New Mexico Auto Insurance",
        description: "Minimum liability coverage required by New Mexico law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain New Mexico auto insurance",
        description: "Purchase auto insurance from a New Mexico-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete New Mexico Form MVD-10003",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local New Mexico MVD office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline: "You typically have **30 days** from your move date to register your vehicle in New Mexico.",
  },
  ND: {
    requiredForms: [
      {
        name: "North Dakota Application for Certificate of Title (SFN-2872)",
        description: "Required for new North Dakota residents to title their vehicle.",
        url: "/forms/north-dakota-sfn-2872.pdf",
        required: true,
      },
      {
        name: "Proof of North Dakota Auto Insurance",
        description: "Minimum liability coverage required by North Dakota law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain North Dakota auto insurance",
        description: "Purchase auto insurance from a North Dakota-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete North Dakota Form SFN-2872",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local North Dakota DOT office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline: "You typically have **30 days** from your move date to register your vehicle in North Dakota.",
  },
  OK: {
    requiredForms: [
      {
        name: "Oklahoma Application for Oklahoma Certificate of Title for a Vehicle (Form 701-7)",
        description: "Required for new Oklahoma residents to title their vehicle.",
        url: "/forms/oklahoma-form-701-7.pdf",
        required: true,
      },
      {
        name: "Proof of Oklahoma Auto Insurance",
        description: "Minimum liability coverage required by Oklahoma law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Oklahoma auto insurance",
        description: "Purchase auto insurance from an Oklahoma-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Oklahoma Form 701-7",
        description: "Fill out the Application for Oklahoma Certificate of Title for a Vehicle.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local Oklahoma Tax Commission office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline: "You typically have **30 days** from your move date to register your vehicle in Oklahoma.",
  },
  RI: {
    requiredForms: [
      {
        name: "Rhode Island Application for Certificate of Title (TR-1)",
        description: "Required for new Rhode Island residents to title their vehicle.",
        url: "/forms/rhode-island-tr-1.pdf",
        required: true,
      },
      {
        name: "Proof of Rhode Island Auto Insurance",
        description: "Minimum liability coverage required by Rhode Island law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Rhode Island auto insurance",
        description: "Purchase auto insurance from a Rhode Island-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Rhode Island Form TR-1",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local Rhode Island DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline: "You typically have **30 days** from your move date to register your vehicle in Rhode Island.",
  },
  SC: {
    requiredForms: [
      {
        name: "South Carolina Application for Certificate of Title and Registration (Form 400)",
        description: "Required for new South Carolina residents to title and register their vehicle.",
        url: "/forms/south-carolina-form-400.pdf",
        required: true,
      },
      {
        name: "Proof of South Carolina Auto Insurance",
        description: "Minimum liability coverage required by South Carolina law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain South Carolina auto insurance",
        description: "Purchase auto insurance from a South Carolina-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete South Carolina Form 400",
        description: "Fill out the Application for Certificate of Title and Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local South Carolina DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline: "You typically have **45 days** from your move date to register your vehicle in South Carolina.",
  },
  SD: {
    requiredForms: [
      {
        name: "South Dakota Application for Certificate of Title (MV-1)",
        description: "Required for new South Dakota residents to title their vehicle.",
        url: "/forms/south-dakota-mv-1.pdf",
        required: true,
      },
      {
        name: "Proof of South Dakota Auto Insurance",
        description: "Minimum liability coverage required by South Dakota law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain South Dakota auto insurance",
        description: "Purchase auto insurance from a South Dakota-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete South Dakota Form MV-1",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local South Dakota DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline: "You typically have **30 days** from your move date to register your vehicle in South Dakota.",
  },
  UT: {
    requiredForms: [
      {
        name: "Utah Application for Utah Title (TC-656)",
        description: "Required for new Utah residents to title their vehicle.",
        url: "/forms/utah-tc-656.pdf",
        required: true,
      },
      {
        name: "Proof of Utah Auto Insurance",
        description: "Minimum liability coverage required by Utah law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Utah auto insurance",
        description: "Purchase auto insurance from a Utah-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Utah Form TC-656",
        description: "Fill out the Application for Utah Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local Utah DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline: "You typically have **30 days** from your move date to register your vehicle in Utah.",
  },
  VT: {
    requiredForms: [
      {
        name: "Vermont Application for Certificate of Title (VS-119)",
        description: "Required for new Vermont residents to title their vehicle.",
        url: "/forms/vermont-vd-119.pdf",
        required: true,
      },
      {
        name: "Proof of Vermont Auto Insurance",
        description: "Minimum liability coverage required by Vermont law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Vermont auto insurance",
        description: "Purchase auto insurance from a Vermont-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Vermont Form VS-119",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local Vermont DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline: "You typically have **60 days** from your move date to register your vehicle in Vermont.",
  },
  WV: {
    requiredForms: [
      {
        name: "West Virginia Application for Certificate of Title (DMV-1-TR)",
        description: "Required for new West Virginia residents to title their vehicle.",
        url: "/forms/west-virginia-dmv-1-tr.pdf",
        required: true,
      },
      {
        name: "Proof of West Virginia Auto Insurance",
        description: "Minimum liability coverage required by West Virginia law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain West Virginia auto insurance",
        description: "Purchase auto insurance from a West Virginia-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete West Virginia Form DMV-1-TR",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local West Virginia DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline: "You typically have **30 days** from your move date to register your vehicle in West Virginia.",
  },
  WI: {
    requiredForms: [
      {
        name: "Wisconsin Application for Vehicle Title and Registration (MV1)",
        description: "Required for new Wisconsin residents to title and register their vehicle.",
        url: "/forms/wisconsin-mv1.pdf",
        required: true,
      },
      {
        name: "Proof of Wisconsin Auto Insurance",
        description: "Minimum liability coverage required by Wisconsin law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Wisconsin auto insurance",
        description: "Purchase auto insurance from a Wisconsin-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Wisconsin Form MV1",
        description: "Fill out the Application for Vehicle Title and Registration.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local Wisconsin DMV office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline: "You typically have **30 days** from your move date to register your vehicle in Wisconsin.",
  },
  WY: {
    requiredForms: [
      {
        name: "Wyoming Application for Certificate of Title",
        description: "Required for new Wyoming residents to title their vehicle.",
        url: "/forms/wyoming-title-application.pdf",
        required: true,
      },
      {
        name: "Proof of Wyoming Auto Insurance",
        description: "Minimum liability coverage required by Wyoming law.",
        
        required: true,
      },
    ],
    steps: [
      {
        title: "Obtain Wyoming auto insurance",
        description: "Purchase auto insurance from a Wyoming-licensed provider.",
        icon: "Shield",
        urgent: true,
      },
      {
        title: "Complete Wyoming title application",
        description: "Fill out the Application for Certificate of Title.",
        icon: "FileText",
        urgent: false,
      },
      {
        title: "Visit your local Wyoming DOT office",
        description: "Bring all required documents, forms, and payment to complete your registration.",
        icon: "Building",
        urgent: false,
      },
    ],
    importantDeadline: "You typically have **30 days** from your move date to register your vehicle in Wyoming.",
  },
}
