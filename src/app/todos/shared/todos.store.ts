import { createStore, ReducerType, useStore } from 'react-hookstore';
import { TodoCollection } from '~/app/shared';

const name = 'TODOS';

enum Type {
  LOAD = 'TODOS/LOAD',
  ADD = 'TODOS/ADD',
  REMOVE = 'TODOS/REMOVE',
  STATE = 'TODOS/STATE',
}

type Payload = {
  type: Type;
  payload: any;
};

type State = TodoCollection | null;

const state: State = null;

const reducers: ReducerType<State, Payload> = function (state: State, { type, payload }) {
  switch (type) {
    case Type.ADD:
      const newTodo = { [payload.id]: payload };
      return { ...state, ...newTodo };
    case Type.REMOVE:
      state = state || {};
      delete state[payload.id];
      return { ...state };
    case Type.STATE:
      state = state || {};
      const stateTodo = state[payload.id];
      stateTodo.state = payload.state;
      return { ...state };
    case Type.LOAD:
      return { ...payload };
    default:
      return { ...state };
  }
};

createStore<State, Payload>(name, state, reducers);

export const TodosStoreType = Type;
export const useTodosStore = () => useStore<State, Payload>(name);


