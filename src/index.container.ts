import { container } from 'inversify-hooks';
import { IStorageService, StorageService, IGistService, GistService } from './app/shared';

// Remember to import children after parent
import { todosContainer } from './app/todos';

export function containerBuilder() {
  container.addTransient<IStorageService<any>>(StorageService);
  container.addSingleton<IGistService>(GistService);
  todosContainer();
}
