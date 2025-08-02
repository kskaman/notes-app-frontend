import { createContext } from "react";
import type { User } from "../types/user";

interface AuthContextProps {
  user: User | null | undefined;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
});

export default AuthContext;
