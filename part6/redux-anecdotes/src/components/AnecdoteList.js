import React from 'react';
import { connect } from 'react-redux';

import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = ({ filter, anecdotes, voteAnecdote, setNotification }) => {
  const filterAnecdotes = () => {
    if (filter === '') {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) => {
      return anecdote.content.toLowerCase().includes(filter.toLowerCase());
    });
  };

  const sortAnecdotes = () => {
    return filterAnecdotes().sort((a, b) => b.votes - a.votes);
  };

  const vote = (id, content) => {
    voteAnecdote(id);
    setNotification(`you voted '${content}'`, 5);
  };

  return (
    <div>
      {sortAnecdotes().map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log(state);
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
