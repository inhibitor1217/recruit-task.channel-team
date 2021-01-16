import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import store from '../store';
import { GlobalStyle } from '../styles';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Provider store={store}>
        <h1>Hello, world!</h1>
      </Provider>
    </React.Fragment>
  );
};

export default hot(App);
