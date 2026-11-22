import { cookies } from "next/headers";
import crypto from "crypto";
import { userRepo, DbUser } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "nexora_super_secure_jwt_secret_token_2026_key";
const COOKIE_NAME = "nexora_session";

// Base64Url helpers for lightweight, zero-dependency JWT implementation
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString();
}

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + JWT_SECRET).digest("hex");
}

export interface SessionPayload {
  userId: string;
  email: string;
  role: "customer" | "admin";
  name: string;
  exp: number;
}

export function signSessionToken(payload: Omit<SessionPayload, "exp">, expiresInHours = 72): string {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + expiresInHours * 3600;
  const fullPayload: SessionPayload = { ...payload, exp };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${headerB64}.${payloadB64}`)
      .digest("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    if (signatureB64 !== expectedSignature) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(base64UrlDecode(payloadB64));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }

    return payload;
  } catch (err) {
    return null;
  }
}

export async function getSessionUser(request?: Request): Promise<DbUser | null> {
  let token: string | undefined;

  // 1. Try Authorization header
  if (request) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  // 2. Try Cookie
  if (!token) {
    try {
      const cookieStore = cookies();
      const cookieVal = cookieStore.get(COOKIE_NAME);
      if (cookieVal) {
        token = cookieVal.value;
      }
    } catch {
      // Cookies not available outside SSR context
    }
  }

  if (!token) return null;

  const payload = verifySessionToken(token);
  if (!payload) return null;

  const user = await userRepo.getById(payload.userId);
  return user;
}

export async function requireAuth(request?: Request): Promise<DbUser> {
  const user = await getSessionUser(request);
  if (!user) {
    const error = new Error("Unauthorized access. Please sign in.");
    (error as any).statusCode = 401;
    throw error;
  }
  return user;
}

export async function requireAdmin(request?: Request): Promise<DbUser> {
  const user = await requireAuth(request);
  if (user.role !== "admin") {
    const error = new Error("Forbidden: Administrator privileges required.");
    (error as any).statusCode = 403;
    throw error;
  }
  return user;
}

export async function setSessionCookie(user: DbUser) {
  const token = signSessionToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    name: user.fullName,
  });

  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 72 * 3600, // 3 days
  });

  return token;
}

export async function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}
