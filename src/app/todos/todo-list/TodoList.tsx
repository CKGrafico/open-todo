import React, { useEffect } from 'react';
import './todo-list.module.scss';
import { useTodos } from '../shared';

export default function () {
  const [todos] = useTodos();

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div styleName="todo_list">
      List
      {JSON.stringify(todos)}
    </div>
  );
}
