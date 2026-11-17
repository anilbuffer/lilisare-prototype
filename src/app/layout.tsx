import type { Metadata } from 'next';
import './globals.css';
import { PortalProvider } from '@/lib/store/portal-context';
import { AppContentWrapper } from '@/components/layout/AppContentWrapper';
import { ToastContainer } from '@/components/ui/ToastContainer';

export const metadata: Metadata = {
  title: 'LiliSare — Get Paid to Care for Your Loved Ones at Home',
  description: 'Colorado Family Caregiver Program (IHSS, CNA, HMA, Personal Care). Because the Best Care starts with Family!',
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
          <AppContentWrapper>
            {children}
          </AppContentWrapper>
          <ToastContainer />
        </PortalProvider>
      </body>
    </html>
  );
}
