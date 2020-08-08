import React, { useState, useEffect, Fragment } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Toggable from './components/Toggable';

import blogService from './services/blogs';
import loginService from './services/login';

import './style.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
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
    async function fetchData() {
      const fetchBlogs = await blogService.getAll();
      sortBlogs(fetchBlogs);
    }
    fetchData();
  }, []);

  const sortBlogs = (blogs) => {
    setBlogs(blogs.sort((a, b) => b.likes - a.likes));
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const login = await loginService.login({ username, password });
      window.localStorage.setItem('leggedInUser', JSON.stringify(login));
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
      <LoginForm
        handleLogin={handleLogin}
        handleUsernameOnChange={(e) => setUsername(e.target.value)}
        handlePasswordOnChange={(e) => setPassword(e.target.value)}
        username={username}
        password={password}
      />
    );
  };

  // BLOGS

  const createNewBlog = async (newBlog) => {
    const response = await blogService.createBlog(newBlog);
    setBlogs([...blogs, response]);
    setMsg({
      message: `new blog!! ${response.title} by ${response.author}`,
      style: 'success',
    });
    setTimeout(() => {
      setMsg(null);
    }, 3000);
  };

  const likeBlog = async (id, likedBlog) => {
    const response = await blogService.likeBlog(id, likedBlog);

    // setBlogs(
    //   blogs.map((blog) => {
    //     return blog.id === response.id
    //       ? { ...blog, likes: response.likes }
    //       : blog;
    //   })
    // );

    sortBlogs(
      blogs.map((blog) => {
        return blog.id === response.id
          ? { ...blog, likes: response.likes }
          : blog;
      })
    );

    setMsg({
      message: `new like in ${response.title}`,
      style: 'success',
    });
    setTimeout(() => {
      setMsg(null);
    }, 3000);
  };

  const deleteBlog = async (id) => {
    const delBlog = await blogService.deleteBlog(id);

    if (delBlog.error) {
      setMsg({
        message: delBlog.error,
        style: 'error',
      });
      setTimeout(() => {
        setMsg(null);
      }, 3000);
      return;
    }

    setBlogs(
      blogs.filter((blog) => {
        return blog.id !== id;
      })
    );
    setMsg({
      message: 'removed ok',
      style: 'success',
    });
    setTimeout(() => {
      setMsg(null);
    }, 3000);
  };

  const blogForm = () => {
    return (
      <Toggable buttonLabel={'new blog'}>
        <BlogForm createNewBlog={createNewBlog} />
      </Toggable>
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
          <Blog key={blog.id} blog={blog} like={likeBlog} remove={deleteBlog} />
        ))}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <h2>blogs</h2>
      <Notification msg={msg} />
      {!user ? (
        loginForm()
      ) : (
        <Fragment>
          {blogList(blogs)}
          {blogForm()}
        </Fragment>
      )}
    </Fragment>
  );
};

export default App;
