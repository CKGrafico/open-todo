import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Todos from './Todos';

export default function () {
  return (
    <Fragment>
        <Route exact={true} path="/todos" component={Todos} />
    </Fragment>
  );
}
