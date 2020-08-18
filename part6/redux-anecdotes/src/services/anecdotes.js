import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const anecdote = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const voteAnecdote = async (id) => {
  const anecdote = await axios.get(`${baseUrl}/${id}`);
  const data = {
    votes: Number(anecdote.data.votes) + 1,
  };
  const response = await axios.patch(`${baseUrl}/${id}`, data);
  return response.data;
};

export default { getAll, createNew, voteAnecdote };
