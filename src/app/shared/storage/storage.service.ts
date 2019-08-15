import localforage from 'localforage';
import { injectable } from 'inversify-hooks';
import { IStorageService } from './istorage.service';

@injectable()
export class StorageService implements IStorageService {
  public async set<T>(item: T, id: string): Promise<void> {
    try {
      await localforage.setItem(id, item);
    } catch (e) {
      throw new Error(`Cannot save in localforage the item ${id} - ${item}`);
    }
  }

  public async get<T>(id: string): Promise<T> {
    try {
      const result = await localforage.getItem(id);
      return result as T;
    } catch (e) {
      throw new Error(`Cannot find in localforage the item ${id}`);
    }
  }

  public async iterate<T>(callback: (value?: any, key?: string) => any): Promise<T> {
    try {
      const result = await localforage.iterate(callback);
      return result as T;
    } catch (e) {
      throw new Error(`Cannot iterate in localforage`);
    }
  }
}
