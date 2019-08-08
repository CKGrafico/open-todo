import { TodoState } from './todo-state.enum';

export interface Todo {
  id: number;
  state: TodoState;
  value: string;
}
