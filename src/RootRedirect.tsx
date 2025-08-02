import { Navigate } from "react-router";
import { useAuth } from "./hooks/useAuth";

const RootRedirect = () => {
  const { user } = useAuth();

  return <Navigate to={user ? "/notes" : "/auth"} replace />;
};

export default RootRedirect;
