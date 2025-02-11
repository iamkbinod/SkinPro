import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // Import modular onAuthStateChanged
import { auth } from './firebase/auth'; // Your Firebase auth instance

// Initialize auth listener
onAuthStateChanged(auth, (user) => { // Pass auth instance to onAuthStateChanged
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
});
