import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './index.scss';
import {BreakpointProvider} from './components/Breakpoints';

const queries = {
  sm: '(max-width: 575.98px)',
  md: '(max-width: 767.98px)',
  lg: '(max-width: 991.98px)',
  xl: '(max-width: 1199.98px)',
  xxl: '(max-width: 1385.98px)',
  // or: '(orientation: portrait)', // we can check orientation also
};

ReactDOM.render(
  <BreakpointProvider queries={queries}>
    <App />
  </BreakpointProvider>, document.getElementById('root'));
