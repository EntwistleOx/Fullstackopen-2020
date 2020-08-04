import React from 'react';

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
          value={username}
          onChange={handleUsernameOnChange}
        />
      </div>
      <div>
        password
        <input
          type='password'
          name='password'
          value={password}
          onChange={handlePasswordOnChange}
        />
      </div>
      <input type='submit' value='login' />
    </form>
  );
}

export default LoginForm;
