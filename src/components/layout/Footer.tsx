'use client';

import { useState } from 'react';
import Link from 'next/link';
import EmailModal from '../ui/EmailModal';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <span className="text-2xl font-bold tracking-tight text-white mb-4 block">Blenra</span>
            <p className="text-sm text-gray-400 leading-relaxed">
              The ultimate library of engineered AI prompts. Scale your workflows, code, and content with precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-gray-400 hover:text-[var(--primary)] transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm text-gray-400 hover:text-[var(--primary)] transition-colors">About Us</Link></li>
              <li><Link href="/search" className="text-sm text-gray-400 hover:text-[var(--primary)] transition-colors">Search Prompts</Link></li>
              {/* Updated to trigger the newsletter modal */}
              <li>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="text-sm text-gray-400 hover:text-[var(--primary)] transition-colors text-left"
                >
                  Weekly Newsletter
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-3">
              <li><Link href="/category/cloud-devops" className="text-sm text-gray-400 hover:text-[var(--primary)] transition-colors">Cloud & DevOps</Link></li>
              <li><Link href="/category/web-components" className="text-sm text-gray-400 hover:text-[var(--primary)] transition-colors">Web Components</Link></li>
              <li><Link href="/category/social-media" className="text-sm text-gray-400 hover:text-[var(--primary)] transition-colors">Social Media</Link></li>
              <li><Link href="/category/ai-portraits" className="text-sm text-gray-400 hover:text-[var(--primary)] transition-colors">AI Portraits</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-[var(--primary)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-400 hover:text-[var(--primary)] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Blenra. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center gap-1">
            Engineered with <span className="text-[var(--primary)]">✦</span> for modern builders.
          </p>
        </div>

      </div>

      {/* MODAL COMPONENT */}
      <EmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </footer>
  );
}