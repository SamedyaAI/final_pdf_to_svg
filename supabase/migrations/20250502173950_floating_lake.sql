/*
  # Create Visual Abstracts and Feedback Tables

  1. New Tables
    - `visual_abstracts`
      - `id` (uuid, primary key): Abstract's unique identifier
      - `title` (text): Title of the visual abstract
      - `template` (text): Template type used
      - `svg_content` (text): Generated SVG content
      - `pdf_url` (text): URL to original PDF
      - `created_at` (timestamp): Creation timestamp
      - `updated_at` (timestamp): Last update timestamp

    - `feedback`
      - `id` (uuid, primary key): Feedback's unique identifier
      - `visual_abstract_id` (uuid): Reference to visual_abstracts table
      - `rating` (integer): Rating from 1-5
      - `comment` (text): Optional feedback comment
      - `user_name` (text): Name of user giving feedback
      - `created_at` (timestamp): Feedback submission time

  2. Security
    - Enable RLS on both tables
    - Add policies for anonymous access
*/

-- Create visual_abstracts table first
CREATE TABLE IF NOT EXISTS visual_abstracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  template text NOT NULL,
  svg_content text NOT NULL,
  pdf_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on visual_abstracts
ALTER TABLE visual_abstracts ENABLE ROW LEVEL SECURITY;

-- Create policies for visual_abstracts
CREATE POLICY "Anyone can create visual abstracts"
  ON visual_abstracts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read visual abstracts"
  ON visual_abstracts
  FOR SELECT
  TO anon
  USING (true);

-- Create feedback table that references visual_abstracts
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visual_abstract_id uuid REFERENCES visual_abstracts(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  user_name text DEFAULT 'Anonymous',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on feedback
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for feedback
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