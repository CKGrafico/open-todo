import React from 'react';
import { Route } from 'react-router-dom';
import Configuration from './Configuration';

export const configurationRoutes = (
  <Route exact={true} path="/configuration" component={Configuration} />
);
