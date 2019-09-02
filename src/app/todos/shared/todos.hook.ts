import { useContainer, cid } from 'inversify-hooks';
import { useTodosStore, TodosStoreType } from './todos.store';
import { ITodosService } from '.';
import { useEffect, useState } from 'react';
import { Todo, GistStatus, useGist } from '~/app/shared';

export function useTodos() {
  const [todosService] = useContainer<ITodosService>(cid.ITodosService);
  const [, gistToken, , , , mergeGist] = useGist();
  const [syncStatus, setSyncStatus] = useState(GistStatus.None);
  const [todos, dispatch] = useTodosStore();

  async function add(value: string) {
    const todo = todosService.generate(value);
    await todosService.add(todo);
    dispatch({ type: TodosStoreType.ADD, payload: todo });
  }

  async function done(todo: Todo) {
    const updatedTodo = await todosService.done(todo);
    dispatch({ type: TodosStoreType.STATE, payload: updatedTodo });
  }

  async function remove(todo: Todo) {
    await todosService.remove(todo);
    dispatch({ type: TodosStoreType.REMOVE, payload: todo });
  }

  useEffect(() => {
    async function sync() {
      if (!todos || !todosService) {
        return;
      }

      console.log(1);

      try {
        // TODO: Improve gist states
        // setSyncStatus(GistStatus.Progress);
        // const id = await syncGist(todos);
        // setSyncStatus(GistStatus.Done);
      } catch (e) {
        debugger;
        setSyncStatus(GistStatus.Error);
      }
    }

    sync();
  }, [todos, gistToken, todosService]);

  useEffect(() => {
    if (todos || !todosService) {
      return;
    }

    async function load() {
      setSyncStatus(GistStatus.Progress);
      const loadedTodos = await todosService.load();
      try {
        const serverAndLocalTodos = await mergeGist(loadedTodos);
        setSyncStatus(GistStatus.Done);
        dispatch({ type: TodosStoreType.LOAD, payload: serverAndLocalTodos });
      } catch (e) {
        setSyncStatus(GistStatus.Error);
        dispatch({ type: TodosStoreType.LOAD, payload: loadedTodos });
      }
    }

    load();
  }, [gistToken, todosService, setSyncStatus, dispatch, mergeGist, todos]);

  return [todos, add, done, remove, syncStatus] as const;
}
