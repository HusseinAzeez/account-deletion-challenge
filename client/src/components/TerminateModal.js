// Third-party imports
import React, { Component } from 'react';

// Local imports
import { DataContext } from '../context/Data';
import { fetchWorkspacesService, submitSurveyService } from './FakeServices';
import ConfirmEmailModal from './containers/ConfirmEmailModal';
import TransferOwnershipModal from './containers/TransferOwnershipModal';
import FeedbackSurveyModal from './containers/FeedbackSurveyModal';
import {
  FETCHED_WORKSPACES,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  LOADING,
  SURVEY_SUBMITTION,
} from '../context/Types';

class TerminateModal extends Component {
  static contextType = DataContext;
  /*
    Removed react built-in PropTypes as it deprecated in version 15.5.0
  */

  /* 
    Removed fetchRelatedWorkspaces method from context 
    (reducer methods should not have a side effect)
    Add fake data method to memic the server
    The method will dispatch an action to set loading 
    state to true before calling the API
    The second dispatch will set the state with the 
    return data and set loading to false
  */

  async componentDidMount() {
    const { dispatch } = this.context;
    dispatch({ type: LOADING });
    const data = await fetchWorkspacesService();
    dispatch({ type: FETCHED_WORKSPACES, payload: data });
  }

  // Removed componentWillReceiveProps method

  submitSurvey = async () => {
    const { dispatch } = this.context;
    const { feedbackOptions, comment } = this.context;
    const surveyPayload = {
      feedback: feedbackOptions,
      comment,
    };
    const response = await submitSurveyService(surveyPayload);
    if (response.status === 200)
      dispatch({
        type: SURVEY_SUBMITTION,
        payload: true,
      });
  };

  handleNextPage = () => {
    const { activeModal, dispatch } = this.context;
    if (activeModal === 'transfer') {
      dispatch({
        type: NEXT_PAGE,
        payload: { activeModal: 'feedback' },
      });
    } else if (activeModal === 'feedback') {
      dispatch({
        type: NEXT_PAGE,
        payload: { activeModal: 'confirm' },
      });
      this.submitSurvey();
    }
  };

  handlePreviousStep = () => {
    const { activeModal, dispatch } = this.context;
    if (activeModal === 'feedback') {
      dispatch({
        type: PREVIOUS_PAGE,
        payload: { activeModal: 'transfer' },
      });
    }
    if (activeModal === 'confirm') {
      dispatch({
        type: PREVIOUS_PAGE,
        payload: { activeModal: 'feedback' },
      });
    }
  };

  render() {
    const { activeModal } = this.context;
    switch (activeModal) {
      case 'transfer':
        return <TransferOwnershipModal nextPage={this.handleNextPage} />;
      case 'feedback':
        return (
          <FeedbackSurveyModal
            onSubmit={this.handleNextPage}
            onBackButton={this.handlePreviousStep}
          />
        );
      case 'confirm':
        return <ConfirmEmailModal onBackButton={this.handlePreviousStep} />;
      default:
        return <h1>Taskworld Frontend task</h1>;
    }
  }
}

export default TerminateModal;
