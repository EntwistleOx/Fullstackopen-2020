import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const useCounter = () => {
  const [value, setValue] = useState(0);

  const increase = () => {
    setValue(value + 1);
  };

  const decrease = () => {
    setValue(value - 1);
  };

  const clear = () => {
    setValue(0);
  };

  return {
    value,
    increase,
    decrease,
    clear,
  };
};

const Display = ({ counter }) => <>{counter}</>;

const Button = ({ handleClick, text }) => (
  <>
    <button onClick={handleClick}>{text}</button>
  </>
);

const App = () => {
  const counter = useCounter();

  return (
    <>
      <Display counter={counter.value} />
      <Button handleClick={counter.increase} text={'plus'} />
      <Button handleClick={counter.decrease} text={'minus'} />
      <Button handleClick={counter.clear} text={'clear'} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
