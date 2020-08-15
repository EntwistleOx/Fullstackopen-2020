import React from 'react';
import { useSelector } from 'react-redux';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  const anecdotes = useSelector((state) => state);

  const sortAnecdotes = () => {
    return anecdotes.sort((a, b) => b.votes - a.votes);
  };

  return (
    <div>
      <h2>Anecdotes</h2>

      <AnecdoteForm />
      <AnecdoteList anecdotes={sortAnecdotes} />
    </div>
  );
};

export default App;
