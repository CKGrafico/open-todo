import { TodoCollection, Todo } from '~/app/shared';

export interface ITodosService {
  generate(value: string): Todo;
  load(): Promise<TodoCollection>;
  add(todo: Todo): Promise<void>;
  done(todo: Todo): Promise<Todo>;
  remove(todo: Todo): Promise<void>;
}
