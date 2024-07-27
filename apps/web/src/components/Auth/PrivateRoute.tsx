import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const auth = useAuth();

  if (!auth) {
    return <div>Loading...</div>;
  }

  const { user, loading } = auth;

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
