import { type ReactNode } from "react";
import AuthContext from "./AuthContext";
import { useMe } from "../queries/authQueries";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { data: user } = useMe();

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
