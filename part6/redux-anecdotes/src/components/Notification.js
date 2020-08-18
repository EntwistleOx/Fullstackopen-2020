import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: '1rem',
  };
  return (
    <Fragment>
      {notification && <div style={style}>{notification}</div>}
    </Fragment>
  );
};

export default Notification;
