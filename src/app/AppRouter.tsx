import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { settingsRoutes } from './settings';
import { todosRoutes } from './todos';

export default function () {
  return (
    <main>
      <Switch>
        <Route exact={true} path="/" render={() => (<Redirect to="/todos"/>)}/>
        {todosRoutes}
        {settingsRoutes}
      </Switch>
    </main>
  );
}
