import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Download form API called")

    const { searchParams } = new URL(request.url)
    const formPath = searchParams.get("url")
    const action = searchParams.get("action") || "view"

    console.log("[v0] Request:", { formPath, action })

    if (!formPath) {
      return NextResponse.json({ error: "Missing form path" }, { status: 400 })
    }

    // Clean the path to ensure it starts with /forms/
    let cleanPath = formPath.trim()
    if (!cleanPath.startsWith("/forms/")) {
      if (cleanPath.startsWith("forms/")) {
        cleanPath = "/" + cleanPath
      } else if (cleanPath.startsWith("/")) {
        cleanPath = "/forms" + cleanPath
      } else {
        cleanPath = "/forms/" + cleanPath
      }
    }

    console.log("[v0] Redirecting to:", cleanPath)

    // Simple redirect to the static file
    return NextResponse.redirect(new URL(cleanPath, request.url))
  } catch (error: any) {
    console.error("[v0] API Error:", error?.message)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
