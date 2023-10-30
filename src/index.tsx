import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './login-components/context/AuthProvider';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
    </BrowserRouter>
  </AuthProvider>
);
