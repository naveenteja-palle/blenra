import type { Metadata } from 'next';
import Link from 'next/link';
import PromptCard from '@/components/ui/PromptCard';
import { getPromptsByTag } from '@/lib/dataFetcher';
import { notFound } from 'next/navigation';

// 1. Dynamic SEO Generation for Tags
export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const tagName = resolvedParams.tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `#${tagName} AI Prompts | Blenra`,
    description: `Browse our curated library of engineered AI prompts optimized for #${tagName}.`,
  };
}

// 2. The Server Component
export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const resolvedParams = await params;
  const tagSlug = resolvedParams.tag;
  const tagName = tagSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // SECURE FETCH: Pull prompts matching the tag
  const tagPrompts = await getPromptsByTag(tagSlug);

  if (!tagPrompts) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex-1">
      
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-200">#{tagName}</span>
      </nav>

      {/* Tag Header */}
      <div className="mb-12 border-b border-[var(--border)] pb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-4">
          #{tagName} Prompts
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl">
          A curated collection of highly optimized AI prompts tagged with #{tagName}.
        </p>
      </div>

      {/* Conditional Rendering */}
      {tagPrompts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tagPrompts.map((prompt) => (
            <PromptCard 
              key={prompt.id}
              prompt={prompt}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-sm">
          <span className="text-4xl mb-4 block" aria-hidden="true">🚧</span>
          <h2 className="text-2xl font-bold mb-2">No Prompts Found</h2>
          <p className="text-gray-400">We couldn't find any prompts with the tag #{tagName}.</p>
          <Link href="/" className="inline-block mt-6 px-6 py-2 bg-[var(--card)] border border-[var(--border)] text-white rounded-full hover:bg-[var(--border)] hover:text-white transition-colors text-sm font-medium">
            Back to Search
          </Link>
        </div>
      )}

    </div>
  );
}