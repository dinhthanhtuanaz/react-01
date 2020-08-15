import React, { useState, useEffect } from 'react';
import './App.scss';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import PostList from './components/PostList';
import Pagination from './components/Pagination';
import queryString from 'query-string';
import PostFiltersForm from './components/PostFiltersForm';
function App() {
  //useState
  const [todos, setTodos] = useState([
    { id: 1, title: 'Bai 1' },
    { id: 2, title: 'Bai 2' },
    { id: 3, title: 'Bai 3' },
    { id: 4, title: 'Bai 4' }
  ]);
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
  });
  const [filters, setFilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: ''
  });

  //useEffect
  useEffect(() => {
    console.log('222');
    try {
      async function fetchPostList() {
        const paramsString = queryString.stringify(filters);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const { data, pagination } = responseJSON;
        console.log('p', pagination);
        setPostList(data);
        console.log('p2', pagination);
        setPagination(pagination);
      };
      fetchPostList();
    } catch (error) {
      console.log('Failed to fetch post list:', error);
    }

  }, [filters]);

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

  function handlePageChange(newPage) {
    console.log('newPage=', newPage); // newPage=2
    setFilters({
      ...pagination,
      _page: newPage
    });
    console.log('filters: ', filters); // =filters:  {_limit: 10, _page: 1} => Dòng này chạy trước cả khi setFilters => Bất đồng bộ(asynchronus)
    //=> chạy hết function này, nó mới Cập nhật state => Nếu state thay đổi thì thực hiện re-render(), còn 0 thì thôi.
  }

  function handleFiltersChange(newFilters) {
    console.log('New filters: ', newFilters);
    setFilters({
      ...filters,
      _page: 1,
      title_like: newFilters.searchTerm
    });
  }

  return (
    <div className="app">
      {/* <TodoList todos={todos} onClickTodo={onClickDeleteTodo} />
      <TodoForm onSubmit={addTodo} /> */}
      <PostFiltersForm onSubmit={handleFiltersChange} />
      <PostList postList={postList} />
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
