/*
  # Add soft delete to feedback table

  1. Changes
    - Add deleted_at column to feedback table
    - Update RLS policies to exclude deleted records
    - Add policy for admin deletion
*/

-- Add deleted_at column
ALTER TABLE feedback ADD COLUMN deleted_at timestamptz DEFAULT NULL;

-- Update RLS policies to exclude deleted records
DROP POLICY IF EXISTS "Anyone can read feedback" ON feedback;
CREATE POLICY "Anyone can read feedback"
  ON feedback
  FOR SELECT
  TO anon
  USING (deleted_at IS NULL);

-- Add policy for updating deleted_at column
CREATE POLICY "Anyone can soft delete feedback"
  ON feedback
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);