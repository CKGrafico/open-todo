import { Todo } from './todo.model';

export interface ITodosService {
  generate(value: string): Todo;
  add(todo: Todo): Promise<void>;
  // load(): Promise<Todo[]>;
}
