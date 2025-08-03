import { createContext, useContext } from "react";

interface AuthContextProps {
  accessToken: string | null;
  login: ({ token }: { token: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  accessToken: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
