import { Navigate } from 'react-router-dom';
import { useAuthStore } from 'stores/authStore';
import { useAdminStore } from 'stores/authStore';
interface PrivateRouteProps {
  children: JSX.Element;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = useAuthStore((state) => state.isAuth);

  return auth ? children : <Navigate to="/signin" />;
}

function AdminRoute({ children }: PrivateRouteProps) {
  const isAdmin = useAdminStore((state) => state.isAdmin);

  return isAdmin ? children : <Navigate to="/" />;
}

export { PrivateRoute, AdminRoute };
