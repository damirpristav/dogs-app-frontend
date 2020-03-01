import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './App.scss';
import store from './store/store';

import Routes from './Routes';

import stayLoggedIn from './utils/stayLoggedIn';

stayLoggedIn();

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
        <div className="App">
          <Routes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
