import { describe, expect, test } from 'vitest';
import type { DecodedIdToken } from 'next-firebase-auth-edge/auth';
import { tokensToUser } from '@/shared/lib/utils/tokensToUser.ts';

describe('tokensToUser', () => {
  test('Changes object to user type', () => {
    const decodedToken: DecodedIdToken = {
      email: 'email',
      name: 'name',
      uid: 'uid',
      phoneNumber: '123',
      photoURL: '123',
      providerId: '123',
      aud: 'your-audience-value',
      auth_time: 1672531200,
      exp: 1672534800,
      firebase: {
        identities: {},
        sign_in_provider: 'custom',
      },
      source_sign_in_provider: 'custom',
      iat: 1672531200,
      iss: 'https://securetoken.google.com/your-project-id',
      sub: 'user-uid',
    };

    const expectedOutput = {
      email: decodedToken.email || null,
      displayName: decodedToken.name || null,
      uid: decodedToken.uid,
      phoneNumber: null,
      photoURL: null,
      providerId: '',
    };

    const output = tokensToUser({
      decodedToken: decodedToken,
      customToken: '',
      metadata: {},
      token: '',
    });

    expect(output).toEqual(expectedOutput);
  });
});
