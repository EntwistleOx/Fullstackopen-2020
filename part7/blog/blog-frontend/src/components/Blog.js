import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { deleteBlog, likeBlog, commentBlog } from '../actions/blogs';

const Blog = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [comment, setComment] = useState('');

  const match = useRouteMatch();
  const auth = useSelector((state) => state.auth);
  const blog = useSelector((state) =>
    state.blogs.find((user) => user.id === match.params.id),
  );

  const handleOnClick = () => {
    const likedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    dispatch(likeBlog(blog.id, likedBlog));
  };

  const handleDelete = () => {
    if (window.confirm(`do you want to remove ${blog.title}`)) {
      dispatch(deleteBlog(blog.id));
      history.push('/');
    }
  };

  const handleOnChange = (e) => {
    setComment(e.target.value);
  };

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(commentBlog(blog.id, comment));
    setComment('');
  };

  if (!blog) {
    return null;
  }

  return (
    <div className='blog'>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <div className='blog-data'>
        <p>Link: {blog.url}</p>
        <p>
          Likes: {blog.likes} <br />
        </p>
        <p>User: {blog.user.name}</p>
        <button className='btnLikes' onClick={handleOnClick} className='btn'>
          like
        </button>{' '}
        <button className='btnDelete' onClick={handleDelete} className='btn'>
          delete
        </button>
      </div>
      <h3>Comments </h3>
      <ul className='comments'>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
      <form onSubmit={handleComment}>
        <div>
          <textarea name='comment' value={comment} onChange={handleOnChange} />
        </div>

        <input
          id='createBlogBtn'
          type='submit'
          value='comment'
          className='btn'
        />
      </form>
    </div>
  );
};

Blog.prototype = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
