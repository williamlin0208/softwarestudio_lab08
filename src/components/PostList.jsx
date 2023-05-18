import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import PostItem from 'components/PostItem.jsx';

import './PostList.css';

function PostList() {
    const posts = useSelector(state => state.post.posts);
    //TODO

    let children = (
        <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
            <div className='empty-text'>No post here.<br />Go add some posts.</div>
        </ListGroupItem>
    );
    if (posts.length) {
        children = posts.map(p => (
            <ListGroupItem key={p.id} action>
                <PostItem {...p} />
            </ListGroupItem>
        ));
    }

    return (
        <div className='post-list'>
            <ListGroup>
                {children}
            </ListGroup>
        </div>
    );
}

PostList.propTypes = {
    posts: PropTypes.array,
    hasMore: PropTypes.bool,
    searchText: PropTypes.string
};

export default PostList;