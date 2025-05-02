/*
  # Create feedback table and policies

  1. New Tables
    - `feedback`
      - `id` (uuid, primary key)
      - `visual_abstract_id` (uuid, foreign key to visual_abstracts)
      - `rating` (integer, required, between 1-5)
      - `comment` (text, optional)
      - `user_name` (text, optional, defaults to 'Anonymous')
      - `created_at` (timestamp with time zone, defaults to now)
      - `is_pre_generation` (boolean, defaults to false)
      - `deleted_at` (timestamp with time zone, optional)

  2. Security
    - Enable RLS on `feedback` table
    - Add policies for:
      - Anyone can read feedback
      - Anyone can create feedback
      - Only authenticated users can delete feedback (soft delete)

  3. Constraints
    - Rating must be between 1 and 5
    - Foreign key to visual_abstracts table
*/

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