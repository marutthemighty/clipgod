'use client';
import { ReactNode } from 'react';
import { useAppStore } from '@/stores/useAppStore';

export const Provider = ({ children }: { children: ReactNode }) => {
  useAppStore(); // Init store
  return <>{children}</>;
};
