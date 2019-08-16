import React from 'react';
import { Route } from 'react-router-dom';
import Settings from './Settings';

export const settingsRoutes = (
  <Route exact={true} path="/settings" component={Settings} />
);
