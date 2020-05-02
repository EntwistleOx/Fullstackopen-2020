import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [click, setClick] = useState({
    left: 0,
    right: 0,
  });

  const handleLeftClick = () =>
    setClick({
      ...click,
      left: click.left + 1,
    });

  const handleRightClick = () =>
    setClick({
      ...click,
      right: click.right + 1,
    });

  return (
    <>
      {click.left}
      <button onClick={handleLeftClick}>Left</button>
      {click.right}
      <button onClick={handleRightClick}>Right</button>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
