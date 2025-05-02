/*
  # Delete all feedback records
  
  1. Changes
    - Permanently delete all records from the feedback table
    
  2. Security
    - No additional security changes needed
    - Existing RLS policies remain in place
*/

-- Delete all records from the feedback table
DELETE FROM feedback;