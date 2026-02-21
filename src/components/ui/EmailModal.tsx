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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // MOCK SUBMISSION: This will later connect to your email service API
    setTimeout(() => {
      setLoading(false);
      onClose();
      // Redirecting to success page
      router.push('/success');
    }, 1500);
  };

  // Dynamic heading based on category relevance
  const displayCategory = category ? category : 'Engineered';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[var(--card)] border border-[var(--border)] p-8 rounded-3xl shadow-2xl"
          >
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            
            <p className="text-[10px] text-gray-500 text-center mt-4">
              No spam. Unsubscribe anytime. Your data stays at Blenra.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}