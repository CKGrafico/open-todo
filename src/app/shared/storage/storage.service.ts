import localforage from 'localforage';
import { IStorageService } from './istorage.service';

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
}
