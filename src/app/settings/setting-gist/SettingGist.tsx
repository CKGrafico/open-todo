import React, { FormEvent, useEffect } from 'react';
import { useSettingGist } from './setting-gist.hook';

export default function() {
  const [gistId, gistToken, setGist, setToken] = useSettingGist();

  function onChangeGistId(e: FormEvent<HTMLInputElement>) {
    if (!e || !e.currentTarget) {
      return;
    }

    setGist(e.currentTarget.value);
  }

  function onChangeGistToken(e: FormEvent<HTMLInputElement>) {
    if (!e || !e.currentTarget) {
      return;
    }

    setToken(e.currentTarget.value);
  }

  return (
    <div>
      <h3>NOT TRANSLATED Settings</h3>
      <input type="text" value={gistId} onChange={onChangeGistId}/>
      <input type="text" value={gistToken} onChange={onChangeGistToken}/>
    </div>
  );
}
