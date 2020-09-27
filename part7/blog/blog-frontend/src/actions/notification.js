import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from './types';

export const setNotification = (message, style) => (dispatch) => {
  dispatch({
    type: SET_NOTIFICATION,
    payload: message,
    style,
  });
  setTimeout(() => {
    dispatch({
      type: REMOVE_NOTIFICATION,
    });
  }, 5000);
};
