export interface IService<R, I, J, K> {
  findAll(): Promise<R[]>;
  findByPk(id: number): Promise<R | null>;
  create(input: I): Promise<void>;
  update(id: number, input: J): Promise<R>;
  delete(id: number): Promise<void>;
  Login?(input: K): Promise<void>;
  logout?(id: number): Promise<void>;
};
