import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, your are {props.age} years old
      </p>
    </div>
  );
};

const Footer = () => {
  return <div>greetings app by JD</div>;
};

const App = () => {
  const name = 'Fran';
  const age = 10;
  return (
    <>
      <p>Greetings</p>
      <Hello name='React' age={26 + 10} />
      <Hello name={name} age={age} />
      <Footer />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
