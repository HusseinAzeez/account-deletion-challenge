// Third-party imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Local imports
import { DataContext } from '../../context/Data';
import { CHANGE_COMMENT, CHANGE_CHECKBOX } from '../../context/Types';
import Button from '../common/Button';
import Checkbox from '../common/Checkbox';
import CommentInput from '../common/CommentInput';

class FeedbackSurveyModal extends Component {
  static contextType = DataContext;
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onBackButton: PropTypes.func.isRequired,
  };

  handleCommentChange = e => {
    const { dispatch } = this.context;
    dispatch({ type: CHANGE_COMMENT, payload: e.target.value });
  };

  // Used built-in every method instead of lodash .every method
  hasAllUnchecked = () => {
    const { feedbackOptions } = this.context;
    return Object.values(feedbackOptions).every(value => value === false);
  };

  handleCheckboxChange = stack => {
    const { dispatch, feedbackOptions } = this.context;
    dispatch({
      type: CHANGE_CHECKBOX,
      payload: {
        ...feedbackOptions,
        [stack]: !feedbackOptions[stack],
      },
    });
  };

  render() {
    const { onBackButton, onSubmit } = this.props;
    const { feedbackItems, feedbackOptions, comment } = this.context;
    return (
      <div>
        <h1>Why would you leave us?</h1>
        <div>
          {feedbackItems.map(item => (
            <Checkbox
              key={item.stack}
              stack={item.stack}
              title={item.title}
              canComment={item.canComment}
              placeHolder={item.placeHolder || ''}
              other={feedbackOptions[item.stack]}
              handleCheckboxChange={() => this.handleCheckboxChange(item.stack)}
            />
          ))}
        </div>
        <CommentInput
          comment={comment}
          handleCommentChange={this.handleCommentChange}
        />
        <Button
          onBackButton={onBackButton}
          onSubmit={onSubmit}
          hasAllUnchecked={this.hasAllUnchecked}
        />
      </div>
    );
  }
}

export default FeedbackSurveyModal;
