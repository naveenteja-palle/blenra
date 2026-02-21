import type { Metadata } from 'next';
import Link from 'next/link';
import PromptCard from '@/components/ui/PromptCard';
import { getPromptsByCategory } from '@/lib/dataFetcher';

// 1. Dynamic SEO Generation
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryName = resolvedParams.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `${categoryName} AI Prompts | Blenra`,
    description: `Browse our curated library of engineered AI prompts specifically designed for ${categoryName}.`,
  };
}

// 2. The Server Component
export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categorySlug = resolvedParams.category;
  const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // SECURE FETCH: Pull only the prompts that match this specific category slug
  const categoryPrompts = await getPromptsByCategory(categorySlug);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex-1">
      
      {/* Breadcrumbs for SEO and Navigation */}
      <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-200">{categoryName}</span>
      </nav>

      {/* Category Header */}
      <div className="mb-12 border-b border-[var(--border)] pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-4">
          {categoryName} Prompts
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl">
          A curated collection of highly optimized AI prompts to scale your workflow and output in {categoryName}.
        </p>
      </div>

      {/* Conditional Rendering based on Database Results */}
      {categoryPrompts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryPrompts.map((prompt) => (
            // THE FIX: We now pass the entire 'prompt' object to bypass the firewall
            <PromptCard 
              key={prompt.id}
              prompt={prompt}
            />
          ))}
        </div>
      ) : (
        /* The graceful fallback if the database has 0 items for this category */
        <div className="text-center py-20 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm">
          <span className="text-4xl mb-4 block" aria-hidden="true">🚧</span>
          <h2 className="text-2xl font-bold mb-2">More Prompts Coming Soon</h2>
          <p className="text-gray-400">We are currently engineering new prompts for the {categoryName} category.</p>
          <Link href="/" className="inline-block mt-6 px-6 py-2 bg-[var(--card)] border border-[var(--border)] text-white rounded-full hover:bg-[var(--border)] hover:text-white transition-colors text-sm font-medium">
            Back to Search
          </Link>
        </div>
      )}

    </div>
  );
}