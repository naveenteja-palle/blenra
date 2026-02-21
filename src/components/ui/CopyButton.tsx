'use client';

import { useState } from 'react';

interface CopyButtonProps {
  textToCopy: string;
}

export default function CopyButton({ textToCopy }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 active:scale-95 ${
        copied 
          ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
          : 'bg-[var(--card)] text-gray-300 border border-[var(--border)] hover:bg-[var(--border)] hover:text-white'
      }`}
      aria-label="Copy prompt to clipboard"
    >
      <span className={`transition-transform duration-200 ${copied ? 'scale-110' : 'scale-100'}`}>
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
        )}
      </span>
      <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
    </button>
  );
}