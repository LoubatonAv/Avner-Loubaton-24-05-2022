import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import './assets/scss/main.scss';

import { RootCmp } from './RootCmp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RootCmp />
  </Provider>
);

//https://www.youtube.com/watch?v=N0DhCV_-Qbg&ab_channel=Academind -react 18 guide

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
