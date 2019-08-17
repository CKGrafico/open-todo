import { useContainer, cid } from 'inversify-hooks';
import { useSettingsStore, SettingsStoreType } from '~/store/settings.store';
import { IStorageService } from '~/app/shared';
import { useEffect } from 'react';

export function useSettingGist() {
  const GIST_ID = 'app_gist';
  const TOKEN_ID = 'app_token';

  const [settings, dispatch] = useSettingsStore();
  const [storageService] = useContainer<IStorageService<string>>(cid.IStorageService);

  async function load() {
    storageService.initialize('gist');
    const gist = await storageService.get(GIST_ID) || '';
    const token = await storageService.get(TOKEN_ID) || '';
    dispatch({type: SettingsStoreType.GIST_ID, payload: gist});
    dispatch({type: SettingsStoreType.GIST_TOKEN, payload: token});
  }

  async function setGist(value: string) {
    await storageService.set(value, GIST_ID);
    dispatch({type: SettingsStoreType.GIST_ID, payload: value});
  }

  async function setToken(value: string) {
    await storageService.set(value, TOKEN_ID);
    dispatch({type: SettingsStoreType.GIST_TOKEN, payload: value});
  }

  useEffect(() => {
    if (!storageService) {
      return;
    }

    load();
  }, [storageService]);

  return [settings.gistId || '', settings.gistToken || '', setGist, setToken] as const;
}
