'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Securely routes to the search results page without exposing backend logic
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto relative group">
      <div className="relative flex items-center">
        <svg 
          className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <label htmlFor="searchInput" className="sr-only">Search AI Prompts</label>
        <input
          id="searchInput"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 10,000+ AI Prompts (e.g., 'AWS cloud cost')"
          className="w-full bg-[var(--card)] text-[var(--foreground)] placeholder-gray-400 border border-[var(--border)] rounded-full py-4 pl-12 pr-32 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all shadow-sm text-sm sm:text-base"
          required
        />
        <button
          type="submit"
          className="absolute right-2 top-2 bottom-2 bg-[var(--primary)] hover:bg-blue-600 text-white font-medium rounded-full px-6 transition-colors text-sm sm:text-base"
        >
          Search
        </button>
      </div>
    </form>
  );
}