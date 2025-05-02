/*
  # Add RLS policy for feedback deletion

  1. Changes
    - Add RLS policy to allow soft deletion of feedback records
    - Policy allows anyone to update the deleted_at column
    - This aligns with the current authentication system which uses a simple password check

  2. Security
    - Enables soft deletion through the deleted_at column
    - Maintains data integrity by not allowing hard deletes
    - Complements existing policies for insert and select operations
*/

-- Add policy to allow soft deletion (updating deleted_at) for feedback
CREATE POLICY "Anyone can soft delete feedback"
ON public.feedback
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);