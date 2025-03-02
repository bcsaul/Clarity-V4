import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { data: story, error } = await supabase
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
      .eq("id", params.id)
      .single()

    if (error) throw error
    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 })
    }

    return NextResponse.json({ story })
  } catch (error) {
    console.error("Failed to fetch story:", error)
    return NextResponse.json({ error: "Failed to fetch story" }, { status: 500 })
  }
}

