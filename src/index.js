// import React from 'react';
// import ReactDOM from 'react-dom';
// import './styles/index.css';
// import App from './components/App';
//
//
// ReactDOM.render(
//  <App />,
//  document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import store from './store/stores';
import './styles/index.css';

ReactDOM.render(
 <Provider store={store}>
  <App />
 </Provider> ,
 document.getElementById('root'));
