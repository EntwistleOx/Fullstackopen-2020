import {
  LOAD_USER,
  LOAD_ERROR,
  LOGIN_OK,
  LOGIN_ERROR,
  LOGOUT,
} from '../actions/types';

const initialState = null;

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        token: payload.token,
        username: payload.username,
        name: payload.name,
      };
    case LOGIN_OK:
      localStorage.setItem('token', JSON.stringify(payload));
      return {
        ...state,
        ...payload,
      };
    case LOAD_ERROR:
    case LOGIN_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return null;
    default:
      return state;
  }
};

export default authReducer;
