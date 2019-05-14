// Third-party imports
import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = props => {
  const {
    stack,
    title,
    placeHolder,
    canComment,
    handleCheckboxChange,
    other,
  } = props;
  return (
    <div>
      <label htmlFor={stack}>
        <input
          id={stack}
          type="checkbox"
          name={stack}
          value={stack}
          onClick={handleCheckboxChange}
        />
        {title}
      </label>
      {other ? (
        <div style={!canComment ? { display: 'none' } : null}>
          <input type="text" name={stack} placeholder={placeHolder} />
        </div>
      ) : null}
    </div>
  );
};

Checkbox.propTypes = {
  stack: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  canComment: PropTypes.bool.isRequired,
  other: PropTypes.bool.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
