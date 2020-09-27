import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from './Login';

const Users = () => {
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);

  return (
    <Fragment>
      {!auth ? (
        <Login />
      ) : (
        <Fragment>
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>
                  {user.name} has {user.blogs.length} blogs
                </Link>
              </li>
            ))}
          </ul>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Users;
