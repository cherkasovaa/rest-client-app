import { clientConfig } from '@/shared/config/firebaseConfig.ts';
import { getAuth, inMemoryPersistence, setPersistence } from '@firebase/auth';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

export const db = getFirestore(getFirebaseApp());
