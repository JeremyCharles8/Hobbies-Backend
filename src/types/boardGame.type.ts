export interface IBoardGame {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type CreateBoardGame = Pick<IBoardGame, 'title'>;

export type ProfileBoardGameList = Omit<IBoardGame, 'createdAt'>;
