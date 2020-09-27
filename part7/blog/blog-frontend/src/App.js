import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from './actions/auth';
import { getBlogs } from './actions/blogs';
import { getUsers } from './actions/users';
import Blog from './components/Blog';
import Navbar from './components/Navbar';
import Notification from './components/Notification';
import User from './components/User';
import Users from './components/Users';
import Home from './components/Home';
import './style.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(getBlogs());
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div className='container'>
        <Notification />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/blogs/:id'>
            <Blog />
          </Route>
          <Route exact path='/users'>
            <Users />
          </Route>
          <Route exact path='/users/:id'>
            <User />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
