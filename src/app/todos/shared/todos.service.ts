import { IStorageService } from '~/app/shared';
import { ITodosService } from './itodos.service';
import { Todo } from './todo.model';
import { injectable, Inject } from 'inversify-hooks';
import { TodoState } from './todo-state.enum';

@injectable()
export class TodosService implements ITodosService {
  @Inject() private storageService!: IStorageService;

  private storageKey = 'app_todos';

  public generate(value: string): Todo {
    return {
      id: performance.now(),
      value,
      state: TodoState.Pending
    };
  }

  public async load(): Promise<Todo[]> {
    return await this.storageService.get<Todo[]>(this.storageKey);
    // get from gist
  }

  public async add(todo: Todo): Promise<void> {
    await this.addToStorage(todo);
    // save in gist
  }

  public async done(todos: Todo[], todo: Todo): Promise<Todo[]> {
    const updatedTodos = todos.map(x => {
      if (x.id === todo.id) {
        x.state = TodoState.Done;
      }

      return x;
    });

    // save in gist
    await this.updateStorage(updatedTodos);
    return updatedTodos;
  }

  public async remove(todos: Todo[], todo: Todo): Promise<Todo[]> {
    const updatedTodos = todos.filter(x => x.id !== todo.id);

    // save in gist
    await this.updateStorage(updatedTodos);
    return updatedTodos;
  }

  private async updateStorage(newTodos: Todo[]): Promise<void> {
    await this.storageService.set(newTodos, this.storageKey);
  }

  private async addToStorage(todo: Todo): Promise<void> {
    let updatedTodos = await this.storageService.get<Todo[]>(this.storageKey);
    updatedTodos = updatedTodos || [];
    updatedTodos.push(todo);

    await this.updateStorage(updatedTodos);
  }
}
