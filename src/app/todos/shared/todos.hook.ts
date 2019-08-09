import { useContainer, cid } from 'inversify-hooks';
import { useTodosStore, TodosStoreType } from './todos.store';
import { ITodosService } from '.';

export function useTodos() {
  const [todos, dispatch] = useTodosStore();
  const todosService = useContainer<ITodosService>(cid.ITodosService);


  function add(value: string) {
    const todo = todosService.generate(value);
    dispatch({type: TodosStoreType.ADD, payload: todo});
  }

  return [todos, add] as const;
}
