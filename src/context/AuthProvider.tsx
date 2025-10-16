import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";
import { resetCollections } from "../api/store/reducers/collectionsReducer";
import { resetNotes } from "../api/store/reducers/notesReducer";
import { changeColorTheme } from "../api/userSettings";

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
    setAccessToken(null);
    resetCollections();
    resetNotes();
    document.documentElement.removeAttribute("data-font-theme");
    changeColorTheme("light");

    localStorage.removeItem("accessToken");
    navigate("/auth/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
