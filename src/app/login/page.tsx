import React from 'react';
import { LoginPage } from '@/components/auth/LoginPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In — LiliSphere Operations Control',
  description: 'Global home-based healthcare and support services operations platform.',
};

export default function Page() {
  return <LoginPage />;
}
