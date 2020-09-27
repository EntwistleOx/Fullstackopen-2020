import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import LoginForm from './LoginForm';

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(username, password));
    setUsername('');
    setPassword('');
  };

  return (
    <Fragment>
      <LoginForm
        handleLogin={handleLogin}
        handleUsernameOnChange={(e) => setUsername(e.target.value)}
        handlePasswordOnChange={(e) => setPassword(e.target.value)}
        username={username}
        password={password}
      />
    </Fragment>
  );
};

export default Login;
