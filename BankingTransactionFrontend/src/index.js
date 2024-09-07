import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from './store/ConfigureStore';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore()

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <Provider store={store}>
      <App />
  </Provider>
);

reportWebVitals();
