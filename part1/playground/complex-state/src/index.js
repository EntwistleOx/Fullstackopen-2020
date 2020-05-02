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

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    setRight(right + 1);
  };

  return (
    <>
      {left}
      <Button onClick={handleLeftClick} text='Left' />
      {right}
      <Button onClick={handleRightClick} text='Right' />
      <History allClicks={allClicks} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
