import userService from '../services/users';
import { GET_USERS, ADD_USER, DELETE_USER } from './types';
import { setNotification } from './notification';

export const getUsers = () => async (dispatch) => {
  const users = await userService.getAll();

  dispatch({
    type: GET_USERS,
    payload: users,
  });
};

export const addUser = (newUser) => async (dispatch) => {
  const user = await userService.createUser(newUser);

  dispatch({
    type: ADD_USER,
    payload: user,
  });

  dispatch(
    setNotification({
      message: `New user!! ${user.title}`,
      style: 'success',
    }),
  );
};

export const deleteUser = (id) => async (dispatch) => {
  const delUser = await userService.deleteUser(id);

  if (delUser.error) {
    dispatch(
      setNotification({
        message: delUser.error,
        style: 'error',
      }),
    );
    return;
  }

  dispatch({
    type: DELETE_USER,
    payload: id,
  });

  dispatch(
    setNotification({
      message: 'Removed ok!!',
      style: 'success',
    }),
  );
};
