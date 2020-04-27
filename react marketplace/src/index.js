import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import {store} from "./state/initialStore";

// import axios from 'axios'
// TODO: temp solution

// let _token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdG9uYS1uZXcubmVyZHpsYWIuY29tXC92MVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1MzU3MjI4NTEsImV4cCI6Mzc1MzU3MjI4NTEsIm5iZiI6MTUzNTcyMjg1MSwianRpIjoiRUZUWk1JdUFJTFRMT1NoaSIsInN1YiI6NSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.uzQgdug91r8pWgfEmQdFOgHlm03w5LbFBWAp6vwjB2I'

// axios.interceptors.request.use(config => {
//     return {
//         ...config,
//         headers: {
//             'Content-Type' : 'application/json',
//             'Accept' : 'application/json',
//             'Authorization' : `Bearer ${_token}`
//         }
//     };
// }, error => {
//     return Promise.reject(error);
// })

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
