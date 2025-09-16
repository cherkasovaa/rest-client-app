import type { Tokens } from 'next-firebase-auth-edge';
import type { UserInfo } from 'firebase/auth';

export function tokensToUser(tokens: Tokens): UserInfo {
  const { decodedToken } = tokens;

  return {
    email: decodedToken.email || null,
    displayName: decodedToken.name || null,
    uid: decodedToken.uid,
    phoneNumber: null,
    photoURL: null,
    providerId: '',
  };
}
