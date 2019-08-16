import { container } from 'inversify-hooks';
import { IStorageService, StorageService } from './app/shared';

// Remember to import children after parent
import { todosContainer } from './app/todos';

export function containerBuilder() {
  container.addTransient<IStorageService<any>>(StorageService);
  todosContainer();
}
