import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "bulma/css/bulma.css";
import App from './App.js';
import { AuthProvider } from './auth/AuthProvider.js'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
