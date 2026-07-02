export const ADMIN_EMAIL = "ctk.burakberke@gmail.com";
export const ADMIN_AUTH_COOKIE = "cetinkaya-admin-auth";

const ADMIN_CREDENTIAL_HASH =
  process.env.ADMIN_CREDENTIAL_HASH;
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyAdminCredentials(email: string, password: string) {
  if (!ADMIN_CREDENTIAL_HASH || !ADMIN_SESSION_SECRET) {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail !== ADMIN_EMAIL) {
    return false;
  }

  return (await sha256(`${normalizedEmail}:${password}`)) === ADMIN_CREDENTIAL_HASH;
}

export async function getAdminSessionToken() {
  if (!ADMIN_CREDENTIAL_HASH || !ADMIN_SESSION_SECRET) {
    return "";
  }

  return sha256(`${ADMIN_CREDENTIAL_HASH}:${ADMIN_SESSION_SECRET}`);
}

export async function isValidAdminToken(token?: string) {
  if (!token) {
    return false;
  }

  return token === (await getAdminSessionToken());
}
