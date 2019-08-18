import { TodoState } from './todo-state.enum';

export interface TodoCollection {
    [id: number]: Todo;
}

export interface Todo {
  id: number;
  state: TodoState;
  value: string;
}
