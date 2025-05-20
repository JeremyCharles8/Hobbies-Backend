export interface IBook {
  id: number;
  isbn: string;
  title: string;
  volume: number;
  serie: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateBook = Omit<IBook, 'id' | 'created_at' | 'updated_at'>;

export type ProfileBookList = Omit<IBook, 'isbn' | 'createdAt'>;
