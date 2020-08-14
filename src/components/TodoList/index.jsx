import React from 'react';
import PropTypes from 'prop-types';

TodoList.propTypes = {
    todos: PropTypes.array,
    onClickTodo: PropTypes.func,
};

TodoList.defaultProps = {
    todos: [],
    onClickTodo: null
}

function TodoList(props) {
    const { todos, onClickTodo } = props;

    function deleteTodo(todo) {
        onClickTodo(todo);
    }

    return (
        <ul>
            {
                todos.map(todo => (
                    <li key={todo.id} onClick={() => deleteTodo(todo)}>{todo.title}</li>
                ))
            }
        </ul>
    );
}

export default TodoList;