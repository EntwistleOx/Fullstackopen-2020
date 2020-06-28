import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Filter = ({ onFilter }) => {
  return (
    <div>
      filter shown with <input onChange={onFilter} />
    </div>
  );
};

const PersonForm = ({
  onSubmit,
  handleChangeName,
  handleChangePhone,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleChangePhone} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

const Person = ({ person }) => {
  return (
    <p>
      {person.name} - {person.number}
    </p>
  );
};

const Persons = ({ persons, filter }) => {
  const data = filter.length ? filter : persons;
  return (
    <>
      {data.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const found = persons.find((person) => person.name === newName);

    if (found) {
      alert(`${newName} is already added`);
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setFilter(filter.concat({ name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangePhone = (e) => {
    setNewNumber(e.target.value);
  };

  const onFilter = (e) => {
    const filtered = persons.filter((person) => {
      return person.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilter(filtered);
  };

  console.log('gente', persons);
  console.log('filtro', filter);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilter={onFilter} />

      <h2>Add new</h2>
      <PersonForm
        onSubmit={onSubmit}
        handleChangeName={handleChangeName}
        handleChangePhone={handleChangePhone}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
