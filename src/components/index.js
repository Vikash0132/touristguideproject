import React from 'react';
import ReactDOM from 'react-dom/client';  // updated import
import './app.css';  // Import the global styles
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // updated method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
