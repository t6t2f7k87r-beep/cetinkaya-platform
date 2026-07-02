export const ADMIN_EMAIL = "ctk.burakberke@gmail.com";
export const ADMIN_AUTH_COOKIE = "cetinkaya-admin-auth";

const ADMIN_CREDENTIAL_HASH =
  process.env.ADMIN_CREDENTIAL_HASH ??
  "2af6f8c5c84bc3e8925d7f1984d7fc8b46e68c538dada69e58f714a8e4e6d6af";
const ADMIN_SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ??
  "cetinkayalar-admin-session-v1-rotate-in-vercel-env";

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyAdminCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail !== ADMIN_EMAIL) {
    return false;
  }

  return (await sha256(`${normalizedEmail}:${password}`)) === ADMIN_CREDENTIAL_HASH;
}

export async function getAdminSessionToken() {
  return sha256(`${ADMIN_CREDENTIAL_HASH}:${ADMIN_SESSION_SECRET}`);
}

export async function isValidAdminToken(token?: string) {
  if (!token) {
    return false;
  }

  return token === (await getAdminSessionToken());
}
