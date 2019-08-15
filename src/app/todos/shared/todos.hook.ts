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
    await todosService.add(todo);
    dispatch({type: TodosStoreType.ADD, payload: todo});
  }

  async function done(todo: Todo) {
    const updatedTodo = await todosService.done(todo);
    dispatch({type: TodosStoreType.STATE, payload: updatedTodo});
  }

  async function remove(todo: Todo) {
    // dispatch({type: TodosStoreType.REMOVE, payload: todo});
    await todosService.remove(todo);
  }

  return [todos, load, add, done, remove] as const;
}
