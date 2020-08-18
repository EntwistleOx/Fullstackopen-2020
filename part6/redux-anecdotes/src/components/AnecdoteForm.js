import React from 'react';
import { connect } from 'react-redux';

import { addAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = ({ addAnecdote, setNotification }) => {
  const add = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    addAnecdote(content);
    setNotification(`you voted '${content}'`, 3);
  };

  return (
    <div>
      <form onSubmit={add}>
        <h2>create new</h2>
        <input name='anecdote' />
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  addAnecdote,
  setNotification,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
