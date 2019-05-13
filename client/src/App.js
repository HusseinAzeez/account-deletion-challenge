// Third-party imports
import React from 'react';

// Local imports
import { DataProvider } from './context/Data';
import TerminateModalFlow from './components/TerminateModal';

const App = () => {
  return (
    <DataProvider>
      <TerminateModalFlow />
    </DataProvider>
  );
};

export default App;
