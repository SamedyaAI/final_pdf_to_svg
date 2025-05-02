/*
  # Add Feedback Table

  1. New Tables
    - `feedback`
      - `id` (uuid, primary key): Feedback's unique identifier
      - `user_id` (uuid): Reference to users table
      - `visual_abstract_id` (uuid): Reference to visual_abstracts table
      - `rating` (integer): User rating (1-5)
      - `comment` (text): User's feedback comment
      - `created_at` (timestamp): Feedback submission timestamp

  2. Security
    - Enable RLS on feedback table
    - Add policies for:
      - Users can create feedback
      - Users can read their own feedback
      - Users can update their own feedback
      - Users can delete their own feedback
*/

CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  visual_abstract_id uuid REFERENCES visual_abstracts(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create security policies
CREATE POLICY "Users can create feedback"
  ON feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own feedback"
  ON feedback
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own feedback"
  ON feedback
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own feedback"
  ON feedback
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);