-- Verify hobbies:00-init on pg

BEGIN;

SELECT *
FROM information_schema.domains
WHERE domain_name = 'email';

SELECT *
FROM information_schema.domains
WHERE domain_name = 'isbn';

SELECT *
FROM "user", "comic", "book", "board_game", "user_comic", "user_book", "user_board_game"
WHERE false;

ROLLBACK;
