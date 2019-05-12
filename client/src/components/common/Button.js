// Third-party imports
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Button = props => {
  const { onBackButton, onSubmit, hasAllUnchecked } = props
  return (
    <Fragment>
      <button onClick={onBackButton}>Back</button>
      <button onClick={onSubmit} disabled={hasAllUnchecked()}>
        Next
      </button>
    </Fragment>
  )
}

Button.propTypes = {
  onBackButton: PropTypes.func,
  onSubmit: PropTypes.func,
  hasAllUnchecked: PropTypes.bool,
}

export default Button
