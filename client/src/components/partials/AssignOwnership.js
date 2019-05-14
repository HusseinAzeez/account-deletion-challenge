import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import * as LoadState from '../LoadState';
import { DataConumer } from '../../context/Data';

const AssignOwnership = props => {
  const getAddedMember = () => {
    const { workspace, transferData } = props;
    return _.chain(transferData)
      .reject(LoadState.isError || LoadState.isLoading)
      .find(assign => assign.workspaceId === workspace.spaceId)
      .get('toUser._id', '')
      .value();
  };

  const handleChange = e => {
    const { workspace, handleAssignToUser } = props;
    const user = workspace.transferableMembers.find(
      user => user._id === e.target.value,
    );
    handleAssignToUser(workspace, user);
  };

  const { workspace } = props;
  return (
    <DataConumer>
      {() => {
        return (
          <div style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            <select
              value={getAddedMember()}
              onChange={handleChange}
              style={{ minWidth: '3rem' }}
            >
              <option value="" disabled />
              {workspace.transferableMembers.map(user => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        );
      }}
    </DataConumer>
  );
};

// Add required and objectOf/arrayOf
AssignOwnership.propTypes = {
  workspace: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array]),
  ),
  transferData: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAssignToUser: PropTypes.func.isRequired,
};

export default AssignOwnership;
