import React, { useState } from 'react';
import PropTypes from 'prop-types';

PostFiltersForm.propTypes = {
    onSubmit: PropTypes.func,
};

PostFiltersForm.defaultProps = {
    onSubmit: null
}

function PostFiltersForm(props) {
    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');

    function handleSearchTermChange(e) {
        setSearchTerm(e.target.value);
        if (!onSubmit) return;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const formValues = {
            searchTerm
        };
        onSubmit(formValues);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
            </form>
        </div>
    );
}

export default PostFiltersForm;