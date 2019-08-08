import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConfigurationRouter } from './configuration';
import { TodosRouter } from './todos';

export default function () {
  return (
    <main>
      <Switch>
        <Route exact={true} path="/" render={() => (<Redirect to="/todos"/>)}/>
        <TodosRouter />
        <ConfigurationRouter />
      </Switch>
    </main>
  );
}
