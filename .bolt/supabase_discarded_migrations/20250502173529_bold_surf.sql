/*
  # Create feedback table
  
  1. New Tables
    - `feedback`
      - `id` (uuid, primary key): Feedback's unique identifier
      - `visual_abstract_id` (uuid): Reference to visual_abstracts table
      - `rating` (integer): User rating (1-5)
      - `comment` (text): User's feedback comment
      - `user_name` (text): Name of the user giving feedback
      - `created_at` (timestamp): Feedback submission timestamp
      - `deleted_at` (timestamp): Soft delete timestamp
*/

-- Drop existing feedback table if it exists
DROP TABLE IF EXISTS feedback CASCADE;

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visual_abstract_id uuid REFERENCES visual_abstracts(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  user_name text DEFAULT 'Anonymous',
  created_at timestamptz DEFAULT now(),
  deleted_at timestamptz DEFAULT NULL
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create security policies for anonymous access
CREATE POLICY "Anyone can create feedback"
  ON feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read feedback"
  ON feedback
  FOR SELECT
  TO anon
  USING (deleted_at IS NULL);

CREATE POLICY "Anyone can soft delete feedback"
  ON feedback
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);