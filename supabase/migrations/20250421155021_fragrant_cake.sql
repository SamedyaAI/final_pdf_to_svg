/*
  # Update visual abstracts table for anonymous access
  
  1. Changes
    - Remove user_id requirement from visual_abstracts table
    - Update RLS policies to allow anonymous access
  
  2. Security
    - Enable RLS
    - Add policies for anonymous access to create and read visual abstracts
*/

-- Modify visual_abstracts table to make user_id optional
ALTER TABLE visual_abstracts ALTER COLUMN user_id DROP NOT NULL;

-- Drop existing RLS policies
DROP POLICY IF EXISTS "Users can read own visual abstracts" ON visual_abstracts;
DROP POLICY IF EXISTS "Users can create visual abstracts" ON visual_abstracts;
DROP POLICY IF EXISTS "Users can update own visual abstracts" ON visual_abstracts;
DROP POLICY IF EXISTS "Users can delete own visual abstracts" ON visual_abstracts;

-- Create new RLS policies for anonymous access
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