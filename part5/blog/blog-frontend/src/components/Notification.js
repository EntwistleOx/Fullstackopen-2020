import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ msg }) => {
  if (msg === null) {
    return null;
  }
  return <div className={msg.style}>{msg.message}</div>;
};

Notification.prototype = {
  msg: PropTypes.string.isRequired,
};
export default Notification;
