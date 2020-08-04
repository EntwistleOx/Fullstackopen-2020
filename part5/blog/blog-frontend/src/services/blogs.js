import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (theToken) => {
  token = `Bearer ${theToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async (newBlog) => {
  const header = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, header);
  return response.data;
};

const likeBlog = async (id, blog) => {
  const header = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, blog, header);
  return response.data;
};

export default { getAll, createBlog, likeBlog, setToken };
