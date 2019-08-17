import { createStore, ReducerType, useStore } from 'react-hookstore';

const name = 'SETTINGS';

enum Type {
  GIST_TOKEN = 'SETTINGS/GIST_TOKEN',
  GIST_ID = 'SETTINGS/GIST_ID'
}

type Payload = {
  type: Type;
  payload: any;
};

type State = {
  gistToken: string | null;
  gistId: string | null;
};

const state: State = {
  gistToken: null,
  gistId: null
};

const reducers: ReducerType<State, Payload> = function (state: State, { type, payload }) {
  switch (type) {
    case Type.GIST_TOKEN:
      return { ...state, gistToken: payload };
    case Type.GIST_ID:
        return { ...state, gistId: payload };
    default:
      return { ...state };
  }
};

createStore<State, Payload>(name, state, reducers);

export const SettingsStoreType = Type;
export const useSettingsStore = () => useStore<State, Payload>(name);


