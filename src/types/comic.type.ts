export interface IComic {
  id: number;
  isbn: string;
  title: string;
  volume: number;
  serie: string;
  type: string;
  createdAt: Date;
  updatedAt?: Date;
}

export type CreateComic = Omit<IComic, 'id' | 'created_at' | 'updated_at'>;

export type ProfileComicList = Omit<IComic, 'isbn' | 'createdAt'>;
