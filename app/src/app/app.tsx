import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import { queryClient } from './react-query/client';
import Router from './router';

const theme = createTheme();

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

export function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <Router />
          <ReactQueryDevtools />
        </ThemeProvider>
      </I18nextProvider>
    </PersistQueryClientProvider>
  );
}

export default App;
