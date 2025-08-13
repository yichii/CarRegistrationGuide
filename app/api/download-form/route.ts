import { type NextRequest, NextResponse } from "next/server"
import path from "path"
import { promises as fs } from "fs"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const formPath = searchParams.get("url") // This will now be a local path like /forms/texas-form-130u.pdf
  const fileName = searchParams.get("fileName") || "document.pdf"

  if (!formPath) {
    console.error("Download form API: Missing form path in request.")
    return NextResponse.json({ error: "Missing form path" }, { status: 400 })
  }

  // Construct the absolute file system path to the public asset
  // process.cwd() gives the root of the Next.js project
  const absolutePath = path.join(process.cwd(), "public", formPath)

  console.log(`Attempting to serve local form from: ${absolutePath}`)

  try {
    const fileBuffer = await fs.readFile(absolutePath)

    // Determine content type based on file extension, default to application/octet-stream
    const ext = path.extname(formPath).toLowerCase()
    let contentType = "application/octet-stream"
    if (ext === ".pdf") {
      contentType = "application/pdf"
    } else if (ext === ".doc" || ext === ".docx") {
      contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    }
    // Add more content types as needed for other file types

    const headers = new Headers()
    headers.set("Content-Disposition", `attachment; filename="${fileName}"`)
    headers.set("Content-Type", contentType)
    headers.set("Content-Length", fileBuffer.length.toString())

    console.log(`Successfully served local form: ${fileName} (${contentType}).`)
    return new NextResponse(fileBuffer, { headers })
  } catch (error: any) {
    if (error.code === "ENOENT") {
      console.error(`File not found at ${absolutePath}:`, error.message)
      return NextResponse.json({ error: `Form file not found: ${fileName}` }, { status: 404 })
    }
    console.error(`Error serving local form from ${absolutePath}:`, error.message || error)
    return NextResponse.json(
      { error: `Internal server error serving form: ${error.message || "Unknown error"}` },
      { status: 500 },
    )
  }
}
