import localforage from 'localforage';
import { injectable } from 'inversify-hooks';
import { IStorageService } from './istorage.service';

@injectable()
export class StorageService implements IStorageService {
  private storage: LocalForage;

  public initialize(name: string): void {
    this.storage = localforage.createInstance({ name });
  }

  public async set<T>(item: T, id: string): Promise<void> {
    this.checkInitialized();

    try {
      await this.storage.setItem(id, item);
    } catch (e) {
      throw new Error(`Cannot save in localforage the item ${id} - ${item}`);
    }
  }

  public async get<T>(id: string): Promise<T> {
    this.checkInitialized();

    try {
      const result = await this.storage.getItem(id);
      return result as T;
    } catch (e) {
      throw new Error(`Cannot find in localforage the item ${id}`);
    }
  }

  public async iterate<T>(callback: (value?: any, key?: string) => any): Promise<T> {
    this.checkInitialized();

    try {
      const result = await this.storage.iterate(callback);
      return result as T;
    } catch (e) {
      throw new Error(`Cannot iterate in localforage`);
    }
  }

  private checkInitialized(): void {
    if (!this.storage) {
      throw new Error('You must call to initialize method first.');
    }
  }
}
