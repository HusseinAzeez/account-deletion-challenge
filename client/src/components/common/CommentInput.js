// Third-party imports
import React from 'react';
import PropTypes from 'prop-types';

const CommentInput = props => {
  const { handleCommentChange, comment } = props;
  return (
    <div style={{ marginTop: '2rem' }}>
      Comments:
      <textarea
        type="text"
        name="comment"
        value={comment}
        onChange={handleCommentChange}
      />
    </div>
  );
};

CommentInput.propTypes = {
  handleCommentChange: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
};

export default CommentInput;
