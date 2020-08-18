import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import { initAnecdotes } from './reducers/anecdoteReducer';
import service from './services/anecdotes';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    service.getAll().then((anecdotes) => {
      dispatch(initAnecdotes(anecdotes));
    });
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
