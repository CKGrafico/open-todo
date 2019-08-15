import { container } from 'inversify-hooks';
import { ITodosService, TodosService } from './shared';

export function todosContainer() {
  container.addSingleton<ITodosService>(TodosService);
}
