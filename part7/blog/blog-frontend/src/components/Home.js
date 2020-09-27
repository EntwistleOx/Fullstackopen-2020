import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import BlogForm from './BlogForm';
import Blogs from './Blogs';
import Login from './Login';
import Toggable from './Toggable';

const Home = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <Fragment>
      {!auth ? (
        <Login />
      ) : (
        <Fragment>
          <div className='home'>
            <h2>Blogs</h2>
            <Toggable buttonLabel={'new blog'}>
              <BlogForm />
            </Toggable>
          </div>
          <Blogs />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
