import React, { useEffect } from 'react';
import './todo-list.module.scss';
import { useTodos, Todo } from '~/app/todos/shared';
import { TodoDetail } from '~/app/todos/todo-detail';

export default function () {
  const [todos] = useTodos();

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  function renderList() {
    return (
      <ul>
        {todos.map((x: Todo) => (<TodoDetail key={x.id} todo={x}/>))}
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
