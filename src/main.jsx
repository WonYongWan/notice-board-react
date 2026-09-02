import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './assets/styles/global.scss';
import 'pretendard/dist/web/static/pretendard.css';
import App from './App.jsx';
import { AuthProvider } from './context/auth/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
