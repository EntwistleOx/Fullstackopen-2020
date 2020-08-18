import service from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data;
    case 'ADD':
      return [...state, action.data];
    case 'VOTE':
      return state.map((anecdote) =>
        anecdote.id !== action.data.id
          ? anecdote
          : { ...anecdote, votes: action.data.votes }
      );
    default:
      return state;
  }
};

export const initAnecdotes = (data) => {
  return {
    type: 'INIT_ANECDOTES',
    data: data,
  };
};

export const addAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await service.createNew(content);
  dispatch({
    type: 'ADD',
    data: newAnecdote,
  });
};

export const voteAnecdote = (id) => async (dispatch) => {
  const vote = await service.voteAnecdote(id);
  dispatch({
    type: 'VOTE',
    data: { id: vote.id, votes: vote.votes },
  });
};

export default reducer;
