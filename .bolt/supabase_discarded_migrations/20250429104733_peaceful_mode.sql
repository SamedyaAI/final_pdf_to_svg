/*
  # Delete all feedback records (soft delete)
  
  1. Changes
    - Set deleted_at timestamp for all existing feedback records
    
  2. Safety
    - Uses soft delete instead of permanent deletion
    - Preserves data for potential recovery if needed
*/

UPDATE feedback 
SET deleted_at = CURRENT_TIMESTAMP 
WHERE deleted_at IS NULL;