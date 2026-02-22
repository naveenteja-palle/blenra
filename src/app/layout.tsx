import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Optimize font loading for Core Web Vitals (SEO)
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Global SEO Configuration
export const metadata: Metadata = {
  // FIX 1: Correct production fallback for metadataBase
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://blenra.com'),
  
  // FIX 2: Simplified to a string to fix the "template property missing" TypeScript error
  title: 'Blenra | The Ultimate AI Prompt Directory',
  
  description: 'Search 10,000+ optimized AI prompts for infrastructure, frontend code, and content scaling. Engineered for modern developers and creators.',
  keywords: ['AI prompts', 'programmatic SEO', 'ChatGPT prompts', 'Gemini prompts', 'developer tools'],
  openGraph: {
    title: 'Blenra | Engineered AI Prompts',
    description: 'The Ultimate Library of Engineered AI Prompts for modern developers and creators.',
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
  // Google Search Console Verification
  verification: {
    google: '4F8kc1WC1lbv3tQTvRrzRi2bQwpcZunOqhCeNqOdVf4',
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
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}