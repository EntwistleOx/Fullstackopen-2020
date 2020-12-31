import React, { Fragment } from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({
  courseParts,
}) => {
  return (
    <Fragment>
      {courseParts.map((part, x) => {
        return <Part key={x} part={part} />;
      })}
    </Fragment>
  );
};

export default Content;
