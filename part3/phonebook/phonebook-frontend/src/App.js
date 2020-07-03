import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notificacion';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    style: null,
  });

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const personData = { name: newName, number: newNumber };
    const found = persons.find((person) => person.name === newName);
    if (found) {
      const result = window.confirm(
        `${found.name} is already added, replace the old number with this new one?`
      );
      if (result) {
        personsService
          .update(found.id, personData)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id === found.id ? response : person
              )
            );
            setNewName('');
            setNewNumber('');
            setNotification({
              message: `${response.name} was updated`,
              style: 'success',
            });
            setTimeout(() => {
              setNotification({ message: null, style: null });
            }, 5000);
          })
          .catch((error) => {
            setNotification({
              message: `${error.response.data.error}`,
              style: 'error',
            });
            setTimeout(() => {
              setNotification({ message: null, style: null });
            }, 5000);
          });
      }
    } else {
      personsService
        .create(personData)
        .then((response) => {
          setPersons(persons.concat(response));
          setNewName('');
          setNewNumber('');
          setNotification({
            message: `${response.name} was added`,
            style: 'success',
          });
          setTimeout(() => {
            setNotification({ message: null, style: null });
          }, 5000);
        })
        .catch((error) => {
          setNotification({
            message: `${error.response.data.error}`,
            style: 'error',
          });
          setTimeout(() => {
            setNotification({ message: null, style: null });
          }, 5000);
        });
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

  const onRemove = (person) => {
    const result = window.confirm(`Delete ${person.name}?`);
    if (result)
      personsService
        .remove(person.id)
        .then((response) => {
          setPersons(persons.filter((p) => p.id !== person.id));
          setNotification({
            message: `${person.name} was removed`,
            style: 'success',
          });
          setTimeout(() => {
            setNotification({ message: null, style: null });
          }, 5000);
        })
        .catch((error) => {
          setNotification({
            message: `${person.name} was already removed`,
            style: 'error',
          });
          setTimeout(() => {
            setNotification({ message: null, style: null });
          }, 5000);
          setPersons(persons.filter((p) => p.id !== person.id));
        });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
      <Persons persons={persons} filter={filter} onRemove={onRemove} />
    </div>
  );
};

export default App;
