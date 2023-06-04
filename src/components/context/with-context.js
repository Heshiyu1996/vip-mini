import React from 'react';

const Context = React.createContext({});

const { Provider, Consumer } = Context;

const withContext = Component => props => (
  <Consumer>{value => <Component {...props} {...value} />}</Consumer>
);

export { Provider, withContext };
