-- Deploy hobbies:01-CRUDFunctions to pg

BEGIN;

CREATE FUNCTION "select_user_by_email" (input text) RETURNS JSON AS $$

  SELECT
    json_build_object (
      'id', "id",
      'nickname', "nickname",
      'email', "email",
      'password', "password"
    )
  FROM "user"
  WHERE "email" = $1::text;
$$ LANGUAGE SQL STRICT

CREATE FUNCTION "select_user_by_nickname" (input text) RETURNS BOOLEAN AS $$

  SELECT EXISTS (
    SELECT null
    FROM "user"
    WHERE "nickname" = $1::text
  );
$$ LANGUAGE SQL STRICT


CREATE FUNCTION "insert_user" (input json) RETURNS VOID AS $$

  INSERT INTO "user" (
    "nickname",
    "email",
    "password"
  ) VALUES (
    ($1->>'nickname')::text,
    ($1->>'email')::text,
    ($1->>'password')::text,
  );
$$ LANGUAGE SQL STRICT;

COMMIT;
