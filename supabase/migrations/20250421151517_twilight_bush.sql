/*
  # Initial Schema Setup for Visual Abstract Application

  1. New Tables
    - `users`
      - `id` (uuid, primary key): User's unique identifier
      - `email` (text): User's email address
      - `created_at` (timestamp): Account creation timestamp
      
    - `visual_abstracts`
      - `id` (uuid, primary key): Abstract's unique identifier
      - `user_id` (uuid): Reference to users table
      - `title` (text): Title of the visual abstract
      - `template` (text): Template type used
      - `svg_content` (text): Generated SVG content
      - `pdf_url` (text): URL to original PDF
      - `created_at` (timestamp): Creation timestamp
      - `updated_at` (timestamp): Last update timestamp

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to:
      - Read their own data
      - Create new visual abstracts
      - Update their own visual abstracts
      - Delete their own visual abstracts

  3. Functions
    - Add function to automatically update updated_at timestamp
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create visual_abstracts table
CREATE TABLE IF NOT EXISTS visual_abstracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  template text NOT NULL,
  svg_content text NOT NULL,
  pdf_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create updated_at timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for visual_abstracts
CREATE TRIGGER update_visual_abstracts_updated_at
  BEFORE UPDATE ON visual_abstracts
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE visual_abstracts ENABLE ROW LEVEL SECURITY;

-- Create security policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create security policies for visual_abstracts table
CREATE POLICY "Users can read own visual abstracts"
  ON visual_abstracts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create visual abstracts"
  ON visual_abstracts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own visual abstracts"
  ON visual_abstracts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own visual abstracts"
  ON visual_abstracts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);