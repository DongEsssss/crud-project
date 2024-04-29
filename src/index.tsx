import React from 'react';
import ReactDOM from 'react-dom/client';

import AuthorizingRouter from './components/AuthorizingRouter';

const root = ReactDOM.createRoot(
  document.getElementById('app') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthorizingRouter />
  </React.StrictMode>
);

