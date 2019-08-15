import { container } from 'inversify-hooks';
import { IStorageService, StorageService } from './app/shared';

// Remember to import children after parent
import { todosContainer } from './app/todos';

export function containerBuilder() {
  container.addSingleton<IStorageService>(StorageService);
  todosContainer();
}
