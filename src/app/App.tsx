import React from 'react';
import AppRouter from './AppRouter';
import { Header } from './layout';
import { useGist } from './shared';

export default function () {
  useGist();

  return (
    <div>
      <Header />
      <AppRouter />
    </div>
  );
}
