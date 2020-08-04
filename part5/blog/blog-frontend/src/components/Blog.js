import React, { useState, Fragment } from 'react';

const Blog = ({ blog, likeABlog }) => {
  const [show, setShow] = useState(false);

  const handleOnClick = () => {
    const likedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    likeABlog(blog.id, likedBlog);
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      {blog.title}{' '}
      <input
        type='button'
        onClick={() => setShow(!show)}
        value={show ? 'hide' : 'view'}
      />{' '}
      <br />
      {show && (
        <Fragment>
          {blog.url} | {blog.author}
          <br />
          likes: {blog.likes}{' '}
          <input type='button' value='likes' onClick={handleOnClick} />
          <br />
          {blog.user.name}
        </Fragment>
      )}
    </div>
  );
};

export default Blog;
