import axios from 'axios';
const baseUrl = '/api/users';

let token = null;

const setToken = (theToken) => {
  token = `Bearer ${theToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createUser = async (newUser) => {
  const header = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newUser, header);
  return response.data;
};

const deleteUser = async (id) => {
  try {
    const header = {
      headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseUrl}/${id}`, header);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default { getAll, createUser, deleteUser, setToken };
