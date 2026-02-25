const TOKEN_KEY = "token";
const ROLE_KEY = "role";

export function saveToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function saveRole(role) {
  if (!role) {
    localStorage.removeItem(ROLE_KEY);
    return;
  }
  localStorage.setItem(ROLE_KEY, role);
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}
