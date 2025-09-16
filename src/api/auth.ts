import { createToken } from "../utils/tokens.js";
import type { User } from "../types/user";
import { apiClient } from "../lib/apiClient";

const USERS_URL = "/users.json";

export async function fetchUsers(): Promise<User[]> {
  const response = await apiClient.get<User[]>(USERS_URL);
  return response.data;
}

export interface LoginResult {
  token: string | null;
}

export async function loginRequest(
  email: string,
  password: string
): Promise<LoginResult | null> {
  const users = await fetchUsers();

  const user = users.find(
    (u: User) => u.email === email && u.password === password
  );

  if (!user) {
    return null;
  }

  const token = createToken(user.id);
  return { token };
}
