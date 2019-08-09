import { createStore, ReducerType, useStore } from 'react-hookstore';
import { Todo } from './todo.model';
import { TodoState } from './todo-state.enum';

const name = 'TODOS';

enum Type {
  ADD = 'TODOS/ADD',
  OVERRIDE = 'TODOS/OVERRIDE'
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
    case Type.OVERRIDE:
      return [ ...payload ];
    default:
      return { ...state };
  }
};

createStore<State, Payload>(name, state, reducers);

export const TodosStoreType = Type;
export const useTodosStore = () => useStore<State, Payload>(name);


