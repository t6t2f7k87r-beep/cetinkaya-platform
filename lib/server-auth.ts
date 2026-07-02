export const ADMIN_EMAIL = "ctk.burakberke@gmail.com";
export const ADMIN_AUTH_COOKIE = "cetinkaya-admin-auth";

const ADMIN_CREDENTIAL_HASH =
  process.env.ADMIN_CREDENTIAL_HASH?.trim();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD?.trim();
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET?.trim();

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyAdminCredentials(email: string, password: string) {
  if ((!ADMIN_CREDENTIAL_HASH && !ADMIN_PASSWORD) || !ADMIN_SESSION_SECRET) {
    return false;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  if (normalizedEmail !== ADMIN_EMAIL) {
    return false;
  }

  if (ADMIN_PASSWORD && cleanPassword === ADMIN_PASSWORD) {
    return true;
  }

  return (await sha256(`${normalizedEmail}:${cleanPassword}`)) === ADMIN_CREDENTIAL_HASH;
}

export async function getAdminSessionToken() {
  if ((!ADMIN_CREDENTIAL_HASH && !ADMIN_PASSWORD) || !ADMIN_SESSION_SECRET) {
    return "";
  }

  const credentialSeed = ADMIN_CREDENTIAL_HASH ?? (await sha256(`${ADMIN_EMAIL}:${ADMIN_PASSWORD}`));

  return sha256(`${credentialSeed}:${ADMIN_SESSION_SECRET}`);
}

export async function isValidAdminToken(token?: string) {
  if (!token) {
    return false;
  }

  return token === (await getAdminSessionToken());
}
