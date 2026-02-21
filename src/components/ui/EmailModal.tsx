'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string; // Optional: helps personalize the message
}

export default function EmailModal({ isOpen, onClose, category }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Dynamic heading based on category relevance
  const displayCategory = category ? category : 'Engineered';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sending data to your Google Apps Script Webhook
      await fetch('https://script.google.com/macros/s/AKfycbxC0UsPZoGcM0qGgIgc4lqphJa-z0C1MZpiLhy-ufHaX6dDgspMA9X0GUF2rKfLb7Z7_Q/exec', {
        method: 'POST',
        // Using text/plain is a standard trick to bypass CORS errors on Google Apps Script
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ 
          email: email, 
          category: displayCategory 
        })
      });

      // Clear the form, stop the spinner, close modal, and redirect
      setEmail('');
      setLoading(false);
      onClose();
      router.push('/success');
      
    } catch (error) {
      console.error("Error saving email:", error);
      setLoading(false);
      // Even if it fails, we shouldn't trap the user, but you can add error UI here later if needed
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose} // ALLOWS CLOSING BY CLICKING THE BACKGROUND
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[var(--card)] border border-[var(--border)] p-8 rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()} // PREVENTS BACKGROUND CLICK FROM TRIGGERING INSIDE THE MODAL
          >
            {/* Top Right Close Icon */}
            <button 
              onClick={onClose} 
              aria-label="Close modal"
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white hover:bg-[var(--background)] rounded-full transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              <div className="inline-block p-3 bg-blue-600/10 rounded-2xl mb-4 text-blue-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Weekly {displayCategory} Prompts</h2>
              <p className="text-gray-400 mb-6 text-sm">
                Join 73k+ builders. Get one high-performance prompt delivered to your inbox every Monday—tailored to your engineering workflows.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="email"
                placeholder="engineering@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Join the Weekly List'
                )}
              </button>
            </form>
            
            {/* Explicit Text Close Button */}
            <div className="mt-4 text-center">
              <button 
                onClick={onClose}
                className="text-sm text-gray-500 hover:text-white transition-colors"
              >
                No thanks, I'll pass
              </button>
            </div>
            
            <p className="text-[10px] text-gray-600 text-center mt-6">
              No spam. Unsubscribe anytime. Your data stays at Blenra.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}