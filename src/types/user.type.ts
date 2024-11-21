import { IBoardGame } from "./boardGame.type.ts";
import { IBook } from "./book.type.ts";
import { IComic } from "./comic.type.ts";

export interface IUser {
  id: number;
  nickname: string;
  email: string;
  password: string;
  repeatPassword?: string;
  role: number;
  img?: string; 
  book: IBook[];
  comic: IComic[];
  boardGame: IBoardGame[];
  created_at: Date;
  updated_at?: Date;
};

export type User = Omit<IUser, 'password' | 'repeatPassword'>;

export type CreateUser = Pick<IUser, 'nickname' | 'email' | 'password' | 'repeatPassword'>;

export type UpdateUser = Partial<Pick<IUser, 'nickname' | 'email' | 'password' | 'repeatPassword'>>;

export type PublicUser = Omit<IUser, 'email' | 'password' | 'created_at' | 'updated_at'>;

export type LoginUser = Pick<IUser, 'id' | 'email' | 'password'>;

export type AdminUser = Omit<IUser, 'book' | 'comic' | 'boardGame'>;

export type FindOneColumn = 'email' | 'nickname';
