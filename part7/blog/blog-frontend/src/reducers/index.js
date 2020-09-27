import { combineReducers } from 'redux';
import auth from './auth';
import blogs from './blogs';
import users from './users';
import notification from './notification';

const reducer = combineReducers({
  auth,
  blogs,
  users,
  notification,
});

export default reducer;
