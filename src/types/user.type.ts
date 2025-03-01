import { ProfileBoardGameList } from './boardGame.type.ts';
import { ProfileBookList } from './book.type.ts';
import { ProfileComicList } from './comic.type.ts';

export interface IUser {
  id: number;
  nickname: string;
  email: string;
  password: string;
  repeatPassword?: string;
  refreshToken?: string | null;
  role: string;
  img?: string;
  book: ProfileBookList[];
  comic: ProfileComicList[];
  boardGame: ProfileBoardGameList[];
  createdAt: Date;
  updatedAt?: Date;
}

export type UserPersonalData = Pick<
  IUser,
  'nickname' | 'email' | 'createdAt' | 'updatedAt'
>;

export type User = Omit<
  IUser,
  'password' | 'repeatPassword' | 'refreshToken' | 'role'
>;

export type CreateUser = Pick<
  IUser,
  'nickname' | 'email' | 'password' | 'repeatPassword'
>;

export type UpdateUser = Partial<
  Pick<
    IUser,
    | 'nickname'
    | 'email'
    | 'password'
    | 'repeatPassword'
    | 'refreshToken'
    | 'img'
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
