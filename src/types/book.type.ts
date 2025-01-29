export interface IBook {
  id: number;
  isbn: string;
  title: string;
  volume: number;
  serie: string;
  created_at: Date;
  updated_at: Date;
};

export type CreateBook = Omit<IBook, 'id' | 'created_at' | 'updated_at'>;