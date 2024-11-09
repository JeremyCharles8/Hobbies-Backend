-- Verify hobbies:01-CRUDFunctions on pg

BEGIN;

SELECT *
FROM pg_proc
WHERE proname IN (
  'select_user',
  'select_user_by_email'
);

ROLLBACK;
