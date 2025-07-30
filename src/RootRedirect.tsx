import { Navigate } from "react-router";
import { useAuth } from "./hooks/useAuth";
import Loader from "./ui/Loader";

const RootRedirect = () => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <Loader />;

  return <Navigate to={user ? "/notes" : "/auth/login"} replace />;
};

export default RootRedirect;
