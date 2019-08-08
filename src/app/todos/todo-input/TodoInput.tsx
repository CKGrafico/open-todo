import React from 'react';
import './todo-input.module.scss';
import { ITodosService } from '../shared';
import { useContainer, cid } from 'inversify-hooks';

export default function () {
  const todosService = useContainer<ITodosService>(cid.ITodosService);

  todosService.get();

  return (
    <div styleName="todo_input">
      <input type="text"/>
    </div>
  );
}
