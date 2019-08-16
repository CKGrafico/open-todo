import localforage from 'localforage';
import { injectable } from 'inversify-hooks';
import { IStorageService } from './istorage.service';

@injectable()
export class StorageService<T> implements IStorageService<T> {
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

  public async remove(id: string): Promise<void> {
    this.checkInitialized();

    try {
      await this.storage.removeItem(id);
    } catch (e) {
      throw new Error(`Cannot remove in localforage the item ${id}`);
    }
  }

  public async getAll<T>(): Promise<T[]> {
    this.checkInitialized();

    try {
      let items: T[] = [];
      await this.storage.iterate((value: T) => {
        items.push(value);
      });

      return items;
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
