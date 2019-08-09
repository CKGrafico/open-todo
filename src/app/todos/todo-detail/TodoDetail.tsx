import React, { useState, FormEvent } from 'react';
import './todo-detail.module.scss';
import { useTodos, Todo, TodoState } from '../shared';
import { useTranslation } from 'react-i18next';

type Props = {
  todo: Todo
};

export default function (props: Props) {
  const { todo } = props;
  const [todos, add, done, remove] = useTodos();

  function onClickDone(): void {
    done(todo);
  }

  function onClickRemove(): void {
    remove(todo);
  }

  function isDone() {
    return todo.state === TodoState.Done;
  }

  function addIsDoneState(): string {
    return isDone() ? 'is-done' : '';
  }

  return (
    <li styleName="todo_detail" className={addIsDoneState()}>
      {todo.value}

      <button onClick={onClickDone}>DONE</button>
      {isDone() ? <button onClick={onClickRemove}>REMOVE</button> : ''}
    </li>
  );
}
