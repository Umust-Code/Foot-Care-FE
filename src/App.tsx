import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Global } from '@emotion/react';
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
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Global styles={globalCss} />
      <MobileLayout>
        <RouterProvider router={AppRouter} />
      </MobileLayout>
    </QueryClientProvider>
  );
}

export default App;
