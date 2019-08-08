import React, { useEffect } from 'react';
import './todo-list.module.scss';
import { useTodos, Todo } from '../shared';

export default function () {
  const [todos] = useTodos();

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  function renderList() {
    return (
      <ul>
        {todos.map((x: Todo) => (<li key={x.id}>{x.value}</li>))}
      </ul>
    );
  }

  return (
    <div styleName="todo_list">
      List
      {renderList()}
    </div>
  );
}
