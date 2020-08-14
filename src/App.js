import React, { useState, useEffect } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';

function App() {
  //useState
  const [todos, setTodos] = useState([
    { id: 1, title: 'Bai 1' },
    { id: 2, title: 'Bai 2' },
    { id: 3, title: 'Bai 3' },
    { id: 4, title: 'Bai 4' }
  ]);
  const [postList, setPostList] = useState([]);

  //useEffect
  useEffect(() => {
    try {
      async function fetchPostList() {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const { data } = responseJSON;
        setPostList(data);
      };
      fetchPostList();
    } catch (error) {
      console.log('Failed to fetch post list:', error);
    }

  }, []);

  //logic function 
  function onClickDeleteTodo(todo) {
    const index = todos.findIndex(item => (
      item.id == todo.id
    ));
    if (index < 0) return;
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  function addTodo(formValues) {
    let id = todos.length + 1;
    let newTodo = {
      id,
      title: formValues.title
    };
    setTodos([...todos, newTodo]);
  }

  return (
    <div className="app">
      {/* <TodoList todos={todos} onClickTodo={onClickDeleteTodo} />
      <TodoForm onSubmit={addTodo} /> */}
      <PostList postList={postList} />
    </div>
  );
}

export default App;
