import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const App = () => {
  const name = useField('text');
  const birth = useField('date');
  const height = useField('number');

  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input {...birth} />
        <br />
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {birth.value} {height.value}
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
