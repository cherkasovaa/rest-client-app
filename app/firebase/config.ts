import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { clientConfig } from '../../config.ts';

export const app = !getApps().length ? initializeApp(clientConfig) : getApp();
export const auth = getAuth(app);
