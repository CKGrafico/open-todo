import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Configuration from './Configuration';

export default function () {
  return (
    <Fragment>
        <Route exact={true} path="/configuration" component={Configuration} />
    </Fragment>
  );
}
