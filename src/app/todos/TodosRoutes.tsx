import React from 'react';
import { Route } from 'react-router-dom';
import Todos from './Todos';

export const todosRoutes = (
  <Route exact={true} path="/todos" component={Todos} />
);
