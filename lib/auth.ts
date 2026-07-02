"use client";

const ADMIN_EMAIL = "ctk.burakberke@gmail.com";
const SESSION_KEY = "cetinkaya-admin-session";
const LEGACY_SESSION_KEY = "cetinkaya-session";
const SESSION_VALUE = "active";
export const AUTH_EVENT = "cetinkaya-auth-updated";

function isBrowser() {
  return typeof window !== "undefined";
}

export function isAdminSessionActive() {
  if (!isBrowser()) {
    return false;
  }

  return localStorage.getItem(SESSION_KEY) === SESSION_VALUE;
}

export function startAdminSession() {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(SESSION_KEY, SESSION_VALUE);
  localStorage.removeItem(LEGACY_SESSION_KEY);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function endAdminSession() {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(LEGACY_SESSION_KEY);
  void fetch("/api/auth/logout", {
    method: "POST",
    keepalive: true,
  }).catch(() => undefined);
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export async function loginAdmin(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return false;
  }

  startAdminSession();
  return true;
}

export async function syncAdminSession() {
  if (!isBrowser()) {
    return false;
  }

  const response = await fetch("/api/auth/session", {
    cache: "no-store",
  }).catch(() => null);
  const data = response?.ok ? ((await response.json()) as { active?: boolean }) : null;
  const active = Boolean(data?.active);

  if (active) {
    localStorage.setItem(SESSION_KEY, SESSION_VALUE);
  } else {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(LEGACY_SESSION_KEY);
  }

  window.dispatchEvent(new Event(AUTH_EVENT));
  return active;
}

export { ADMIN_EMAIL };
