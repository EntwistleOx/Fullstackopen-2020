import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';

const Toggable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <Fragment>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='toggableContent'>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </Fragment>
  );
});

Toggable.displayName = 'Toggable';

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggable;
