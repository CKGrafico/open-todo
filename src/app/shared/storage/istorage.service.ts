export interface IStorageService<T> {
  initialize(name: string): void;
  set<T>(item: T, id: string): Promise<void>;
  get<T>(id: string): Promise<T>;
  remove(id: string): Promise<void>;
  getAll<T>(): Promise<T[]>;
}
