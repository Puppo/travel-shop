import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import '@fontsource/roboto/300.css';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import '@fontsource/roboto/400.css';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import '@fontsource/roboto/500.css';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import '@fontsource/roboto/700.css';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
