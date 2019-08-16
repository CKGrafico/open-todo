import React, { useEffect } from 'react';
import './todos.module.scss';
import { TodoInput } from './todo-input';
import { TodoList } from './todo-list';
import { useTodos } from './shared';

export default function () {
  const [todos, loadTodos] = useTodos();

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div styleName="todos">
      <TodoInput/>
      <TodoList/>
    </div>
  );
}

