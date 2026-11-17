import type { Metadata } from 'next';
import './globals.css';
import { PortalProvider } from '@/lib/store/portal-context';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { ToastContainer } from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: 'LiliSphere — LiliSare Unified Healthcare & Caregiver Operations Platform',
  description: 'Ultra-Premium Unified EHR, EVV, Onboarding, and Compliance Portal for Mountain Lane and Colorado Home Health.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex flex-col antialiased">
        <PortalProvider>
          <Header />
          <div className="flex-1 flex overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
          <ToastContainer />
        </PortalProvider>
      </body>
    </html>
  );
}
