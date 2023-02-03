import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import singleSpaReact from 'single-spa-react';
import ReactDOM from 'react-dom';
import { FatalError } from 'juicyfront';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import store from './store';
import { domElementGetter } from './helpers';
import history from './store/history';

const Main: FC = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
};

export default Main;

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: Main,
  domElementGetter: domElementGetter,
  errorBoundary(err, info, props) {
    console.log('---------------');
    console.log(err);
    console.log(info);
    console.log(props);
    console.log('---------------');
    // https://reactjs.org/docs/error-boundaries.html
    return <FatalError />;
  },
});

export const { bootstrap } = reactLifecycles;
export const { mount } = reactLifecycles;
export const { unmount } = reactLifecycles;
