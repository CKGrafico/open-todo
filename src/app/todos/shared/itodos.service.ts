import { Todo } from './todo.model';

export interface ITodosService {
  generate(value: string): Todo;
  load(): Promise<Todo[]>;
  add(todo: Todo): Promise<void>;
  done(todos: Todo[], todo: Todo): Promise<Todo[]>;
  remove(todos: Todo[], todo: Todo): Promise<Todo[]>;
}
