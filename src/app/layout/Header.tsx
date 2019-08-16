import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <header>
      <Link to="/settings">Settings</Link>
      <Link to="/todos">Todos</Link>
    </header>
  );
}
