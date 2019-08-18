import { IStorageService, Todo, TodoState, TodoCollection } from '~/app/shared';
import { ITodosService } from './itodos.service';
import { injectable, inject } from 'inversify-hooks';

@injectable()
export class TodosService implements ITodosService {
  @inject() private storageService: IStorageService<Todo>;

  public generate(value: string): Todo {
    return {
      id: Date.now(),
      value,
      state: TodoState.Pending
    };
  }

  public async load(): Promise<TodoCollection> {
    this.storageService.initialize('todos');
    const todos = await this.loadFromStorage();
    const sorted = this.sortTodosById(todos);
    // get from gist
    return sorted;
  }

  public async add(todo: Todo): Promise<void> {
    await this.storageService.set(todo, `${todo.id}`);
    // save in gist
  }

  public async done(todo: Todo): Promise<Todo> {
    const updatedTodo = { ...todo, state: TodoState.Done };
    await this.storageService.set(updatedTodo, `${todo.id}`);
    // save in gist

    return updatedTodo;
  }

  public async remove(todo: Todo): Promise<void> {
    await this.storageService.remove(`${todo.id}`);
    // save in gist
  }

  private async loadFromStorage(): Promise<TodoCollection> {
    let collection: TodoCollection = {};
    const list: Todo[] = await this.storageService.getAll();

    list.forEach((todo: Todo) => {
      if (!todo.id) {
        return;
      }

      collection[todo.id] = todo;
    });

    return collection;
  }

  private sortTodosById(todos: TodoCollection): TodoCollection {
    return todos;
  }
}
