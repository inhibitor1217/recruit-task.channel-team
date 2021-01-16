import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import store from '../store';
import { GlobalStyle } from '../styles';
import HomePage from './page/HomePage';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Provider store={store}>
        <HomePage />
      </Provider>
    </React.Fragment>
  );
};

export default hot(App);
