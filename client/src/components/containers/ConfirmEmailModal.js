// third-party imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Local imports
import { DataContext } from '../../context/Data';
import {
  isLoading,
  pending,
  handleLoadFailedWithError,
  handleLoaded,
} from '../LoadState';
import {
  TERMINATE_ACCOUNT_STATUS,
  TERMINATE_ACCOUNT_ERROR,
  CHANGE_EMAIL,
  TERMINATE_ACCOUNT,
  MARKED_CONSEQUENCES,
} from '../../context/Types';
import { terminateAccountService } from '../FakeServices';

class ConfirmEmailModal extends Component {
  static contextType = DataContext;
  static propTypes = {
    onBackButton: PropTypes.func.isRequired,
  };

  componentWillUnmount() {
    this.resetTerminateAccountStatus();
  }

  rediect = () => {
    window.location = 'http://www.example.com/';
  };

  resetTerminateAccountStatus = () => {
    const { dispatch } = this.context;
    dispatch({
      type: TERMINATE_ACCOUNT_STATUS,
      payload: pending,
    });
  };

  terminateAccountError = error => {
    const { dispatch, terminateAccountStatus } = this.context;
    dispatch({
      type: TERMINATE_ACCOUNT_ERROR,
      payload: handleLoadFailedWithError(error)(terminateAccountStatus),
    });
  };

  terminateAccount = async () => {
    const { dispatch, terminateAccountStatus } = this.context;
    const error = 'Error deleting account';
    const response = await terminateAccountService();
    if (response.status === 200) {
      dispatch({
        type: TERMINATE_ACCOUNT,
        payload: handleLoaded(terminateAccountStatus),
      });
      this.rediect();
    } else
      dispatch({
        type: TERMINATE_ACCOUNT_ERROR,
        payload: handleLoadFailedWithError(error)(terminateAccountStatus),
      });
  };

  getTransferData = () => {
    const { transferData, transferOwnershipStatus } = this.context;
    const { workspaceId, toUserId, status } = transferOwnershipStatus;
    // Used built-in reduce method instead of lodash reduce method
    const updateData = transferData.reduce((result, assign) => {
      assign.workspaceId === workspaceId && assign.toUser._id === toUserId
        ? result.push(Object.assign({}, assign, { status }))
        : result.push(assign);
      return result;
    }, []);
    return updateData;
  };

  handleDeleteAccount = async () => {
    const { user, email, feedbacks } = this.context;
    if (user.email === email) {
      const payload = {
        transferTargets: _.map(this.getTransferData(), assign => ({
          userId: assign.toUser._id,
          spaceId: assign.workspaceId,
        })),
        reason: feedbacks,
      };
      this.terminateAccount(payload);
    } else {
      this.terminateAccountError('Invalid email');
    }
  };

  checkboxState = () => {
    const { terminateAccountStatus, markedConsequences, email } = this.context;
    if (markedConsequences && email) return false;
    return isLoading(terminateAccountStatus) || true;
  };

  handleEmailChange = e => {
    const { dispatch } = this.context;
    dispatch({ type: CHANGE_EMAIL, payload: e.target.value });
  };

  handleMarkedConsequences = () => {
    const { dispatch, markedConsequences } = this.context;
    dispatch({
      type: MARKED_CONSEQUENCES,
      payload: !markedConsequences,
    });
  };

  renderFormInputPasssword = () => {
    const { terminateAccountStatus } = this.context;
    const errorMessage = _.get(terminateAccountStatus, 'error', null);

    return (
      <div>
        <input
          type="text"
          placeholder="ross@example.com"
          style={{ width: '350px' }}
          onChange={this.handleEmailChange}
        />
        <span style={{ color: 'red' }}>{errorMessage}</span>
      </div>
    );
  };

  render() {
    const { onBackButton } = this.props;
    const { markedConsequences } = this.context;
    return (
      <div>
        <h1>Delete account</h1>
        <p>This action cannot be undone.</p>
        <div>Please enter your email: {this.renderFormInputPasssword()}</div>
        <div style={{ marginTop: '1rem' }}>
          <label htmlFor="consequences">
            <input
              id="consequences"
              name="consequences"
              type="checkbox"
              checked={markedConsequences}
              onChange={this.handleMarkedConsequences}
            />
            I understand the consequences.
          </label>
        </div>
        <div>
          <button type="button" onClick={onBackButton}>
            Back
          </button>
          <button
            type="button"
            disabled={this.checkboxState()}
            onClick={this.handleDeleteAccount}
          >
            Delete my account
          </button>
        </div>
      </div>
    );
  }
}

export default ConfirmEmailModal;
