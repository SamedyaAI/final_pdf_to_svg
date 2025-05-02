/*
  # Add deleted_at column for soft deletes

  1. Changes
    - Add `deleted_at` column to `feedback` table for soft delete functionality
    - Column is nullable timestamp with time zone
    - Default value is null (not deleted)

  2. Impact
    - Enables soft delete functionality for feedback entries
    - Maintains data integrity by not permanently deleting feedback
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'feedback' 
    AND column_name = 'deleted_at'
  ) THEN
    ALTER TABLE feedback 
    ADD COLUMN deleted_at timestamptz DEFAULT NULL;
  END IF;
END $$;