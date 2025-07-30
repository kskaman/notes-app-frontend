import { useEffect, useState, type ReactNode } from "react";
import type { User } from "../types/user";
import AuthContext from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    me()
      .then((user) => setUser(user))
      .finally(() => setAuthLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, authLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
