export interface IStorageService {
  initialize(name: string): void;
  set<T>(item: T, id: string): Promise<void>;
  get<T>(id: string): Promise<T>;
  iterate<T>(callback: (value?: any, key?: string) => any): Promise<T>;
}
