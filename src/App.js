import React from 'react';
import { Router } from 'react-router-dom';
import './Config/ReactotronConfig';
import { Provider } from 'react-redux';
import GlobalStyle from './Styles/global';

import Routes from './Routes';
import history from './Services/history';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
        <GlobalStyle />
      </Router>
    </Provider>
  );
}

export default App;
