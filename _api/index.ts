export async function login(token: string) {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
  };

  await fetch('/_api/login', {
    method: 'GET',
    headers,
  });
}

export async function logout() {
  const headers: Record<string, string> = {};

  await fetch('/_api/logout', {
    method: 'GET',
    headers,
  });
}
