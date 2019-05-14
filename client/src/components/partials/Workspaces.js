// Third-party imports
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Workspaces = props => {
  const { isDisplay, workspaces, title, children } = props;
  return isDisplay ? (
    <Fragment>
      <h3>{title}</h3>
      {workspaces.map(workspace => (
        <div key={workspace.spaceId} style={{ marginTop: '1rem' }}>
          <span>Workspace: {workspace.displayName}</span>
          {React.Children.count(children) === 0
            ? null
            : React.cloneElement(children, { workspace })}
        </div>
      ))}
    </Fragment>
  ) : null;
};

Workspaces.propTypes = {
  title: PropTypes.string.isRequired,
  workspaces: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node,
  isDisplay: PropTypes.bool.isRequired,
};

export default Workspaces;
