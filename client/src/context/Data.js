/* eslint-disable react/no-unused-state */
// Third-party imports
import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';

// Local imports
import * as LoadState from '../components/LoadState';
import feedbackSurveyItems from './FeedbackSurveyItems';
import {
  FETCHED_WORKSPACES,
  TRANSFER_OWNERSHIP,
  ASSIGN_TO_USER,
  TERMINATE_ACCOUNT,
  TERMINATE_ACCOUNT_STATUS,
  TERMINATE_ACCOUNT_ERROR,
  LOADING,
  ERROR,
  COMPLETED,
  NEXT_PAGE,
  PREVIOUS_PAGE,
  CHANGE_COMMENT,
  CHANGE_EMAIL,
  CHANGE_CHECKBOX,
  MARKED_CONSEQUENCES,
  SURVEY_SUBMITTION,
} from './Types';

export const DataContext = createContext();
export const DataConumer = DataContext.Consumer;

const reducer = (state, action) => {
  switch (action.type) {
    case FETCHED_WORKSPACES:
      return {
        ...state,
        loading: false,
        requiredTransferWorkspaces: action.payload.requiredTransferWorkspaces,
        deleteWorkspaces: action.payload.deleteWorkspaces,
      };
    case TRANSFER_OWNERSHIP:
      return {
        ...state,
        transferOwnershipStatus: {
          workspaceId: action.payload.workspace.spaceId,
          toUserId: state.user._id,
          ...LoadState.loading,
        },
      };
    case ASSIGN_TO_USER:
      return {
        ...state,
        transferData: action.payload.transferData,
      };
    case TERMINATE_ACCOUNT:
      return {
        ...state,
        terminateAccountStatus: action.payload,
      };
    case TERMINATE_ACCOUNT_STATUS:
      return {
        ...state,
        terminateAccountStatus: action.payload,
      };
    case TERMINATE_ACCOUNT_ERROR:
      return {
        ...state,
        terminateAccountStatus: action.payload,
      };
    case SURVEY_SUBMITTION:
      return {
        ...state,
        surveySubmittion: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        transferOwnershipStatus: {
          workspaceId: action.payload.workspace.spaceId,
          toUserId: action.payload.user._id,
          ...LoadState.error,
        },
      };
    case COMPLETED:
      return {
        ...state,
        loading: false,
        transferOwnershipStatus: {
          workspaceId: action.payload.workspace.spaceId,
          toUserId: action.payload.user._id,
          ...LoadState.completed,
        },
      };
    case NEXT_PAGE:
      return {
        ...state,
        activeModal: action.payload.activeModal,
      };
    case PREVIOUS_PAGE:
      return {
        ...state,
        activeModal: action.payload.activeModal,
      };
    case CHANGE_COMMENT:
      return {
        ...state,
        comment: action.payload,
      };
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case CHANGE_CHECKBOX:
      return {
        ...state,
        feedbackOptions: action.payload,
      };
    case MARKED_CONSEQUENCES:
      return {
        ...state,
        markedConsequences: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export class DataProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  state = {
    user: {
      _id: 'user1',
      name: 'Ross Lynch',
      email: 'ross@example.com',
    },
    feedbackOptions: feedbackSurveyItems.reduce(
      (option, feedbackItem) => ({
        ...option,
        [feedbackItem.stack]: false,
      }),
      {},
    ),
    feedbackItems: feedbackSurveyItems,
    activeModal: 'transfer',
    transferData: [],
    feedbacks: [],
    comment: '',
    email: '',
    surveySubmittion: false,
    loading: false,
    requiredTransferWorkspaces: [],
    deleteWorkspaces: [],
    transferableMembers: [],
    terminateAccountStatus: {},
    markedConsequences: false,
    transferOwnershipStatus: {
      workspaceId: null,
      toUserId: null,
      ...LoadState.pending,
    },

    dispatch: action => {
      this.setState(state => reducer(state, action));
    },
  };

  render() {
    const { children } = this.props;
    return (
      <DataContext.Provider value={this.state}>{children}</DataContext.Provider>
    );
  }
}

export default DataProvider;
