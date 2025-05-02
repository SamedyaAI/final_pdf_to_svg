/*
  # Update feedback table policies for soft delete

  1. Changes
    - Add policies for soft delete functionality
    - Update read policy to exclude deleted records
    - Add policy for updating deleted_at column
*/

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