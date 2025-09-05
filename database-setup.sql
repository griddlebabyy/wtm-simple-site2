-- Clear existing tables if they exist
DROP TABLE IF EXISTS deals;
DROP TABLE IF EXISTS bar_info;

-- Create bar_info table
CREATE TABLE bar_info (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    location TEXT NOT NULL,
    address TEXT,
    instagram TEXT,
    img_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create deals table
CREATE TABLE deals (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    monday TEXT[],
    tuesday TEXT[],
    wednesday TEXT[],
    thursday TEXT[],
    friday TEXT[],
    saturday TEXT[],
    sunday TEXT[],
    everyday TEXT[],
    event TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_bar_info_location ON bar_info(location);
CREATE INDEX idx_bar_info_slug ON bar_info(slug);
CREATE INDEX idx_deals_slug ON deals(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE bar_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access
CREATE POLICY "Allow public read access to bar_info" ON bar_info
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to deals" ON deals
    FOR SELECT USING (true);

-- Create policies to allow public insert access for migration
CREATE POLICY "Allow public insert access to bar_info" ON bar_info
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert access to deals" ON deals
    FOR INSERT WITH CHECK (true);

-- Create policies to allow public update access
CREATE POLICY "Allow public update access to bar_info" ON bar_info
    FOR UPDATE USING (true);

CREATE POLICY "Allow public update access to deals" ON deals
    FOR UPDATE USING (true);

-- Create policies to allow public delete access
CREATE POLICY "Allow public delete access to bar_info" ON bar_info
    FOR DELETE USING (true);

CREATE POLICY "Allow public delete access to deals" ON deals
    FOR DELETE USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_bar_info_updated_at BEFORE UPDATE ON bar_info
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
