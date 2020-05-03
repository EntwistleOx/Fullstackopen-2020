import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = ({ anecdores }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );

  const handleVotes = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const handleNext = () => setSelected(random);

  const random = () => Math.floor(Math.random() * anecdores.length + 0);

  const mostVoted = () => votes.indexOf(Math.max(...votes));

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdores[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVotes}>Vote</button>
      <button onClick={handleNext}>Next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>{anecdores[mostVoted()]}</div>
      <div>has {votes[mostVoted()]} votes</div>
    </>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(
  <React.StrictMode>
    <App anecdores={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);
