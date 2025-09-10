import { initializeApp, getApps, getApp } from 'firebase/app';
import { clientConfig } from './config.ts';
import { getAuth } from '@firebase/auth';

export const app = !getApps().length ? initializeApp(clientConfig) : getApp();
export const auth = getAuth(app);
