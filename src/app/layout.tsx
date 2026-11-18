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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 flex flex-col antialiased font-roboto">
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
