import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Feedbacks: good, neutral, bad

const Statistics = ({ statistics }) => {
  const good = statistics[0];
  const neutral = statistics[1];
  const bad = statistics[2];
  const total = statistics[3];

  const average = () => {
    const result = (good - bad) / total;
    if (isNaN(result)) return 0;
    return result;
  };

  const positive = () => {
    const result = (good * 100) / total;
    if (isNaN(result)) return 0;
    return result + '%';
  };

  return (
    <>
      <h1>Statistics</h1>
      {total === 0 ? (
        'No feedback given'
      ) : (
        <>
          <p>good: {good}</p>
          <p>neutral: {neutral}</p>
          <p>bad: {bad}</p>
          <p>all: {total}</p>
          <p>average: {average()}</p>
          <p>positive: {positive()}</p>
        </>
      )}
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
  const [total, setTotal] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };

  const handleNeutral = () => {
    setneutral(neutral + 1);
    setTotal(total + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  return (
    <>
      <h1>Give FeedBack</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Statistics statistics={[good, neutral, bad, total]} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
