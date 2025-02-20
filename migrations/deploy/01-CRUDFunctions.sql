-- Deploy hobbies:01-CRUDFunctions to pg

BEGIN;

CREATE FUNCTION "select_user_by_pk" (id int) RETURNS JSON AS $$

  SELECT
    json_build_object (
      'nickname', "nickname",
      'email', "email",
      'img', "img_url",
      'createdAt', "created_at",
      'updatedAt', "updated_at",
      'book', (
        SELECT 
          COALESCE(
            json_agg(
              json_build_object(
              'id', "id",
              'title', "title",
              'volume', "volume",
              'serie', "serie",
              'type', "type"
              )
            ), '[]'::json
          )
        FROM "book"
        JOIN "user_book" ON "user_book"."book_id" = "book"."id"
        WHERE "user_book"."user_id" = "user"."id"
      ),
      'comic', (
        SELECT 
          COALESCE(
            json_agg(
              json_build_object(
              'id', "id",
              'title', "title",
              'volume', "volume",
              'serie', "serie",
              'type', "type"
              )
            ), '[]'::json
          )
        FROM "comic"
        JOIN "user_comic" ON "user_comic"."comic_id" = "comic"."id"
        WHERE "user_comic"."user_id" = "user"."id"
      ),
      'boardGame', (
        SELECT 
          COALESCE(
            json_agg(
              json_build_object(
              'id', "id",
              'title', "title"
              )
            ), '[]'::json
          )
        FROM "board_game"
        JOIN "user_board_game" ON "user_board_game"."board_game_id" = "board_game"."id"
        WHERE "user_board_game"."user_id" = "user"."id"
      )
    )
  FROM "user"
  WHERE "id" = $1::int;
$$ LANGUAGE SQL STRICT;

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
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "select_user_by_nickname" (input text) RETURNS JSON AS $$

  SELECT
    json_build_object(
      'id', "id",
      'nickname', "nickname",
      'email', "email"
    )
  FROM "user"
  WHERE "nickname" = $1::text;
$$ LANGUAGE SQL STRICT;


CREATE FUNCTION "insert_user" (input json) RETURNS VOID AS $$

  INSERT INTO "user" (
    "nickname",
    "email",
    "password"
  ) VALUES (
    ($1->>'nickname')::text,
    ($1->>'email')::text,
    ($1->>'password')::text
  );
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION "update_user" (id int, input json) RETURNS VOID AS $$

  UPDATE "user" SET
    "email" = COALESCE(($2->>'email')::text, "email"),
    "password" = COALESCE(($2->>'password')::text, "password"),
    "img_url" = COALESCE(($2->>'imgUrl')::text, "img_url"),
    "refresh_token" = COALESCE(($2->>'refreshToken')::text, "refresh_token"),
    "updated_at" = now()
  WHERE "id" = $1::int;
$$ LANGUAGE SQL STRICT;

COMMIT;
