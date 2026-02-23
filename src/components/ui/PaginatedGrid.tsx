'use client';

import { useState } from 'react';
import { PromptItem } from '@/types/prompt';
import PromptCard from '@/components/ui/PromptCard'; // <-- Successfully imported your custom card

interface PaginatedGridProps {
  prompts: PromptItem[];
  itemsPerPage?: number;
}

export default function PaginatedGrid({ prompts, itemsPerPage = 12 }: PaginatedGridProps) {
  // State to track how many items are currently visible
  const [visibleCount, setVisibleCount] = useState(itemsPerPage);

  // Function to load the next batch
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + itemsPerPage);
  };

  // If the category or tag has no prompts, show a fallback
  if (!prompts || prompts.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500 border border-[var(--border)] rounded-xl bg-[var(--card)]">
        No prompts found in this section yet. Check back soon!
      </div>
    );
  }

  // Slice the array to only show the currently visible items
  const visiblePrompts = prompts.slice(0, visibleCount);

  return (
    <div className="flex flex-col gap-10">
      
      {/* The Grid: Updated to match your 4-column wide layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visiblePrompts.map((prompt) => (
          /* Calling your actual PromptCard component cleanly */
          <PromptCard 
            key={prompt.id} 
            prompt={prompt} 
          />
        ))}
      </div>

      {/* The Load More Button */}
      {visibleCount < prompts.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="px-8 py-3 rounded-full bg-[#0a0d12] border border-[var(--border)] text-sm font-bold text-gray-300 hover:text-white hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all shadow-sm"
          >
            Load More Prompts ({prompts.length - visibleCount} remaining)
          </button>
        </div>
      )}

    </div>
  );
}