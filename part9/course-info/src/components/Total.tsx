import React from 'react';
import { CoursePart } from '../types';

const Total: React.FC<{ courseParts: Array<CoursePart> }> = ({
  courseParts,
}) => {
  const getTotal = () => {
    return courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
  };

  return <p>Number of exercises {getTotal()} </p>;
};

export default Total;
