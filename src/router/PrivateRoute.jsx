import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/auth/useAuth';

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
