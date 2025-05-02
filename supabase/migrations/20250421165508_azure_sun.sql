/*
  # Add user_name column to feedback table

  1. Changes
    - Add user_name column to feedback table
    - Set default value to 'Anonymous'
*/

ALTER TABLE feedback ADD COLUMN user_name text DEFAULT 'Anonymous';