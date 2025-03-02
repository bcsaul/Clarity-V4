import { sql } from "@vercel/postgres"
import { v4 as uuidv4 } from "uuid"

export const db = {
  createStory: async ({ title, summary, imageUrl, category, publicationDate, readTime, facts, perspectives }) => {
    const storyId = uuidv4()

    try {
      // Begin transaction
      await sql`BEGIN`

      // Insert story
      await sql`
        INSERT INTO stories (
          id, title, summary, image_url, category, publication_date, read_time
        ) VALUES (
          ${storyId}, ${title}, ${summary}, ${imageUrl}, ${category}, ${publicationDate}, ${readTime}
        )
      `

      // Insert facts
      for (let i = 0; i < facts.length; i++) {
        await sql`
          INSERT INTO facts (story_id, fact, position)
          VALUES (${storyId}, ${facts[i]}, ${i})
        `
      }

      // Insert perspectives and their points
      for (const perspective of perspectives) {
        const perspectiveId = uuidv4()

        await sql`
          INSERT INTO perspectives (id, story_id, bias, source_name, source_url)
          VALUES (
            ${perspectiveId}, ${storyId}, ${perspective.bias}, 
            ${perspective.sourceName}, ${perspective.sourceUrl}
          )
        `

        for (let i = 0; i < perspective.points.length; i++) {
          await sql`
            INSERT INTO perspective_points (perspective_id, point, position)
            VALUES (${perspectiveId}, ${perspective.points[i]}, ${i})
          `
        }
      }

      // Commit transaction
      await sql`COMMIT`

      return { success: true, storyId }
    } catch (error) {
      // Rollback on error
      await sql`ROLLBACK`
      console.error("Failed to create story:", error)
      throw error
    }
  },

  getStoryByDate: async (date) => {
    try {
      const stories = await sql`
        SELECT 
          s.*,
          json_agg(DISTINCT f.*) as facts,
          json_agg(
            DISTINCT jsonb_build_object(
              'id', p.id,
              'bias', p.bias,
              'source_name', p.source_name,
              'source_url', p.source_url,
              'points', (
                SELECT json_agg(point ORDER BY position)
                FROM perspective_points pp
                WHERE pp.perspective_id = p.id
              )
            )
          ) as perspectives
        FROM stories s
        LEFT JOIN facts f ON f.story_id = s.id
        LEFT JOIN perspectives p ON p.story_id = s.id
        WHERE s.publication_date = ${date}
        GROUP BY s.id
      `

      return stories.rows
    } catch (error) {
      console.error("Failed to fetch stories:", error)
      throw error
    }
  },

  getStoryById: async (id) => {
    try {
      const stories = await sql`
        SELECT 
          s.*,
          json_agg(DISTINCT f.*) as facts,
          json_agg(
            DISTINCT jsonb_build_object(
              'id', p.id,
              'bias', p.bias,
              'source_name', p.source_name,
              'source_url', p.source_url,
              'points', (
                SELECT json_agg(point ORDER BY position)
                FROM perspective_points pp
                WHERE pp.perspective_id = p.id
              )
            )
          ) as perspectives
        FROM stories s
        LEFT JOIN facts f ON f.story_id = s.id
        LEFT JOIN perspectives p ON p.story_id = s.id
        WHERE s.id = ${id}
        GROUP BY s.id
      `

      return stories.rows[0]
    } catch (error) {
      console.error("Failed to fetch story:", error)
      throw error
    }
  },
}

