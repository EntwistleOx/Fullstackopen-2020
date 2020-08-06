import React, { useState } from 'react';
import PropTypes from 'prop-types';

function BlogForm({ createNewBlog }) {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleBlogsOnChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleCreateBlog = (e) => {
    e.preventDefault();
    createNewBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <form onSubmit={handleCreateBlog}>
      <h2>add new blog</h2>
      <div>
        title{' '}
        <input
          type='text'
          name='title'
          value={newBlog.title}
          onChange={handleBlogsOnChange}
        />
      </div>
      <div>
        author{' '}
        <input
          type='text'
          name='author'
          value={newBlog.author}
          onChange={handleBlogsOnChange}
        />
      </div>
      <div>
        url{' '}
        <input
          type='text'
          name='url'
          value={newBlog.url}
          onChange={handleBlogsOnChange}
        />
      </div>
      <input type='submit' value='create' />
    </form>
  );
}

BlogForm.prototype = {
  createNewBlog: PropTypes.func.isRequired,
};
export default BlogForm;
