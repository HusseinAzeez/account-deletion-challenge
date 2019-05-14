// Third-party imports
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  const { onBackButton, onSubmit, hasAllUnchecked } = props;
  return (
    <Fragment>
      <button type="button" onClick={onBackButton}>
        Back
      </button>
      <button type="button" onClick={onSubmit} disabled={hasAllUnchecked()}>
        Next
      </button>
    </Fragment>
  );
};

Button.propTypes = {
  onBackButton: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  hasAllUnchecked: PropTypes.func.isRequired,
};

export default Button;
