import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "bulma/css/bulma.css";
import App from './App.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>,
);
