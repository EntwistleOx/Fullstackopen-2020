import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/types';

const initialState = {};

const notificationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_NOTIFICATION:
      return payload;
    case REMOVE_NOTIFICATION:
      return {};
    default:
      return state;
  }
};

export default notificationReducer;
