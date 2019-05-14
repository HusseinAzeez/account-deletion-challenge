# Frontend Task

## Changes

- Update React to the latest major version **16.8.6**
  since there are many new features and deprecations.
- Add **eslint/prettier** plugins for better linting and code formatting.
- Removed types from the app since they never been used.
- Add App.js.
- Created **FakcServer** to mimic the server GET/POST request.
- Removed the server directory!.
- The state for most of the components were stored/updated locally or by render props,
  for such a reason it was hard for me to know which components were changing the state.
- Added the new **React's context API** to make the state more predictable
  and only change the state using the **dispatch method**.
- Rename **MokeDataProvider** into **context** and moved all the methods
  inside components that they were called.
- Moved elements such as button, checkbox, etc into separated components.
- Removed unused status from LoadState.js.
- Reducing the usage of **lodash** methods as much as possible by using native solutions.
- **Workspaces** and **assignOwnership** could be refactored into a more elegant way
  instead of using React **cloneElement** since it gets rendered twice. Once with undefined props.
