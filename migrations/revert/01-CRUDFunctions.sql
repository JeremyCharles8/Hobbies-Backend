-- Revert hobbies:01-CRUDFunctions from pg

BEGIN;

DROP FUNCTION insert_user, select_user_by_email;

COMMIT;
