import { Todo, TodoCollection } from './todo.model';

export interface ITodosService {
  generate(value: string): Todo;
  load(): Promise<TodoCollection>;
  add(todo: Todo): Promise<void>;
  done(todo: Todo): Promise<Todo>;
  remove(todo: Todo): Promise<void>;
}
