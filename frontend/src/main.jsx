import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // <-- Import Tailwind-enabled CSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
