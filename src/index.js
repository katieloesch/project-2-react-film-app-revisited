import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter as Router } from "react-router-dom";
import './index.css';
import { AuthProvider } from './contexts/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>

    </Router>
 
);
