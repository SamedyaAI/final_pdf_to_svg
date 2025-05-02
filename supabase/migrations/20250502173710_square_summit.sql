/*
  # Update feedback table schema

  1. Changes
    - Remove deleted_at column
    - Add is_pre_generation column to distinguish template feedback
    
  2. Security
    - Update RLS policies for simpler public access
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS feedback CASCADE;

-- Create new feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visual_abstract_id uuid REFERENCES visual_abstracts(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  user_name text DEFAULT 'Anonymous',
  is_pre_generation boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create security policies for public access
CREATE POLICY "Anyone can create feedback"
  ON feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read feedback"
  ON feedback
  FOR SELECT
  TO anon
  USING (true);