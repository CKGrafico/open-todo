import { container } from 'inversify-props';
import { ITodosService, TodosService } from './shared';

export function todosContainer() {
  container.addSingleton<ITodosService>(TodosService);
}
