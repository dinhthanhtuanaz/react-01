import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null
};

function TodoForm(props) {
    const [title, setTitle] = useState('');
    const { onSubmit } = props;

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formValues = {
            title
        };
        onSubmit(formValues);
        setTitle('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={handleChangeTitle} />
        </form>
    );
}

export default TodoForm;