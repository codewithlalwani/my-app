export function readStoredValue(key, fallback = null) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export function getCurrentUser() {
  const user = readStoredValue("currentUser");
  return user && user.token === 1 ? user : null;
}

export function getUsers() {
  const users = readStoredValue("users", []);
  return Array.isArray(users) ? users : [];
}
