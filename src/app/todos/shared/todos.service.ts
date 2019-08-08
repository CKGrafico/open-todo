import { ITodosService } from './itodos.service';
import { Todo } from './todo.model';
import { injectable } from 'inversify-hooks';
import { TodoState } from './todo-state.enum';

@injectable()
export class TodosService implements ITodosService {
  generate(value: string): Todo {
    return {
      id: performance.now(),
      value,
      state: TodoState.Pending
    };
  }

  add(todo: Todo): Promise<void> {
    // save in localstorae
    // save in gist
    return Promise.resolve();
  }
}
