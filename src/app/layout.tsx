import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
// import { GeistMono } from 'geist/font/mono'; // Removed as it causes a build error and is not strictly essential
import './globals.css';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import { Toaster } from "@/components/ui/toaster";

const geistSans = GeistSans;
// const geistMono = GeistMono; // Removed

export const metadata: Metadata = {
  title: 'Superlógica Dashboard',
  description: 'Dashboard de Desempenho, Lucro, Perdas e Métricas Operacionais',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply 'dark' class for default dark theme.
    // User requested "Paralucent" font. If you have this font,
    // you can configure it here or in globals.css.
    // Currently using Geist Sans as a modern default.
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} font-sans antialiased bg-background text-foreground`}> {/* Removed geistMono.variable */}
        <SidebarProvider defaultOpen={true}>
          <AppSidebar />
          <SidebarInset>
            {children}
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
