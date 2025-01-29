-- Revert hobbies:00-init from pg

BEGIN;

DROP TABLE
  "user_board_game",
  "user_book",
  "user_comic",
  "board_game",
  "book",
  "comic",
  "user";

DROP DOMAIN 
  "email",
  "isbn";

COMMIT;
