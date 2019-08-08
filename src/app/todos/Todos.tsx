import React from 'react';
import { useTranslation } from 'react-i18next';
import './todos.module.scss';
import { TodoInput } from './todo-input';

export default function () {
  return (
    <div styleName="todos">
      <TodoInput/>
    </div>
  );
}

