-- Create events table
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  bar_name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  event_details TEXT,
  event_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_bar_name ON events(bar_name);

-- Add RLS (Row Level Security) policies
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Allow SELECT for all users
CREATE POLICY "Allow SELECT on events" ON events
  FOR SELECT USING (true);

-- Allow INSERT for all users
CREATE POLICY "Allow INSERT on events" ON events
  FOR INSERT WITH CHECK (true);

-- Allow UPDATE for all users
CREATE POLICY "Allow UPDATE on events" ON events
  FOR UPDATE USING (true);

-- Allow DELETE for all users
CREATE POLICY "Allow DELETE on events" ON events
  FOR DELETE USING (true);

-- Insert some sample events (optional - remove if not needed)
INSERT INTO events (bar_name, slug, event_name, event_details, event_date) VALUES
('Rounders', 'rounders', 'Trivia Tuesday', 'Free shots for winning team, $2 beers all night', '2024-01-16'),
('Rounders', 'rounders', 'Karaoke Night', 'Half price cocktails, $1 shots during karaoke', '2024-01-18'),
('Innisfree', 'innisfree', 'Live Music Friday', 'Cover band performance, $3 drafts, $5 cocktails', '2024-01-19'),
('Innisfree', 'innisfree', 'Sunday Funday', 'Bottomless mimosas $15, $2 Bloody Marys', '2024-01-21'),
('Gallettes', 'gallettes', 'Game Day Special', '$1 shots when Alabama scores, $2 beers', '2024-01-20'),
('Gallettes', 'gallettes', 'Wine Wednesday', 'Half price wine bottles, $5 wine flights', '2024-01-17');
