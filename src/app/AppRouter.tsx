import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { configurationRoutes } from './configuration';
import { todosRoutes } from './todos';

export default function () {
  return (
    <main>
      <Switch>
        <Route exact={true} path="/" render={() => (<Redirect to="/todos"/>)}/>
        {todosRoutes}
        {configurationRoutes}
      </Switch>
    </main>
  );
}
