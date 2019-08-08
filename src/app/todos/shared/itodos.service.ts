import { Todo } from './todo.model';

export interface ITodosService {
  get(): Promise<Todo[]>;
  add(todo: Todo): Promise<void>;
}
