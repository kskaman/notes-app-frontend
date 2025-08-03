export function createToken(userId: number) {
  const payload = {
    sub: userId,
    iat: Date.now(),
  };

  return btoa(JSON.stringify(payload));
}

export function parseToken(token: string): number | null {
  try {
    const { sub } = JSON.parse(atob(token));
    return sub;
  } catch {
    return null;
  }
}
