import React, { useState, FormEvent } from 'react';
import './todo-input.module.scss';
import { useTodos } from '../shared';
import { useTranslation } from 'react-i18next';

export default function () {
  const [t] = useTranslation();
  const [value, setValue] = useState('');
  const [todos, addTodo] = useTodos();

  function onClickSave() {
    addTodo(value);
    setValue('');
  }

  function onChangeInput(e: FormEvent<HTMLInputElement>) {
    if (!e || !e.currentTarget) {
      return;
    }

    setValue(e.currentTarget.value);
  }

  return (
    <div styleName="todo_input">
      <input type="text" value={value} onChange={onChangeInput}/>
      <button onClick={onClickSave}>{t('todos.save')}</button>
    </div>
  );
}
