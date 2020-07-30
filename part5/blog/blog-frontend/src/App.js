import React, { useState, useEffect, Fragment } from 'react';
import Blog from './Blog';
import blogService from './services/blogs';
import loginService from './services/login';

import './style.css';

const Notification = ({ msg }) => {
  if (msg === null) {
    return null;
  }
  return <div className={msg.style}>{msg.message}</div>;
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const userjson = window.localStorage.getItem('leggedInUser');
    if (userjson) {
      const user = JSON.parse(userjson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const login = await loginService.login({ username, password });

      window.localStorage.setItem('leggedInUser', JSON.stringify(login));

      console.log(login.token);
      blogService.setToken(login.token);
      setUser(login);
      setUsername('');
      setPassword('');
      setMsg({ message: `Welcome ${login.name}`, style: 'success' });
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    } catch (error) {
      setMsg({ message: 'Wrong credentials', style: 'error' });
      setTimeout(() => {
        setMsg(null);
      }, 3000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('leggedInUser');
    setUser(null);
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <div>
          username
          <input
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type='submit' value='login' />
      </form>
    );
  };

  // BLOGS
  const handleBlogsOnChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    const response = await blogService.createBlog(newBlog);
    setBlogs([...blogs, response]);
    setMsg({
      message: `new blog!! ${response.title} by ${response.author}`,
      style: 'success',
    });
    setTimeout(() => {
      setMsg(null);
    }, 3000);
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  const blogForm = () => {
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
  };

  const blogList = (blogs) => {
    return (
      <Fragment>
        <p>
          {user && `${user.name} is logged in `}
          <input type='button' value='log out' onClick={handleLogout} />
        </p>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </Fragment>
    );
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification msg={msg} />
      {!user ? (
        loginForm()
      ) : (
        <Fragment>
          {blogList(blogs)} {blogForm()}
        </Fragment>
      )}
    </div>
  );
};

export default App;
