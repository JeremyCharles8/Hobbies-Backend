-- Revert hobbies:01-CRUDFunctions from pg

BEGIN;

DROP FUNCTION IF EXISTS
  "update_user" (int, json), 
  "insert_user" (json), 
  "select_user_by_nickname" (text), 
  "select_user_by_email" (text);

COMMIT;
