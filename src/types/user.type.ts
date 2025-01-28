import { IBoardGame } from './boardGame.type.ts';
import { IBook } from './book.type.ts';
import { IComic } from './comic.type.ts';

export interface IUser {
  id: number;
  nickname: string;
  email: string;
  password: string;
  repeatPassword?: string;
  refreshToken?: string;
  role: string;
  img?: string;
  book: IBook[];
  comic: IComic[];
  boardGame: IBoardGame[];
  created_at: Date;
  updated_at?: Date;
}

export type User = Omit<IUser, 'password' | 'repeatPassword'>;

export type CreateUser = Pick<
  IUser,
  'nickname' | 'email' | 'password' | 'repeatPassword'
>;

export type UpdateUser = Partial<
  Pick<
    IUser,
    'nickname' | 'email' | 'password' | 'repeatPassword' | 'refreshToken'
  >
>;

export type PublicUser = Omit<
  IUser,
  'email' | 'password' | 'created_at' | 'updated_at'
>;

export type LoginUser = Pick<IUser, 'id' | 'email' | 'password' | 'role'>;

export type LoginInput = Pick<IUser, 'email' | 'password'>;

export type AdminUser = Omit<IUser, 'book' | 'comic' | 'boardGame'>;

export type FindOneColumn = 'email' | 'nickname';

export type TokenInfo = Pick<IUser, 'id' | 'role'>;
