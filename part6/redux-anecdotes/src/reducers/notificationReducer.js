const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;
    case 'REMOVE_NOTIFICATION':
      return '';
    default:
      return state;
  }
};

let timeout = undefined;
export const setNotification = (msg, time) => (dispatch) => {
  dispatch({
    type: 'SET_NOTIFICATION',
    data: msg,
  });

  if (timeout !== undefined) {
    clearTimeout(timeout);
  }

  timeout = setTimeout(() => {
    dispatch({
      type: 'REMOVE_NOTIFICATION',
    });
  }, time * 1000);
};

export default reducer;
