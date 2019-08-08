import { ITodosService } from './itodos.service';
import { Todo } from './todo.model';
import { injectable } from 'inversify-hooks';

@injectable()
export class TodosService implements ITodosService {
  get(): Promise<Todo[]> {
    throw new Error('Method not implemented.');
  }

  add(todo: Todo): Promise<void> {
    throw new Error('Method not implemented.');
  }


}
