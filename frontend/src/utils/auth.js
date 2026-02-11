const ADMIN_KEY_STORAGE = "adminKey";
const GUEST_STORAGE = "guestLogged";

export function setAdminKey(key) {
  localStorage.setItem(ADMIN_KEY_STORAGE, key);
}

export function getAdminKey() {
  return localStorage.getItem(ADMIN_KEY_STORAGE) || "";
}

export function clearAdminKey() {
  localStorage.removeItem(ADMIN_KEY_STORAGE);
}

export function setGuestLogged(value) {
  localStorage.setItem(GUEST_STORAGE, value ? "true" : "false");
}

export function isGuestLogged() {
  return localStorage.getItem(GUEST_STORAGE) === "true";
}

export function logout() {
  clearAdminKey();
  setGuestLogged(false);
}
