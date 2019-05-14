const STATUS_PENDING = 'pending'; // Nothing is loaded yet.
const STATUS_FETCHING = 'fetching'; // Loading the first time or after error.
const STATUS_COMPLETED = 'completed'; // Data loaded successfully.
const STATUS_REFRESHING = 'refreshing'; // Data is already loaded but is refreshing.
const STATUS_ERROR = 'error'; // Load error.

// Removed unused status
export const pending = { status: STATUS_PENDING };
export const completed = { status: STATUS_COMPLETED };
export const error = STATUS_ERROR;
const initWithError = error => ({ status: STATUS_ERROR, error });

export const isError = state => state.status === STATUS_ERROR;
export const isLoading = state =>
  state.status === STATUS_PENDING ||
  state.status === STATUS_FETCHING ||
  state.status === STATUS_REFRESHING;
export const handleLoaded = () => completed;
export const handleLoadFailedWithError = error => {
  const nextState = initWithError(error);
  return () => nextState;
};
