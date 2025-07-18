import { memo } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';

import GlobalStyle from './globalStyle';
import AppRouter from './routers/AppRouter';

const App = (): JSX.Element => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: true,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        retry: 0,
        retryDelay: 3000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            colorText: '#24292D',
          },
        }}
      >
        <GlobalStyle />
        <AppRouter />
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default memo(App);
