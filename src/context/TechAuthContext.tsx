'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { TechUser } from '../mocks/serviceApi';
import { listTechUsers } from '../mocks/serviceApi';

interface TechAuthContextValue {
  tech: TechUser | null;
  loading: boolean;
  loginWithCredentials: (email: string, password: string) => Promise<boolean>;
  quickLoginAs: (role: 'admin' | 'tech', emailHint?: string) => Promise<void>;
  logout: () => void;
  availableTechs: TechUser[];
}

const TechAuthContext = createContext<TechAuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'aceauto-tech-auth';

// For the POC, we simply validate password by convention based on email.
function validatePassword(email: string, password: string): boolean {
  const normalized = email.toLowerCase();
  if (normalized === 'admin@aceauto.example') return password === 'demo-admin';
  if (normalized === 'tech.jordan@aceauto.example') return password === 'demo-tech-1';
  if (normalized === 'tech.riley@aceauto.example') return password === 'demo-tech-2';
  return false;
}

export function TechAuthProvider({ children }: { children: React.ReactNode }) {
  const [tech, setTech] = useState<TechUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableTechs] = useState<TechUser[]>(() => listTechUsers());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setLoading(false);
        return;
      }
      const parsed = JSON.parse(raw) as TechUser;
      setTech(parsed ?? null);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (tech) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tech));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [tech]);

  async function loginWithCredentials(email: string, password: string): Promise<boolean> {
    const all = listTechUsers();
    const match = all.find((t) => t.email.toLowerCase() === email.toLowerCase());
    if (!match) return false;
    if (!validatePassword(email, password)) return false;
    setTech(match);
    return true;
  }

  async function quickLoginAs(role: 'admin' | 'tech', emailHint?: string) {
    const all = listTechUsers();
    let match: TechUser | undefined;
    if (emailHint) {
      match = all.find((t) => t.email.toLowerCase() === emailHint.toLowerCase() && t.role === role);
    }
    if (!match) {
      match = all.find((t) => t.role === role);
    }
    if (match) {
      setTech(match);
    }
  }

  function logout() {
    setTech(null);
  }

  const value: TechAuthContextValue = {
    tech,
    loading,
    loginWithCredentials,
    quickLoginAs,
    logout,
    availableTechs,
  };

  return <TechAuthContext.Provider value={value}>{children}</TechAuthContext.Provider>;
}

export function useTechAuth(): TechAuthContextValue {
  const ctx = useContext(TechAuthContext);
  if (!ctx) {
    throw new Error('useTechAuth must be used within a TechAuthProvider');
  }
  return ctx;
}
