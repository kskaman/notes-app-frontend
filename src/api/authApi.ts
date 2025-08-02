import { apiClient } from "../lib/apiClient";
import type { User } from "../types/user";

const USERS_URL = "/users.json";

async function fetchUsers(): Promise<User[]> {
  const response = await apiClient.get<User[]>(USERS_URL);
  return response.data;
}

export async function loginRequest(
  email: string,
  password: string
): Promise<User> {
  const users = await fetchUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  return user;
}
