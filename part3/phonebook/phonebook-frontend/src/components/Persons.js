import React from 'react';
import Person from './Person';

const Persons = ({ persons, filter, onRemove }) => {
  const data = filter.length ? filter : persons;
  return (
    <>
      {data.map((person) => (
        <Person key={person.name} person={person} onRemove={onRemove} />
      ))}
    </>
  );
};

export default Persons;
