export function createToken(userId: string) {
  const payload = {
    sub: userId,
    iat: Date.now(),
  };

  return btoa(JSON.stringify(payload));
}

export function parseToken(token: string): string | null {
  try {
    const { sub } = JSON.parse(atob(token));
    return sub;
  } catch {
    return null;
  }
}
