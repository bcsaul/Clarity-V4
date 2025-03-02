import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const dateStr = searchParams.get("date")

  if (!dateStr) {
    return NextResponse.json({ error: "Date parameter is required" }, { status: 400 })
  }

  try {
    const { data: stories, error } = await supabase
      .from("stories")
      .select(`
        *,
        facts (
          fact,
          position
        ),
        perspectives (
          bias,
          source_name,
          source_url,
          perspective_points (
            point,
            position
          )
        )
      `)
      .eq("publication_date", dateStr)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json({ stories })
  } catch (error) {
    console.error("Failed to fetch stories:", error)
    return NextResponse.json({ error: "Failed to fetch stories" }, { status: 500 })
  }
}

