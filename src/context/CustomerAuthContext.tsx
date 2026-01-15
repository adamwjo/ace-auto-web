'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { CustomerUser } from '../mocks/serviceApi';
import { DEMO_CUSTOMERS as INTERNAL_DEMO_CUSTOMERS, ensureCustomer, findCustomerByEmail } from '../mocks/serviceApi';

// Re-export demo customers list for UI where needed
export const DEMO_CUSTOMERS = INTERNAL_DEMO_CUSTOMERS;

interface CustomerAuthContextValue {
  customer: CustomerUser | null;
  loading: boolean;
  loginWithEmail: (email: string, password?: string, nameOptional?: string) => Promise<void>;
  loginWithProvider: (provider: CustomerUser['authProvider']) => Promise<void>;
  logout: () => void;
}

const CustomerAuthContext = createContext<CustomerAuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'aceauto-customer-auth';

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<CustomerUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setLoading(false);
        return;
      }
      const parsed = JSON.parse(raw) as CustomerUser;
      setCustomer(parsed ?? null);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (customer) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(customer));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [customer]);

  async function loginWithEmail(email: string, _password?: string, nameOptional?: string) {
    // For now we simply ensure a customer exists with this email.
    const existing = findCustomerByEmail(email) ?? ensureCustomer(email, nameOptional, 'email');
    setCustomer(existing);
  }

  async function loginWithProvider(provider: CustomerUser['authProvider']) {
    // Simulate a third-party login by creating/finding a customer with a demo email.
    const demoEmail = provider === 'apple'
      ? 'apple.user@example.com'
      : provider === 'google'
        ? 'google.user@example.com'
        : 'driver.richmond@example.com';

    const user = findCustomerByEmail(demoEmail) ?? ensureCustomer(demoEmail, provider === 'apple' ? 'Apple User' : 'Google User', provider);
    setCustomer(user);
  }

  function logout() {
    setCustomer(null);
  }

  const value: CustomerAuthContextValue = {
    customer,
    loading,
    loginWithEmail,
    loginWithProvider,
    logout,
  };

  return <CustomerAuthContext.Provider value={value}>{children}</CustomerAuthContext.Provider>;
}

export function useCustomerAuth(): CustomerAuthContextValue {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) {
    throw new Error('useCustomerAuth must be used within a CustomerAuthProvider');
  }
  return ctx;
}
