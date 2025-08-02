import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types/user";
import { loginRequest } from "../api/authApi";

const USER_KEY = ["auth", "user"];

// load user from local storage once at app start
function loadInitialUser(): User | null {
  const raw = localStorage.getItem("authUser");
  return raw ? JSON.parse(raw) : null;
}

export function useMe() {
  return useQuery<User | null>({
    queryKey: USER_KEY,
    queryFn: () => Promise.resolve(loadInitialUser()),
    staleTime: Infinity,
  });
}

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return loginRequest(email, password);
    },
    onSuccess: (user) => {
      localStorage.setItem("authUser", JSON.stringify(user.id));
      qc.setQueryData(USER_KEY, user);
    },
    onError: () => {
      localStorage.removeItem("authUser");
    },
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return () => {
    localStorage.removeItem("authUser");
    qc.setQueryData(USER_KEY, null);
  };
}
