import React from 'react';
import './todos.module.scss';
import { TodoInput } from './todo-input';
import { TodoList } from './todo-list';

export default function () {

  return (
    <div styleName="todos">
      <TodoInput/>
      <TodoList/>
    </div>
  );
}

