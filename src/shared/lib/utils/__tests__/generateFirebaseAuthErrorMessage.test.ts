import { describe, expect, test } from 'vitest';
import { generateFirebaseAuthErrorMessage } from '@/shared/lib/utils/generateFirebaseAuthErrorMessage.ts';

const firebaseAuthErrorMessages = {
  'auth/invalid-email': 'Invalid email address. Please enter a valid email.',
  'auth/user-not-found': 'User not found. Please check the email address.',
  'auth/wrong-password': 'Incorrect password. Please try again.',
  'auth/email-already-in-use':
    'Email already in use. Please try another email.',
  'auth/weak-password': 'Password should be at least 6 characters.',
  'auth/operation-not-allowed':
    'Operation not allowed. Please try again later.',
  'auth/invalid-verification-code':
    'Invalid verification code. Please try again.',
  'auth/invalid-verification-id': 'Invalid verification ID. Please try again.',
  'auth/code-expired': 'Code expired. Please try again.',
  'auth/invalid-action-code': 'Invalid action code. Please try again.',
  'auth/user-disabled': 'User disabled. Please contact support.',
  'auth/invalid-credential': 'Invalid credential. Please try again.',
  'auth/invalid-continue-uri': 'Invalid continue URL. Please try again.',
  'auth/unauthorized-continue-uri':
    'Unauthorized continue URL. Please try again.',
  'auth/missing-continue-uri': 'Missing continue URL. Please try again.',
  'auth/missing-verification-code':
    'Missing verification code. Please try again.',
  'auth/missing-verification-id': 'Missing verification ID. Please try again.',
  'auth/captcha-check-failed': 'Captcha check failed. Please try again.',
  'auth/invalid-phone-number': 'Invalid phone number. Please try again.',
  'auth/missing-phone-number': 'Missing phone number. Please try again.',
  'auth/quota-exceeded': 'Quota exceeded. Please try again.',
  'auth/missing-app-credential': 'Missing app credential. Please try again.',
  'auth/invalid-app-credential': 'Invalid app credential. Please try again.',
  'auth/session-expired': 'Session expired. Please try again.',
  'auth/missing-or-invalid-nonce':
    'Missing or invalid nonce. Please try again.',
  'auth/missing-client-identifier':
    'Missing client identifier. Please try again.',
  'auth/key-retrieval-failed': 'Key retrieval failed. Please try again.',
  'auth/invalid-oauth-provider': 'Invalid OAuth provider. Please try again.',
  'auth/invalid-oauth-client-id': 'Invalid OAuth client ID. Please try again.',
  'auth/invalid-cert-hash': 'Invalid cert hash. Please try again.',
  'auth/invalid-user-token': 'Invalid user token. Please try again.',
  'auth/invalid-custom-token': 'Invalid custom token. Please try again.',
  'auth/app-deleted': 'App deleted. Please try again.',
  'auth/app-not-authorized': 'App not authorized. Please try again.',
  'auth/argument-error': 'Argument error. Please try again.',
  'auth/invalid-api-key': 'Invalid API key. Please try again.',
  'auth/network-request-failed': 'Network request failed. Please try again.',
  'auth/requires-recent-login': 'Requires recent login. Please try again.',
  'auth/too-many-requests': 'Too many requests. Please try again.',
  'auth/unauthorized-domain': 'Unauthorized domain. Please try again.',
  'auth/user-token-expired': 'User token expired. Please try again.',
  'auth/web-storage-unsupported': 'Web storage unsupported. Please try again.',
  'auth/account-exists-with-different-credential':
    'Account exists with different credential. Please try again.',
  'auth/auth-domain-config-required':
    'Auth domain config required. Please try again.',
  'auth/cancelled-popup-request': 'Cancelled popup request. Please try again.',
  'auth/credential-already-in-use':
    'Credential already in use. Please try again.',
  'auth/custom-token-mismatch': 'Custom token mismatch. Please try again.',
  'auth/provider-already-linked': 'Provider already linked. Please try again.',
  'auth/timeout': 'Timeout. Please try again.',
  'auth/missing-android-pkg-name':
    'Missing Android package name. Please try again.',
  'auth/missing-ios-bundle-id': 'Missing iOS bundle ID. Please try again.',
  'auth/invalid-dynamic-link-domain':
    'Invalid dynamic link domain. Please try again.',
  'auth/invalid-persistence-type':
    'Invalid persistence type. Please try again.',
  'auth/unsupported-persistence-type':
    'Unsupported persistence type. Please try again.',
  'auth/invalid-oauth-client-secret':
    'Invalid OAuth client secret. Please try again.',
  'auth/invalid-argument': 'Invalid argument. Please try again.',
  'auth/invalid-creation-time': 'Invalid creation time. Please try again.',
  'auth/invalid-disabled-field': 'Invalid disabled field. Please try again.',
  'auth/invalid-display-name': 'Invalid display name. Please try again.',
  'auth/invalid-email-verified': 'Invalid email verified. Please try again.',
  'auth/invalid-hash-algorithm': 'Invalid hash algorithm. Please try again.',
  'auth/invalid-hash-block-size': 'Invalid hash block size. Please try again.',
  'auth/invalid-hash-derived-key-length':
    'Invalid hash derived key length. Please try again.',
  'auth/invalid-hash-key': 'Invalid hash key. Please try again.',
  'auth/invalid-hash-memory-cost':
    'Invalid hash memory cost. Please try again.',
  'auth/invalid-hash-parallelization':
    'Invalid hash parallelization. Please try again.',
  'auth/invalid-hash-rounds': 'Invalid hash rounds. Please try again.',
  'auth/invalid-hash-salt-separator':
    'Invalid hash salt separator. Please try again.',
  'auth/invalid-id-token': 'Invalid ID token. Please try again.',
  'auth/invalid-last-sign-in-time':
    'Invalid last sign in time. Please try again.',
  'auth/invalid-page-token': 'Invalid page token. Please try again.',
  'auth/invalid-password': 'Invalid password. Please try again.',
  'auth/invalid-password-hash': 'Invalid password hash. Please try again.',
  'auth/invalid-password-salt': 'Invalid password salt. Please try again.',
  'auth/invalid-photo-url': 'Invalid photo URL. Please try again.',
  'auth/invalid-provider-id': 'Invalid provider ID. Please try again.',
  'auth/invalid-session-cookie-duration':
    'Invalid session cookie duration. Please try again.',
  'auth/invalid-uid': 'Invalid UID. Please try again.',
  'auth/invalid-user-import': 'Invalid user import. Please try again.',
  'auth/invalid-provider-data': 'Invalid provider data. Please try again.',
  'auth/maximum-user-count-exceeded':
    'Maximum user count exceeded. Please try again.',
  'auth/missing-hash-algorithm': 'Missing hash algorithm. Please try again.',
  'auth/missing-uid': 'Missing UID. Please try again.',
  'auth/reserved-claims': 'Reserved claims. Please try again.',
  'auth/session-cookie-revoked': 'Session cookie revoked. Please try again.',
  'auth/uid-already-exists': 'UID already exists. Please try again.',
  'auth/email-already-exists': 'Email already exists. Please try again.',
  'auth/phone-number-already-exists':
    'Phone number already exists. Please try again.',
  'auth/project-not-found': 'Project not found. Please try again.',
  'auth/insufficient-permission': 'Insufficient permission. Please try again.',
  'auth/internal-error': 'Internal error. Please try again.',
};

const firebaseAuthErrorMessagesList = Object.entries(firebaseAuthErrorMessages);

describe('generateFirebaseAuthErrorMessage', () => {
  test.each(firebaseAuthErrorMessagesList)(
    'Check error text for $0 to be $1',
    (code, errorText) => {
      expect(generateFirebaseAuthErrorMessage(code)).toBe(errorText);
    }
  );
});
