/*
  # Update feedback table and policies
  
  1. Changes
    - Drop existing policies to avoid conflicts
    - Create feedback table with all columns
    - Add performance indexes
    - Enable RLS and create new policies
    
  2. Security
    - Enable RLS
    - Add policies for anonymous access to create and read feedback
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read feedback" ON public.feedback;
DROP POLICY IF EXISTS "Anyone can create feedback" ON public.feedback;

-- Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visual_abstract_id uuid REFERENCES public.visual_abstracts(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  user_name text DEFAULT 'Anonymous',
  created_at timestamptz DEFAULT now(),
  is_pre_generation boolean DEFAULT false,
  deleted_at timestamptz
);

-- Enable RLS
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read feedback"
  ON public.feedback
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create feedback"
  ON public.feedback
  FOR INSERT
  WITH CHECK (true);

-- Index for performance
CREATE INDEX IF NOT EXISTS feedback_rating_created_at_idx 
  ON public.feedback (rating DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS feedback_visual_abstract_id_idx 
  ON public.feedback (visual_abstract_id);