-- Create schema for stories
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  publication_date DATE NOT NULL,
  read_time TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create schema for facts
CREATE TABLE facts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  fact TEXT NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create schema for perspectives
CREATE TABLE perspectives (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  bias TEXT NOT NULL CHECK (bias IN ('left', 'center', 'right')),
  source_name TEXT NOT NULL,
  source_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create schema for perspective points
CREATE TABLE perspective_points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  perspective_id UUID NOT NULL REFERENCES perspectives(id) ON DELETE CASCADE,
  point TEXT NOT NULL,
  position INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create schema for saved stories
CREATE TABLE saved_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, story_id)
);

-- Create indexes
CREATE INDEX stories_publication_date_idx ON stories(publication_date);
CREATE INDEX perspectives_story_id_idx ON perspectives(story_id);
CREATE INDEX perspective_points_perspective_id_idx ON perspective_points(perspective_id);
CREATE INDEX saved_stories_user_id_idx ON saved_stories(user_id);

-- Create RLS policies
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE facts ENABLE ROW LEVEL SECURITY;
ALTER TABLE perspectives ENABLE ROW LEVEL SECURITY;
ALTER TABLE perspective_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_stories ENABLE ROW LEVEL SECURITY;

-- Stories policies
CREATE POLICY "Stories are viewable by everyone" ON stories
  FOR SELECT USING (true);

-- Facts policies
CREATE POLICY "Facts are viewable by everyone" ON facts
  FOR SELECT USING (true);

-- Perspectives policies
CREATE POLICY "Perspectives are viewable by everyone" ON perspectives
  FOR SELECT USING (true);

-- Perspective points policies
CREATE POLICY "Perspective points are viewable by everyone" ON perspective_points
  FOR SELECT USING (true);

-- Saved stories policies
CREATE POLICY "Users can view their own saved stories" ON saved_stories
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can save stories" ON saved_stories
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave stories" ON saved_stories
  FOR DELETE USING (auth.uid() = user_id);

