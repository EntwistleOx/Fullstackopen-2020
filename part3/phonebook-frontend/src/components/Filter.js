import React from 'react';

const Filter = ({ onFilter }) => {
  return (
    <div>
      filter shown with <input onChange={onFilter} />
    </div>
  );
};

export default Filter;
