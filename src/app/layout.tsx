import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Analytics } from "@vercel/analytics/next"
// Optimize font loading for Core Web Vitals (SEO)
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Global SEO Configuration
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Blenra | The Ultimate AI Prompt Directory',
    template: '%s | Blenra', // Dynamically inserts nested page titles
  },
  description: 'Search 10,000+ optimized AI prompts for infrastructure, frontend code, and content scaling. Engineered for modern developers and creators.',
  keywords: ['AI prompts', 'programmatic SEO', 'ChatGPT prompts', 'Gemini prompts', 'developer tools'],
  openGraph: {
    title: 'Blenra | Engineered AI Prompts',
    description: 'The Ultimate Library of Engineered AI Prompts for modern developers and creators.',
    url: '/',
    siteName: 'Blenra',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blenra | Engineered AI Prompts',
    description: 'The Ultimate Library of Engineered AI Prompts.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)] antialiased font-sans">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}