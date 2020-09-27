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
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility} className='btn'>
          cancel
        </button>
        <br />
        <br />
        {props.children}
      </div>

      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className='btn'>
          {props.buttonLabel}
        </button>
        <br />
        <br />
      </div>
    </Fragment>
  );
});

Toggable.displayName = 'Toggable';

Toggable.propTypes = {
  props: PropTypes.object,
  ref: PropTypes.object,
};

export default Toggable;
