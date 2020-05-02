import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Feedbacks: good, neutral, bad

const Statistics = ({ statistics }) => {
  return (
    <>
      <h1>Statistics</h1>
      <p>good: {statistics[0]}</p>
      <p>neutral: {statistics[1]}</p>
      <p>bad: {statistics[2]}</p>
    </>
  );
};

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setneutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setneutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>Give FeedBack</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Statistics statistics={[good, neutral, bad]} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
