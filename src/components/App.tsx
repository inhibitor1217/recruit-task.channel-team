import React from 'react';
import { hot } from 'react-hot-loader/root';

import { GlobalStyle } from '../styles';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <div>
        <h1>Hello, world!</h1>
      </div>
    </React.Fragment>
  );
};

export default hot(App);
