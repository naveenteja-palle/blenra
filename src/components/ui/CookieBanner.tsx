'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // When the site loads, check if they already accepted cookies
    const consent = localStorage.getItem('blenra_cookie_consent');
    if (!consent) {
      // If no record is found, show the banner
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    // Save their consent to the browser
    localStorage.setItem('blenra_cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 bg-[var(--card)] border-t border-[var(--border)] shadow-2xl"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* The Compliance Message */}
            <div className="text-sm text-gray-300 flex-1 pr-0 md:pr-8">
              We use cookies to analyze traffic, personalize content, and serve targeted ads. 
              By clicking "Accept", you consent to our use of cookies as described in our{' '}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2">
                Privacy Policy
              </Link>.
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 w-full md:w-auto">
              <button
                onClick={() => setIsVisible(false)} // Just closes it without saving 'true'
                className="flex-1 md:flex-none px-6 py-2.5 bg-transparent border border-[var(--border)] hover:bg-[var(--border)] text-white text-sm font-medium rounded-xl transition-all whitespace-nowrap"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="flex-1 md:flex-none px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all whitespace-nowrap"
              >
                Accept Cookies
              </button>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}