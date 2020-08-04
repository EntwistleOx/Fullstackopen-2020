import React from 'react';

const Notification = ({ msg }) => {
  if (msg === null) {
    return null;
  }
  return <div className={msg.style}>{msg.message}</div>;
};

export default Notification;
