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
      <h2>Login to Application</h2>
      <div>
        <input
          type='text'
          name='username'
          placeholder='Username'
          id='username'
          value={username}
          onChange={handleUsernameOnChange}
        />
      </div>
      <div>
        <input
          type='password'
          name='password'
          placeholder='Password'
          id='password'
          value={password}
          onChange={handlePasswordOnChange}
        />
      </div>
      <input id='loginBtn' type='submit' value='login' className='btn' />
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
