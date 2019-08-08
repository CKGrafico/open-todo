import 'reflect-metadata';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './styles/app.scss';
import './i18n';
import App from './app/App';
import { containerBuilder } from './index.container';

function bootstrap() {
  containerBuilder();

  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'));
}

bootstrap();
