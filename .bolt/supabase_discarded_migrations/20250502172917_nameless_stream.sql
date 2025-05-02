/*
  # Add pre-generation feedback flag

  1. Changes
    - Add is_pre_generation column to feedback table
    - Set default value to false
    - Update existing records to have false for is_pre_generation
*/

ALTER TABLE feedback ADD COLUMN is_pre_generation boolean DEFAULT false;
UPDATE feedback SET is_pre_generation = false WHERE is_pre_generation IS NULL;