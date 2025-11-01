'use client';

import * as React from 'react';
import { AuthContext } from './AuthContext';
import type { UserInfo } from 'firebase/auth';

export interface AuthProviderProps {
  user: UserInfo | null;
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  user,
  children,
}) => {
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
