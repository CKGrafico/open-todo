import { SettingsStoreState } from '~/store';
import { TodoCollection } from '~/app/shared';

export interface IGistService {
  sync(settings: SettingsStoreState, todos: TodoCollection): Promise<string | null>;
  merge(settings: SettingsStoreState, todos: TodoCollection): Promise<TodoCollection>;
}
