export interface IService<R, I, J, K> {
  getAll(): Promise<R[]>;
  getOne<T extends R | Partial<R> | null>(id: number): Promise<T>;
  create(input: I): Promise<void>;
  update(id: number, input: J): Promise<R>;
  delete(id: number): Promise<void>;
  Login?(input: K): Promise<void>;
  logout?(id: number): Promise<void>;
};
