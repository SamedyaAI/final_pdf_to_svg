/*
  # Add pre-generation feedback support
  
  1. Changes
    - Add is_pre_generation column to feedback table
    - Add index for is_pre_generation column
    - Drop and recreate feedback table if needed
    - Add performance indexes
*/

-- Drop existing policies first
DROP POLICY IF EXISTS "Anyone can read feedback" ON public.feedback;
DROP POLICY IF EXISTS "Anyone can create feedback" ON public.feedback;

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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS feedback_rating_created_at_idx 
  ON public.feedback (rating DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS feedback_visual_abstract_id_idx 
  ON public.feedback (visual_abstract_id);

CREATE INDEX IF NOT EXISTS feedback_is_pre_generation_idx 
  ON public.feedback (is_pre_generation);

-- Recreate policies
CREATE POLICY "Anyone can read feedback"
  ON public.feedback
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can create feedback"
  ON public.feedback
  FOR INSERT
  TO anon
  WITH CHECK (true);