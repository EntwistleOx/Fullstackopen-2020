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
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'view'}</button>
      <br />
      {show && (
        <div className='blogInfo'>
          {blog.url}
          <br />
          likes: {blog.likes}{' '}
          <button className='btnLikes' onClick={handleOnClick}>
            likes
          </button>
          <br />
          {blog.user.name}
          <br />
          <button className='btnDelete' onClick={handleDelete}>
            delete
          </button>
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
