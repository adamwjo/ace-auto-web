'use client';

import React from 'react';
import { CustomerAuthProvider } from './CustomerAuthContext';
import { TechAuthProvider } from './TechAuthContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CustomerAuthProvider>
      <TechAuthProvider>{children}</TechAuthProvider>
    </CustomerAuthProvider>
  );
}
