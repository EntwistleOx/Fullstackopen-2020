import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, like, remove }) => {
  const [show, setShow] = useState(false);

  const handleOnClick = () => {
    const likedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    like(blog.id, likedBlog);
  };

  const handleDelete = () => {
    if (window.confirm(`do you want to remove ${blog.title}`)) {
      remove(blog.id);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} | {blog.author}
      <input
        type='button'
        onClick={() => setShow(!show)}
        value={show ? 'hide' : 'view'}
      />{' '}
      <br />
      {show && (
        <div className='blogInfo'>
          {blog.url}
          <br />
          likes: {blog.likes}{' '}
          <input
            type='button'
            value='likes'
            className='btnLikes'
            onClick={handleOnClick}
          />
          <br />
          {blog.user.name}
          <br />
          <input type='button' value='delete' onClick={handleDelete} />
        </div>
      )}
    </div>
  );
};

Blog.prototype = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default Blog;
