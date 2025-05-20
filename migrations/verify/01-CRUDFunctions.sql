-- Verify hobbies:01-CRUDFunctions on pg

BEGIN;

SELECT *
FROM pg_proc
WHERE proname IN (
  'select_user_by_pk',
  'select_user_by_email',
  'select_user_by_nickname',
  'isert_user',
  'update_user'
);

ROLLBACK;
