import React from 'react';
import './todo-list.module.scss';
import { useTodos } from '~/app/todos/shared';
import { TodoDetail } from '~/app/todos/todo-detail';
import { Todo } from '~/app/shared';

export default function () {
  const [todos] = useTodos();

  function renderList() {
    return (
      <ul>
        {todos ? Object.values(todos).map((x: Todo) => (<TodoDetail key={x.id} todo={x}/>)) : ''}
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
