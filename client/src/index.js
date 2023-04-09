import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import client from './utils/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

ReactDOM.render(
  <ApolloProvider client={client}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
