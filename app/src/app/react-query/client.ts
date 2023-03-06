import { QueryCache, QueryClient } from '@tanstack/react-query';
import { trackError } from '@travel-shop-app/utils';

export const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  defaultOptions: {
    queries: {
      cacheTime: 15 * 60 * 1000, // 15 minutes
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      onError: (error) => {
        trackError(error);
      },
    },
    mutations: {
      onError: (error) => {
        trackError(error);
      },
    },
  },
});
