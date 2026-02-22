'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Reusing your existing Google Sheets Webhook!
      await fetch('https://script.google.com/macros/s/AKfycbxC0UsPZoGcM0qGgIgc4lqphJa-z0C1MZpiLhy-ufHaX6dDgspMA9X0GUF2rKfLb7Z7_Q/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ 
          email: formData.email, 
          // Storing the name and message in your existing "Category" column
          category: `CONTACT FORM | Name: ${formData.name} | Msg: ${formData.message}` 
        })
      });

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 4 seconds
      setTimeout(() => setStatus('idle'), 4000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setStatus('error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Have a question about our engineered prompts, API access, or want to report an issue? 
          Fill out the form below and our team will get back to you within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Contact Info Panel (Crucial for AdSense Trust) */}
        <div className="col-span-1 space-y-8 p-8 bg-[var(--card)] border border-[var(--border)] rounded-3xl h-fit">
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Email Support</h3>
            {/* AdSense reviewers look for plain-text emails */}
            <a href="mailto:support@blenra.com" className="text-lg font-medium text-white hover:text-blue-500 transition-colors">
              support@blenra.com
            </a>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Business Hours</h3>
            <p className="text-white">Monday - Friday</p>
            <p className="text-gray-400 text-sm">9:00 AM - 6:00 PM (IST)</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Location</h3>
            <p className="text-white">India</p>
          </div>
        </div>

        {/* The Form */}
        <div className="col-span-1 md:col-span-2 p-8 bg-[var(--card)] border border-[var(--border)] rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">Your Name</label>
                <input
                  id="name"
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                <input
                  id="email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white resize-none"
                placeholder="How can we help you?"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : status === 'success' ? (
                'Message Sent Successfully!'
              ) : (
                'Send Message'
              )}
            </button>

            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">Something went wrong. Please try emailing us directly.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}