import type { Metadata } from 'next';
import Link from 'next/link';
import PromptCard from '@/components/ui/PromptCard';
import SearchBar from '@/components/ui/SearchBar';
import { searchPrompts } from '@/lib/dataFetcher';

// STRICT SEO CONTROL: Prevent Google from indexing search result pages to avoid thin-content penalties.
export const metadata: Metadata = {
  title: 'Search Results | Blenra',
  description: 'Search our curated library of engineered AI prompts.',
  robots: {
    index: false,
    follow: true, 
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // Next.js 15 handles searchParams as a Promise
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  
  // SECURE FETCH: Run the search query strictly on the server
  const searchResults = query ? await searchPrompts(query) : [];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 flex flex-col items-center">
      
      {/* Search Header */}
      <div className="w-full max-w-3xl text-center mb-12">
        <h1 className="text-3xl font-bold mb-6 text-[var(--foreground)]">
          Search Results
        </h1>
        {/* We place the SearchBar here again so they can easily refine their search */}
        <SearchBar />
      </div>

      <div className="w-full max-w-7xl">
        {/* Query Context */}
        <div className="mb-8 border-b border-[var(--border)] pb-4 flex items-center justify-between">
          <p className="text-gray-400">
            Showing results for: <span className="text-white font-semibold">"{query}"</span>
          </p>
          <span className="text-sm bg-[var(--card)] border border-[var(--border)] px-3 py-1 rounded-full text-gray-300">
            {searchResults.length} {searchResults.length === 1 ? 'Prompt' : 'Prompts'} Found
          </span>
        </div>

        {/* Results Grid */}
        {searchResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((prompt) => (
     <PromptCard 
                key={prompt.id}
                prompt={prompt}
              />
            ))}
          </div>
        ) : (
          /* Zero Results Fallback */
          <div className="text-center py-20 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm mt-8 w-full max-w-3xl mx-auto">
            <span className="text-4xl mb-4 block" aria-hidden="true">🔍</span>
            <h2 className="text-2xl font-bold mb-2">No exact matches found</h2>
            <p className="text-gray-400 mb-6">We couldn't find any prompts matching "{query}". Try adjusting your keywords.</p>
            <Link href="/" className="inline-block px-6 py-2 bg-[var(--primary)] text-white font-medium rounded-full hover:bg-blue-600 transition-colors">
              Clear Search
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}