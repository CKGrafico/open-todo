import { IStorageService, nextTick } from '~/app/shared';
import { ITodosService } from './itodos.service';
import { Todo, TodoCollection } from './todo.model';
import { injectable, inject } from 'inversify-hooks';
import { TodoState } from './todo-state.enum';

@injectable()
export class TodosService implements ITodosService {
  private storageKey = 'app_todos_';

  @inject() private storageService: IStorageService<Todo>;

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    await nextTick();
    this.storageService.initialize(this.storageKey);
  }

  public generate(value: string): Todo {
    return {
      id: Date.now(),
      value,
      state: TodoState.Pending
    };
  }

  public async load(): Promise<TodoCollection> {
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
