import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { containerBuilder } from './index.container';
import App from './app/App';
import './styles/app.scss';
import './i18n';

function bootstrap() {
  containerBuilder();

  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root'));
}

bootstrap();
