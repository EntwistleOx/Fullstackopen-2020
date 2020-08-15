import React from 'react';
import { useDispatch } from 'react-redux';

import { addAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(addAnecdote(content));
  };

  return (
    <div>
      <form onSubmit={add}>
        <input name='anecdote' />
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
