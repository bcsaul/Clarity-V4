import { NextResponse } from "next/server"
import { initializeDatabase } from "@/lib/db/migrations"

export async function POST(request: Request) {
  try {
    await initializeDatabase()
    return NextResponse.json({ message: "Database initialized successfully" })
  } catch (error) {
    console.error("Failed to initialize database:", error)
    return NextResponse.json({ error: "Failed to initialize database" }, { status: 500 })
  }
}

