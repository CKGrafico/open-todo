import { ITodosService } from './itodos.service';
import { Todo } from './todo.model';
import { injectable, Inject } from 'inversify-hooks';
import { TodoState } from './todo-state.enum';
import { IStorageService } from '~/app/shared';

@injectable()
export class TodosService implements ITodosService {
  @Inject() storageService!: IStorageService;

  private storageKey = 'app_todos';

  public generate(value: string): Todo {
    return {
      id: performance.now(),
      value,
      state: TodoState.Pending
    };
  }

  public async add(todo: Todo): Promise<void> {
    debugger;
    await this.addToStorage(todo);
    // save in gist
  }

  private async addToStorage(todo: Todo): Promise<void> {
    debugger;
    let cachedTodos = await this.storageService.get<Todo[]>(this.storageKey);
    cachedTodos = cachedTodos || [];
    cachedTodos.push(todo);

    await this.storageService.set(cachedTodos, this.storageKey);
  }
}
