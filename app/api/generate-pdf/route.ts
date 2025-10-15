import { type NextRequest, NextResponse } from "next/server"
import { US_STATES, VEHICLE_TYPE_LABELS, MOVE_DATE_LABELS, EXIT_STATE_DATA, ENTRY_STATE_DATA } from "@/lib/checklists"
import { jsPDF } from "jspdf"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const fromState = searchParams.get("from") || ""
  const toState = searchParams.get("to") || ""
  const vehicles = searchParams.get("vehicles")?.split(",") || []
  const moveDate = searchParams.get("moveDate") || ""
  const isStudent = searchParams.get("student") === "true"
  const isMilitary = searchParams.get("military") === "true"
  const hasLienholder = searchParams.get("lienholder") === "true"

  if (!fromState || !toState) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  const fromStateName = US_STATES[fromState] || fromState
  const toStateName = US_STATES[toState] || toState
  const exitData = EXIT_STATE_DATA[fromState]
  const entryData = ENTRY_STATE_DATA[toState]

  if (!exitData || !entryData) {
    return NextResponse.json({ error: "State data not found" }, { status: 404 })
  }

  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const contentWidth = pageWidth - 2 * margin
  let yPosition = 20

  // Helper function to add text with word wrap
  const addText = (text: string, fontSize: number, isBold = false, color: [number, number, number] = [0, 0, 0]) => {
    doc.setFontSize(fontSize)
    doc.setFont("helvetica", isBold ? "bold" : "normal")
    doc.setTextColor(color[0], color[1], color[2])
    const lines = doc.splitTextToSize(text, contentWidth)

    lines.forEach((line: string) => {
      if (yPosition > 270) {
        doc.addPage()
        yPosition = 20
      }
      doc.text(line, margin, yPosition)
      yPosition += fontSize * 0.5
    })
  }

  const addSpace = (space = 5) => {
    yPosition += space
  }

  // Header
  doc.setFillColor(59, 130, 246) // Blue background
  doc.rect(0, 0, pageWidth, 40, "F")
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(20)
  doc.setFont("helvetica", "bold")
  doc.text("VEHICLE REGISTRATION CHECKLIST", pageWidth / 2, 15, { align: "center" })
  doc.setFontSize(10)
  doc.text("Your Complete Guide to Vehicle Re-registration", pageWidth / 2, 25, { align: "center" })

  yPosition = 50

  // Move Details Section
  addText("Move Details", 16, true, [59, 130, 246])
  addSpace(3)
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  addSpace(5)

  addText(`From: ${fromStateName}`, 11, false)
  addSpace(2)
  addText(`To: ${toStateName}`, 11, false)
  addSpace(2)

  if (vehicles.length > 0) {
    addText(`Vehicles: ${vehicles.map((v) => VEHICLE_TYPE_LABELS[v] || v).join(", ")}`, 11, false)
    addSpace(2)
  }

  if (moveDate) {
    addText(`Move Status: ${MOVE_DATE_LABELS[moveDate] || moveDate}`, 11, false)
    addSpace(2)
  }

  if (isStudent) {
    addText("✓ Student Status", 11, false)
    addSpace(2)
  }

  if (isMilitary) {
    addText("✓ Military Service", 11, false)
    addSpace(2)
  }

  if (hasLienholder) {
    addText("✓ Vehicle Loan/Lienholder", 11, false)
    addSpace(2)
  }

  addSpace(8)

  // Required Forms Section
  addText("Required Forms", 16, true, [59, 130, 246])
  addSpace(3)
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  addSpace(5)

  entryData.requiredForms.forEach((form, index) => {
    addText(`${index + 1}. ${form.name}`, 12, true)
    addSpace(2)
    addText(`   ${form.description}`, 10, false)
    addSpace(2)
    if (form.required) {
      doc.setTextColor(220, 38, 38) // Red color
      addText("   ✓ REQUIRED FORM", 10, true)
      doc.setTextColor(0, 0, 0)
    }
    addSpace(5)
  })

  addSpace(5)

  // Registration Steps Section
  addText("Registration Steps", 16, true, [59, 130, 246])
  addSpace(3)
  doc.setDrawColor(200, 200, 200)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  addSpace(5)

  const allSteps = [...exitData.steps, ...entryData.steps]
  allSteps.forEach((step, index) => {
    addText(`${index + 1}. ${step.title}`, 12, true)
    addSpace(2)
    addText(`   ${step.description}`, 10, false)
    addSpace(2)
    if (step.urgent) {
      doc.setTextColor(220, 38, 38) // Red color
      addText("   ⚠ TIME SENSITIVE - Complete ASAP", 10, true)
      doc.setTextColor(0, 0, 0)
    }
    addSpace(5)
  })

  // Special Circumstances Section
  if ((isStudent || isMilitary || hasLienholder) && entryData.specialCircumstances) {
    addSpace(5)
    addText("Special Circumstances", 16, true, [59, 130, 246])
    addSpace(3)
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    addSpace(5)

    if (isStudent && entryData.specialCircumstances.student) {
      addText("Student Status:", 12, true)
      addSpace(2)
      addText(entryData.specialCircumstances.student.description, 10, false)
      addSpace(5)
    }

    if (isMilitary && entryData.specialCircumstances.military) {
      addText("Military Service:", 12, true)
      addSpace(2)
      addText(entryData.specialCircumstances.military.description, 10, false)
      addSpace(5)
    }

    if (hasLienholder && entryData.specialCircumstances.lienholder) {
      addText("Vehicle Loan/Lienholder:", 12, true)
      addSpace(2)
      addText(entryData.specialCircumstances.lienholder.description, 10, false)
      addSpace(5)
    }
  }

  // Important Deadline Section
  if (entryData.importantDeadline) {
    addSpace(5)
    doc.setFillColor(254, 243, 199) // Light yellow background
    doc.rect(margin - 5, yPosition - 5, contentWidth + 10, 30, "F")
    addText("⚠ IMPORTANT DEADLINE", 14, true, [161, 98, 7])
    addSpace(3)
    const cleanDeadline = entryData.importantDeadline.replace(/<[^>]*>/g, "")
    addText(cleanDeadline, 10, false)
    addSpace(10)
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.text(
    `Generated by CarRegistrationGuide.com on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
    pageWidth / 2,
    footerY,
    { align: "center" },
  )

  // Generate PDF buffer
  const pdfBuffer = doc.output("arraybuffer")

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="Vehicle-Registration-Checklist-${fromState}-to-${toState}.pdf"`,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  })
}
