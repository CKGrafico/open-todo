import React from 'react';
import { Link } from 'react-router-dom';

export default function () {
  return (
    <header>
      <Link to="/configuration">Config</Link>
      <Link to="/todos">Todos</Link>
    </header>
  );
}
