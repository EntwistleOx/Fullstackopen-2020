import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../actions/blogs';

const BlogForm = () => {
  const dispatch = useDispatch();

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
    dispatch(addBlog(newBlog));
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <form id='blogForm' onSubmit={handleCreateBlog}>
      <h3>New Blog</h3>
      <div>
        <input
          id='title'
          placeholder='Title'
          type='text'
          name='title'
          value={newBlog.title}
          onChange={handleBlogsOnChange}
        />
      </div>
      <div>
        <input
          id='author'
          placeholder='Author'
          type='text'
          name='author'
          value={newBlog.author}
          onChange={handleBlogsOnChange}
        />
      </div>
      <div>
        <input
          id='url'
          placeholder='URL'
          type='text'
          name='url'
          value={newBlog.url}
          onChange={handleBlogsOnChange}
        />
      </div>
      <input id='createBlogBtn' type='submit' value='create' className='btn' />
    </form>
  );
};

export default BlogForm;
