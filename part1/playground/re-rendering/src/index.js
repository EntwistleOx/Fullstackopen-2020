import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({ counter }) => <>{counter}</>;

const Button = ({ handleClick, text }) => (
  <>
    <button onClick={handleClick}>{text}</button>
  </>
);

const App = () => {
  const [counter, setCounter] = useState(0);

  // setTimeout(() => {
  //   setCounter(counter + 1);
  // }, 1000);

  const increase = () => {
    setCounter(counter + 1);
  };

  const decrease = () => {
    setCounter(counter - 1);
  };

  const clear = () => {
    setCounter(0);
  };

  return (
    <>
      <Display counter={counter} />
      <Button handleClick={increase} text={'plus'} />
      <Button handleClick={decrease} text={'minus'} />
      <Button handleClick={clear} text={'crear'} />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// const App = (props) => {
//   const { counter } = props;
//   return <>{counter}</>;
// };

// let counter = 1;

// const refresh = () => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <App counter={counter} />
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
// };

// refresh();
// counter += 1;
// refresh();
// counter += 1;
// refresh();

// setInterval(() => {
//   refresh();
//   counter += 1;
// }, 1000);
