// Third-party imports
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

// Local imports
import { DataContext } from '../../context/Data';
import { checkOwnershipService } from '../FakeServices';
import { pending } from '../LoadState';
import { ASSIGN_TO_USER, LOADING, ERROR, COMPLETED } from '../../context/Types';
import Workspaces from '../partials/Workspaces';
import AssignOwnership from '../partials/AssignOwnership';

class TransferOwnershipModal extends Component {
  static contextType = DataContext;
  static propTypes = {
    nextPage: PropTypes.func.isRequired,
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

  assignToUser = (workspace, user) => {
    const { dispatch } = this.context;
    // Used built-in filter method instead of lodash reject
    const assigns = this.getTransferData();
    assigns.filter(assign => assign.workspaceId !== workspace.spaceId);
    dispatch({
      type: ASSIGN_TO_USER,
      payload: {
        transferData: [
          ...assigns,
          {
            workspaceId: workspace.spaceId,
            toUser: user,
            ...pending,
          },
        ],
      },
    });
  };

  handleAssignToUser = async (workspace, toUser) => {
    const { dispatch, user } = this.context;
    // Dispatch loading action
    dispatch({ type: LOADING, payload: { workspace, toUser } });
    // Set the request's parameters
    const request = {
      workspaceId: workspace.spaceId,
      fromUserId: user._id,
      toUserId: toUser._id,
    };
    // Call the fake server response
    const response = await checkOwnershipService(request);
    // Handle server response
    response.status === 200
      ? dispatch({
          type: COMPLETED,
          payload: { workspace, user },
        })
      : dispatch({ type: ERROR, payload: { workspace, user } });

    this.assignToUser(workspace, user);
  };

  render() {
    const {
      loading,
      requiredTransferWorkspaces,
      deleteWorkspaces,
      user,
    } = this.context;
    const { nextPage } = this.props;
    const transferData = this.getTransferData();
    const totalAssigned = transferData.length;
    const totalWorkspaceTransfer = requiredTransferWorkspaces.length;
    const totalWorkspaceDelete = deleteWorkspaces.length;
    const disabledNextPage = totalAssigned < totalWorkspaceTransfer || loading;
    return (
      <div>
        <h1>Transfer ownership</h1>
        <p>
          Before you leaving, it is required to transfer your tasks, projects
          and workspace admin rights to other person.
        </p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Fragment>
            <Workspaces
              title="The following workspaces require ownership transfer:"
              workspaces={requiredTransferWorkspaces}
              isDisplay={totalWorkspaceTransfer > 0}
            >
              <AssignOwnership
                user={user}
                transferData={this.getTransferData()}
                handleAssignToUser={this.handleAssignToUser}
              />
            </Workspaces>
            <Workspaces
              title="The following workspaces will be deleted:"
              workspaces={deleteWorkspaces}
              isDisplay={totalWorkspaceDelete > 0}
            />
          </Fragment>
        )}
        <button type="button" disabled={disabledNextPage} onClick={nextPage}>
          Next
        </button>
      </div>
    );
  }
}

export default TransferOwnershipModal;
