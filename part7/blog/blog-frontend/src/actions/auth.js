import { LOAD_USER, LOAD_ERROR, LOGIN_OK, LOGIN_ERROR, LOGOUT } from './types';
import { setNotification } from './notification';
import authService from '../services/login';
import blogService from '../services/blogs';
import userService from '../services/users';

export const loadUser = () => (dispatch) => {
  const token = window.localStorage.getItem('token');

  if (token) {
    const user = JSON.parse(token);
    blogService.setToken(user.token);
    userService.setToken(user.token);
    dispatch({
      type: LOAD_USER,
      payload: user,
    });
  } else {
    dispatch({
      type: LOAD_ERROR,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  try {
    const login = await authService.login({ username, password });

    dispatch(
      setNotification({ message: `Welcome ${login.name}`, style: 'success' }),
    );

    dispatch({
      type: LOGIN_OK,
      payload: login,
    });

    blogService.setToken(login.token);
    userService.setToken(login.token);
  } catch (error) {
    dispatch(setNotification({ message: 'Wrong credentials', style: 'error' }));

    dispatch({
      type: LOGIN_ERROR,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
