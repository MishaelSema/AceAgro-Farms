import { cookies } from 'next/headers';
import crypto from 'crypto';

const ADMIN_TOKEN_COOKIE = 'ace_admin_session';
const SECRET_KEY = process.env.ADMIN_PASSWORD || 'ace-agro-secret-key';

export interface AdminSession {
  username: string;
  loginTime: number;
  expiresAt: number;
}

export function createSessionToken(username: string): string {
  const session: AdminSession = {
    username,
    loginTime: Date.now(),
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  };
  
  const payload = Buffer.from(JSON.stringify(session)).toString('base64');
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(payload)
    .digest('hex');
  
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string): AdminSession | null {
  try {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return null;
    
    const expectedSignature = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(payload)
      .digest('hex');
    
    if (signature !== expectedSignature) return null;
    
    const session: AdminSession = JSON.parse(
      Buffer.from(payload, 'base64').toString('utf-8')
    );
    
    if (Date.now() > session.expiresAt) return null;
    
    return session;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)?.value;
  
  if (!token) return null;
  
  return verifySessionToken(token);
}

export function getSessionCookieName(): string {
  return ADMIN_TOKEN_COOKIE;
}
