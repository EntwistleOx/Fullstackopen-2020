import { GET_USERS, ADD_USER, DELETE_USER } from '../actions/types';

const initialState = [];

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return payload;
    case ADD_USER:
      return [...state, payload];
    case DELETE_USER:
      return state.filter((user) => {
        return user.id !== payload;
      });

    default:
      return state;
  }
};

export default usersReducer;
