import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { antdConfigProviderTheme } from '../antd-theme.ts';
import { AppContextProvider } from './contexts/AppContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={antdConfigProviderTheme}>
      <BrowserRouter>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
);
