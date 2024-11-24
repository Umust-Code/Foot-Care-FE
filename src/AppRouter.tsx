import { PrivateRoute } from 'views/components/PrivateRoute';
import { Signin } from 'views/pages/Signin.tsx';
import { createBrowserRouter } from 'react-router-dom';
import { MainPanel } from 'views/layouts/MainPanel';
import { ErrorPage } from 'views/pages/ErrorPage';
import { Home } from 'views/pages/Home';
import { Signup } from 'views/pages/Signup';
import { Survey } from 'views/pages/Survey';
import { Content } from 'views/pages/Content';
import { Post } from 'views/pages/Post';
import { Mypage } from 'views/pages/Mypage';
import { ChangeInfo } from 'views/pages/ChangeInfo';
import { LikePanel } from 'views/layouts/mypage/LikePanel';
import { MyChart } from 'views/layouts/mypage/MyChart';

const AppRouter = createBrowserRouter([
  {
    path: '/signin',
    element: <Signin />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/signup',
    element: <Signup />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <MainPanel />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/survey',
        element: <Survey />,
      },
      {
        path: '/content',
        element: <Content />,
      },
      {
        path: '/post',
        element: <Post />,
      },
      {
        path: '/mypage',
        element: <Mypage />,
      },
      {
        path: '/change-info',
        element: <ChangeInfo />,
      },
      {
        path: '/like',
        element: <LikePanel />,
      },
      {
        path: '/line-chart',
        element: <MyChart />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export { AppRouter };
