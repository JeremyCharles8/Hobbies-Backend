export interface IBoardGame {
  id: number;
  title: string;
  created_at: Date;
  updated_at: Date;
};

export type createBoardGame = Pick<IBoardGame, 'title'>;