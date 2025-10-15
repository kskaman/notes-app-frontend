import users from "../data/users.json";
import { createToken } from "../utils";

export interface LoginResult {
  token: string | null;
}

export async function loginRequest(
  email: string,
  password: string
): Promise<LoginResult | null> {
  console.log(users);
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return null;
  }

  const token = createToken(user.id);
  return { token };
}
