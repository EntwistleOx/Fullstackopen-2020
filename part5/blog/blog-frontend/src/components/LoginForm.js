import React from 'react';
import PropTypes from 'prop-types';

function LoginForm({
  handleLogin,
  handleUsernameOnChange,
  handlePasswordOnChange,
  username,
  password,
}) {
  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={handleUsernameOnChange}
        />
      </div>
      <div>
        password
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={handlePasswordOnChange}
        />
      </div>
      <input id='loginBtn' type='submit' value='login' />
    </form>
  );
}

LoginForm.prototype = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameOnChange: PropTypes.func.isRequired,
  handlePasswordOnChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
