import { todosContainer } from './app/todos';
import { container } from 'inversify-props';
import { IStorageService, StorageService } from './app/shared';

export function containerBuilder() {
  container.addSingleton<IStorageService>(StorageService);
  todosContainer();
}
