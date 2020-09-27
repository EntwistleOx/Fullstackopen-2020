import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../actions/auth';

const Navbar = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <Fragment>
      {auth && (
        <Fragment>
          <div className='nav'>
            <div>
              <Link to='/'>Blogs</Link>
              <Link to='/users'>Users</Link>
            </div>
            <div>
              {auth && `${auth.name}`}{' '}
              <a href='#!' onClick={handleLogout}>
                Logout
              </a>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Navbar;
