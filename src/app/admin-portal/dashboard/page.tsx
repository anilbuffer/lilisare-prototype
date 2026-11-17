import React from 'react';
import { Metadata } from 'next';
import { AdminPortal } from '@/components/portals/AdminPortal';

export const metadata: Metadata = {
  title: 'Executive Dashboard — LiliSphere Operations Control',
  description: 'Executive management overview and operational workflows for LiliSare healthcare.',
};

export default function DashboardPage() {
  return <AdminPortal />;
}
