const sleep = milliseconds => {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
};

export const fetchWorkspacesService = async () => {
  if (Math.random() <= 0.5) {
    await sleep(2000);
  }
  return {
    requiredTransferWorkspaces: [
      {
        spaceId: 'workspace1',
        displayName: 'Lightning strike',
        transferableMembers: [
          {
            _id: 'user2',
            name: 'Ryan Lynch',
          },
          {
            _id: 'user3',
            name: 'Riker Lynch',
          },
          {
            _id: 'user4',
            name: 'Rydel Lynch',
          },
        ],
      },
      {
        spaceId: 'workspace2',
        displayName: 'Time machine',
        transferableMembers: [
          {
            _id: 'user5',
            name: 'Edward Bayer',
            workspaceId: 'workspace3',
          },
          {
            _id: 'user6',
            name: 'Eli Brook',
            workspaceId: 'workspace3',
          },
        ],
      },
    ],
    deleteWorkspaces: [
      {
        spaceId: 'workspace3',
        displayName: 'Moon landing',
      },
    ],
  };
};

export const checkOwnershipService = async request => {
  if (Math.random() <= 0.5) {
    await sleep(2000);
  }
  let response = {};
  if (!request.workspaceId || !request.fromUserId || !request.toUserId) {
    response = { status: 400 };
    return response;
  }
  return request.toUserId === 'user4'
    ? (response = { status: 409 })
    : (response = { status: 200 });
};

export const terminateAccountService = async () => {
  let response = {};
  // Simulate a slowness
  if (Math.random() <= 0.5) {
    await sleep(2000);
  }

  // Simulate an internal server error
  if (Math.random() <= 0.1) {
    response = { status: 500 };
    return response;
  }

  return (response = { status: 200 });
};

export const submitSurveyService = async request => {
  let response = {};
  // Simulate a slowness
  if (Math.random() <= 0.5) {
    await sleep(2000);
  }

  // Simulate an internal server error
  if (Math.random() <= 0.1) {
    response = { status: 500 };
    return response;
  }
  return request ? (response = { status: 200 }) : (response = { status: 400 });
};
