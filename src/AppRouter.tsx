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
import { MyFootCare } from 'views/layouts/mypage/myFootCare/MyFootCare';
import { AdminPostPage } from 'views/pages/AdminPost';
import { AdminCommentPage } from 'views/pages/AdminComment';
import { AdminUserData } from 'views/pages/AdminUserData';
import { AdminRoute } from 'views/components/PrivateRoute';
import { AdminPanel } from 'views/layouts/AdminPanel';
import { Shopping } from 'views/pages/Shopping';

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
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminPanel />
      </AdminRoute>
    ),
    children: [
      {
        path: '/admin/post',
        element: <AdminPostPage />,
      },
      {
        path: '/admin/comment',
        element: <AdminCommentPage />,
      },
      {
        path: '/admin/userdata',
        element: <AdminUserData />,
      },
    ],
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
        path: '/shopping',
        element: <Shopping />,
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
        element: <MyFootCare />,
      },
      // {
      //   path: '/admin',
      //   element: <AdminPage />,
      // },
    ],
    errorElement: <ErrorPage />,
  },
]);

export { AppRouter };
