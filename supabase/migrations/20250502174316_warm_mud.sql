/*
  # Update feedback table to handle pre-generation feedback

  1. Changes
    - Add is_pre_generation column to feedback table
    - Remove deleted_at column references
    - Update policies and indexes
*/

-- Add is_pre_generation column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'feedback' AND column_name = 'is_pre_generation'
  ) THEN
    ALTER TABLE feedback ADD COLUMN is_pre_generation boolean DEFAULT false;
  END IF;
END $$;

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read feedback" ON feedback;
DROP POLICY IF EXISTS "Anyone can create feedback" ON feedback;

-- Create updated policies
CREATE POLICY "Anyone can read feedback"
  ON feedback
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can create feedback"
  ON feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create or update indexes
CREATE INDEX IF NOT EXISTS feedback_rating_created_at_idx 
  ON feedback (rating DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS feedback_visual_abstract_id_idx 
  ON feedback (visual_abstract_id);

CREATE INDEX IF NOT EXISTS feedback_is_pre_generation_idx 
  ON feedback (is_pre_generation);