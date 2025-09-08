import { initializeApp, getApps, getApp } from 'firebase/app';
import { clientConfig } from './config.ts';
import { getAuth, inMemoryPersistence, setPersistence } from '@firebase/auth';

export const getFirebaseApp = () => {
  if (getApps().length) {
    return getApp();
  }

  return initializeApp(clientConfig);
};

export function getFirebaseAuth() {
  const auth = getAuth(getFirebaseApp());

  setPersistence(auth, inMemoryPersistence);

  return auth;
}
