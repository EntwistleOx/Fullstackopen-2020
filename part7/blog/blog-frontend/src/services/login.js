import axios from 'axios';
const loginUrl = '/api/login';

const login = async (credentials) => {
  const login = await axios.post(loginUrl, credentials);
  return login.data;
};

export default { login };
