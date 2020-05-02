import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return <p>the app is used by pressing the button</p>;
  }
  return <p>button press history: {allClicks.join(' ')}</p>;
};

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  );
};

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [value, setVal] = useState(10);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
  };

  // const setValue = (newVal) => {
  //   const handler = () => {
  //     setVal(newVal);
  //   };
  //   return handler;
  // };

  // const setValue = (newVal) => {
  //   return () => {
  //     setVal(newVal);
  //   };
  // };

  const setValue = (newVal) => () => {
    setVal(newVal);
  };

  return (
    <>
      {left}
      <Button onClick={handleLeftClick} text='Left' />
      {right}
      <Button onClick={handleRightClick} text='Right' />
      <History allClicks={allClicks} />
      <hr />
      {value}
      {/* <button onClick={setValue(1000)}>thousand</button>
      <button onClick={setValue(0)}>reset</button>
      <button onClick={setValue(value + 1)}>increment</button> */}
      <Button onClick={setValue(1000)} text='thousand' />
      <Button onClick={setValue(0)} text='reset' />
      <Button onClick={setValue(value + 1)} text='increment' />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
