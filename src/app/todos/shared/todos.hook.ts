import { useContainer, cid } from 'inversify-hooks';
import { useTodosStore, TodosStoreType } from './todos.store';
import { ITodosService, Todo, TodoState } from '.';

export function useTodos() {
  const [todos, dispatch] = useTodosStore();
  const todosService = useContainer<ITodosService>(cid.ITodosService);


  function add(value: string) {
    const todo = todosService.generate(value);
    dispatch({type: TodosStoreType.ADD, payload: todo});
    // pending async functions to services
  }

  function done(todo: Todo) {
    const updatedTodos = todos.map(x => {
      if (x.id === todo.id) {
        x.state = TodoState.Done;
      }

      return x;
    });

    dispatch({type: TodosStoreType.OVERRIDE, payload: updatedTodos});
    // pending async functions to services
  }

  function remove(todo: Todo) {
    const updatedTodos = todos.filter(x => x.id !== todo.id);
    dispatch({type: TodosStoreType.OVERRIDE, payload: updatedTodos});
    // pending async functions to services
  }

  return [todos, add, done, remove] as const;
}
