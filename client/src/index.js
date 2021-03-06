// Third-party imports
import React from 'react';
import ReactDOM from 'react-dom';

// Local imports
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
