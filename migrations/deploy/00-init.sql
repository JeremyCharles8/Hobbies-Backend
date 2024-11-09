
BEGIN;

CREATE DOMAIN "email" AS text
CHECK(value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])');

CREATE DOMAIN "isbn" AS text
CHECK(value ~'^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$');

CREATE TABLE "user" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "nickname" text NOT NULL UNIQUE,
  "email" email NOT NULL UNIQUE,
  "role" text NOT NULL DEFAULT 'user',
  "password" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "comic" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "isbn" isbn NOT NULL UNIQUE,
  "title" text NOT NULL,
  "volume" int,
  "serie" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "book" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "isbn" isbn NOT NULL UNIQUE,
  "title" text NOT NULL,
  "volume" int,
  "serie" text NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "board_game" (
  "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "title" text NOT NULL UNIQUE,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz
);

CREATE TABLE "user_comic"(
  "user_id" int NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  "comic_id" int NOT NULL REFERENCES "comic" ("id") ON DELETE CASCADE,
  PRIMARY KEY (user_id, comic_id),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz  
);

CREATE TABLE "user_book"(
  "user_id" int NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  "book_id" int NOT NULL REFERENCES "book" ("id") ON DELETE CASCADE,
  PRIMARY KEY (user_id, book_id),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz  
);

CREATE TABLE "user_board_game"(
  "user_id" int NOT NULL REFERENCES "user" ("id") ON DELETE CASCADE,
  "board_game_id" int NOT NULL REFERENCES "board_game" ("id") ON DELETE CASCADE,
  PRIMARY KEY (user_id, board_game_id),
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz  
);

COMMIT;
