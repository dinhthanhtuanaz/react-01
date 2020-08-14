import React, { useState } from 'react';
import './App.scss';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Bai 1' },
    { id: 2, title: 'Bai 2' },
    { id: 3, title: 'Bai 3' },
    { id: 4, title: 'Bai 4' }
  ]);

  function onClickDeleteTodo(todo) {
    const index = todos.findIndex(item => (
      item.id == todo.id
    ));
    if (index < 0) return;
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <TodoList todos={todos} onClickTodo={onClickDeleteTodo} />
    </div>
  );
}

export default App;
