import React from 'react';
import { useDispatch } from 'react-redux';

import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = ({ anecdotes }) => {
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <div>
      {anecdotes().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
