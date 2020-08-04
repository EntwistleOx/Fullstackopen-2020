import React, { Fragment } from 'react';

function LoginForm({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) {
  return (
    <Fragment>
      <h2>login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={handlePasswordChange}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </Fragment>
  );
}

export default LoginForm;
