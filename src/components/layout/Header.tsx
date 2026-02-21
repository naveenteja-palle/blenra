'use client';

import { useState } from 'react';
import Link from 'next/link';
import EmailModal from '../ui/EmailModal';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // The master list of categories for the site
  const categories = [
    { name: 'Cloud & DevOps', path: '/category/cloud-devops' },
    { name: 'Web Components', path: '/category/web-components' },
    { name: 'Social Media', path: '/category/social-media' },
    { name: 'AI Portraits', path: '/category/ai-portraits' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2 group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 group-hover:scale-105 transition-transform duration-300">
              <defs>
                <linearGradient id="navGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <path d="M6 4h7.5a5.5 5.5 0 0 1 2.5 10.4A5.5 5.5 0 0 1 13.5 20H6V4zm3 6h4.5a2.5 2.5 0 1 0 0-5H9v5zm0 7h4.5a2.5 2.5 0 1 0 0-5H9v5z" fill="url(#navGrad)" />
              <circle cx="19" cy="5" r="3" fill="#60a5fa" />
            </svg>
            <span className="text-2xl font-bold tracking-tight text-white">Blenra</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-[var(--primary)] hover:text-white transition-colors">Home</Link>
            
            <Link href="/explore" className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors">Explore</Link>
            
            <div className="relative group">
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors cursor-pointer py-2">Categories ▾</span>
              <div className="absolute left-0 top-full mt-2 w-48 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
                {categories.map((cat) => (
                  <Link key={cat.path} href={cat.path} className="block px-4 py-2 text-sm text-gray-300 hover:bg-[var(--background)] hover:text-[var(--primary)] rounded-lg transition-colors">
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/about" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">About Us</Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {/* Persistent Search Icon targeting the /search page */}
            <Link href="/search" className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </Link>

            {/* NEW: Desktop CTA Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden md:block px-4 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all"
            >
              Join Weekly List
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none" 
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border)] bg-[var(--card)] px-4 py-6 space-y-4 shadow-lg">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-[var(--primary)]">Home</Link>
            
            <Link href="/explore" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-white">Explore</Link>
            
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-medium text-white">About Us</Link>
            
            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Categories</p>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <Link key={cat.path} href={cat.path} onClick={() => setIsMobileMenuOpen(false)} className="block text-sm text-gray-300">
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* NEW: Mobile CTA Button */}
            <div className="pt-6 border-t border-[var(--border)]">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false); // Close menu
                  setIsModalOpen(true);       // Open modal
                }}
                className="w-full text-center px-4 py-3 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all"
              >
                Join Weekly List
              </button>
            </div>
          </div>
        )}
      </header>

      {/* The Modal Component */}
      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}