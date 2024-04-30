export declare enum SortType {
  ASC = 0,
  DESC = 1
}
export type SortConfig = Record<string, SortType | undefined>[];

export interface IRepository<T> {
  listarTodos(sort?: SortConfig): Promise<T[]>;
  listarTodosPorCondicional(condition: string | Record<string, unknown>, sort?: SortConfig): Promise<T[]>;
  buscarPorId(id: Record<string, unknown> | string | number): Promise<T>;
  salvarTodos(entities: T[]): Promise<void>;
  salvarOuAtualizarPorId(entity: T, id?: Record<string, unknown>): Promise<void>;
  existPorId(id: Record<string, unknown> | string | number): Promise<boolean>;
  totalizar(): Promise<number>;
  removerTodos(): Promise<void>;
  removerTodosPorCondicional(condition: string | Record<string, unknown>): Promise<void>;
  removerPorId(id: Record<string, unknown> | string | number): Promise<void>;
}
