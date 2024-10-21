import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';
import { Global } from '@emotion/react';
import { ConfigProvider } from 'antd';
import { antdLightTheme } from 'styles/antdTheme';
import { message } from 'antd';
import { globalCss } from 'styles/globalStyle';
import { AppRouter } from 'AppRouter';
import { MobileLayout } from 'views/layouts/MobileLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => message.error(error.message),
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ConfigProvider theme={antdLightTheme}>
        <Global styles={globalCss} />
        <MobileLayout>
          <RouterProvider router={AppRouter} />
        </MobileLayout>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
