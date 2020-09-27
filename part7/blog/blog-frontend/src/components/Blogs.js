import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  const sortBlogs = () => {
    return blogs.sort((a, b) => b.likes - a.likes);
  };

  return (
    <Fragment>
      <ul>
        {sortBlogs(blogs).map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

Blogs.propTypes = {};

export default Blogs;
