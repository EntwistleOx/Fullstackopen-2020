import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import Login from './Login';

const User = () => {
  const match = useRouteMatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) =>
    state.users.find((user) => user.id === match.params.id),
  );

  if (!user) {
    return null;
  }

  return (
    <Fragment>
      {!auth ? (
        <Login />
      ) : (
        <Fragment>
          <h2>{user.name}</h2>
          <h3>Blogs</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </Fragment>
      )}
    </Fragment>
  );
};

export default User;
