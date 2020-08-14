import React from 'react';
import PropTypes from 'prop-types';

PostList.propTypes = {
    postList: PropTypes.array,
};

PostList.defaultProps = {
    postList: []
}

function PostList(props) {
    const { postList } = props;

    return (
        <ul>
            {
                postList.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))
            }
        </ul>
    );
}

export default PostList;