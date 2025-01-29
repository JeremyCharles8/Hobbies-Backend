export interface IComic {
  id: number;
  isbn: string;
  title: string;
  volume: number;
  serie: string;
  created_at: Date;
  updated_at?: Date;
};

export type CreateComic = Omit<IComic, 'id' | 'created_at' | 'updated_at'>;