import { IStorageService, nextTick } from '~/app/shared';
import { ITodosService } from './itodos.service';
import { Todo, TodoCollection } from './todo.model';
import { injectable, inject } from 'inversify-hooks';
import { TodoState } from './todo-state.enum';

@injectable()
export class TodosService implements ITodosService {
  private storageKey = 'app_todos_';

  @inject() private storageService: IStorageService;

  constructor() {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    await nextTick();
    this.storageService.initialize(this.storageKey);
  }

  public generate(value: string): Todo {
    return {
      id: performance.now(),
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
    this.storageService.set<Todo>(todo, `${this.storageKey}${todo.id}`);
    // save in gist
  }

  public async done(todo: Todo): Promise<Todo> {
    const updatedTodo = { ...todo, state: TodoState.Done };
    this.storageService.set<Todo>(updatedTodo, `${this.storageKey}${todo.id}`);
    // save in gist

    return updatedTodo;
  }

  public async remove(todo: Todo): Promise<void> {
    // const updatedTodos = todos.filter(x => x.id !== todo.id);

    // // save in gist
    // await this.updateStorage(updatedTodos);
    // return updatedTodos;
  }

  private async loadFromStorage(): Promise<TodoCollection> {
    let todos: TodoCollection = {};
    await this.storageService.iterate<TodoCollection>((todo?: any, key?: string) => {
      if (key && !key.includes(this.storageKey)) {
        return;
      }

      todos[todo.id] = todo;
    });

    return todos;
  }

  private sortTodosById(todos: TodoCollection): TodoCollection {
    return todos;
  }
}
