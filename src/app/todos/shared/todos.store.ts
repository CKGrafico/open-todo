import { createStore, ReducerType, useStore } from 'react-hookstore';
import { Todo } from './todo.model';

const name = 'TODOS';

enum Type {
  ADD = 'TODOS/ADD'
}

type Payload = {
  type: Type;
  payload: any;
};

type State = Todo[];

const state: State = [];

const reducers: ReducerType<State, Payload> = function(state: State, { type, payload }) {
  switch (type) {
    case Type.ADD:
      return [ ...state, payload];
    default:
      return { ...state };
  }
};

createStore<State, Payload>(name, state, reducers);

export const TodosStoreType = Type;
export type TodosStoreState = State;
export const useTodosStore = () => useStore<State, Payload>(name);


