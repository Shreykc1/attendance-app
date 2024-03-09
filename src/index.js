import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/login';
import App from './pages/app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
     navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
       // Registration was successful
       console.log('ServiceWorker registration successful with scope: ', registration.scope);
     }, function(err) {
       // registration failed :(
       console.log('ServiceWorker registration failed: ', err);
     });
  });
 }
 
root.render(

  <React.StrictMode>
    
    <App />
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
