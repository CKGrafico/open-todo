import { useEffect } from 'react';
import { useContainer, cid } from 'inversify-hooks';
import { useSettingsStore, SettingsStoreType } from '~/store';
import { IStorageService } from '~/app/shared';
import { IGistService } from './igist.service';
import { TodoCollection } from '../todo';

export function useGist() {
  const GIST_ID = 'app_gist';
  const TOKEN_ID = 'app_token';

  const [storageService] = useContainer<IStorageService<string>>(cid.IStorageService);
  const [settings, dispatch] = useSettingsStore();
  const [gistService] = useContainer<IGistService>(cid.IGistService);

  async function setGist(value: string) {
    await storageService.set(value, GIST_ID);
    dispatch({type: SettingsStoreType.GIST_ID, payload: value});
  }

  async function setToken(value: string) {
    await storageService.set(value, TOKEN_ID);
    dispatch({type: SettingsStoreType.GIST_TOKEN, payload: value});
  }

  async function sync(todos: TodoCollection): Promise<string | null> {
    const id = await gistService.sync(settings, todos);

    if (!id) {
      return null;
    }

    setGist(id);

    return id;
  }

  async function merge(todos: TodoCollection): Promise<TodoCollection> {
    return await gistService.merge(settings, todos);
  }

  // Order is important
  useEffect(() => {
    if (!storageService) {
      return;
    }

    storageService.initialize('gist');
  }, [storageService]);

  useEffect(() => {
    if (!storageService || settings.gistId) {
      return;
    }

    async function loadGistId() {
      const gist = await storageService.get(GIST_ID) || '';
      dispatch({type: SettingsStoreType.GIST_ID, payload: gist});
    }

    loadGistId();
  }, [storageService, dispatch, settings.gistId]);

  useEffect(() => {
    if (!storageService || settings.gistToken) {
      return;
    }

    async function loadGistToken() {
      const token = await storageService.get(TOKEN_ID) || '';
      dispatch({type: SettingsStoreType.GIST_TOKEN, payload: token});
    }

    loadGistToken();
  }, [storageService, dispatch, settings.gistToken]);

  return [settings.gistId || '', settings.gistToken || '', setGist, setToken, sync, merge] as const;
}
