/*
  # Allow null visual_abstract_id in feedback table
  
  1. Changes
    - Make visual_abstract_id column nullable in feedback table
    - This allows general feedback about the application
  
  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE feedback ALTER COLUMN visual_abstract_id DROP NOT NULL;