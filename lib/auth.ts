"use client";

const ADMIN_EMAIL = "ctk.burakberke@gmail.com";
const ADMIN_CREDENTIAL_HASH =
  "2af6f8c5c84bc3e8925d7f1984d7fc8b46e68c538dada69e58f714a8e4e6d6af";
const SESSION_KEY = "cetinkaya-admin-session";
const LEGACY_SESSION_KEY = "cetinkaya-session";
const SESSION_VALUE = "active";

function isBrowser() {
  return typeof window !== "undefined";
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
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
}

export function endAdminSession() {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(LEGACY_SESSION_KEY);
}

export async function verifyAdminCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail !== ADMIN_EMAIL) {
    return false;
  }

  const hash = await sha256(`${normalizedEmail}:${password}`);
  return hash === ADMIN_CREDENTIAL_HASH;
}

export { ADMIN_EMAIL };
