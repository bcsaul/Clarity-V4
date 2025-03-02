import { sql } from "@vercel/postgres"

export async function initializeDatabase() {
  try {
    // Create UUID extension if it doesn't exist
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        subscription_status TEXT NOT NULL DEFAULT 'free',
        subscription_expires_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create stories table
    await sql`
      CREATE TABLE IF NOT EXISTS stories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title TEXT NOT NULL,
        summary TEXT NOT NULL,
        image_url TEXT,
        category TEXT NOT NULL,
        publication_date DATE NOT NULL,
        read_time TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create facts table
    await sql`
      CREATE TABLE IF NOT EXISTS facts (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
        fact TEXT NOT NULL,
        position INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create perspectives table
    await sql`
      CREATE TABLE IF NOT EXISTS perspectives (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
        bias TEXT NOT NULL,
        source_name TEXT NOT NULL,
        source_url TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create perspective points table
    await sql`
      CREATE TABLE IF NOT EXISTS perspective_points (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        perspective_id UUID NOT NULL REFERENCES perspectives(id) ON DELETE CASCADE,
        point TEXT NOT NULL,
        position INTEGER NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create saved stories table
    await sql`
      CREATE TABLE IF NOT EXISTS saved_stories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, story_id)
      )
    `

    // Create indexes
    await sql`CREATE INDEX IF NOT EXISTS stories_publication_date_idx ON stories(publication_date)`
    await sql`CREATE INDEX IF NOT EXISTS perspectives_story_id_idx ON perspectives(story_id)`
    await sql`CREATE INDEX IF NOT EXISTS perspective_points_perspective_id_idx ON perspective_points(perspective_id)`
    await sql`CREATE INDEX IF NOT EXISTS saved_stories_user_id_idx ON saved_stories(user_id)`

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Failed to initialize database:", error)
    throw error
  }
}

