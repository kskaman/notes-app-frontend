import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";
import { resetCollections } from "../api/store/reducers/collectionsReducer";
import { resetNotes } from "../api/store/reducers/notesReducer";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = ({ token }: { token: string }) => {
    console.log("Login token:", token);
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    navigate("/", { replace: true });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    resetCollections();
    resetNotes();
    navigate("/auth/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
