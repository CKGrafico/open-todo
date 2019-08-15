import { useContainer, cid } from 'inversify-hooks';
import { useTodosStore, TodosStoreType } from './todos.store';
import { ITodosService, Todo, TodoState } from '.';

export function useTodos() {
  const [todos, dispatch] = useTodosStore();
  const todosService = useContainer<ITodosService>(cid.ITodosService);

  async function load() {
    const todos = await todosService.load();
    dispatch({type: TodosStoreType.LOAD, payload: todos});
  }

  async function add(value: string) {
    const todo = todosService.generate(value);
    dispatch({type: TodosStoreType.ADD, payload: todo});
    await todosService.add(todo);
  }

  async function done(todo: Todo) {
    const updatedTodos = await todosService.done(todos, todo);
    dispatch({type: TodosStoreType.LOAD, payload: updatedTodos});
  }

  async function remove(todo: Todo) {
    const updatedTodos = await todosService.remove(todos, todo);
    dispatch({type: TodosStoreType.LOAD, payload: updatedTodos});
  }

  return [todos, load, add, done, remove] as const;
}
