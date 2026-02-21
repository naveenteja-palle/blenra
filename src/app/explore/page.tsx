import { getAllPrompts } from '@/lib/dataFetcher';
import PromptCard from '@/components/ui/PromptCard';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore All Prompts | Blenra',
  description: 'Browse our complete library of highly engineered AI prompts for Cloud, Web Components, Social Media, and more.',
};

export default async function ExplorePage() {
  // Fetch all 400+ prompts instantly from our local cache
  const allPrompts = await getAllPrompts();

  // Dynamically group the prompts by their Category
  const groupedPrompts = allPrompts.reduce((acc, prompt) => {
    if (!acc[prompt.category]) {
      acc[prompt.category] = [];
    }
    acc[prompt.category].push(prompt);
    return acc;
  }, {} as Record<string, typeof allPrompts>);

  // Generate the jump links dynamically from the grouped data
  const jumpLinks = Object.entries(groupedPrompts).map(([category, prompts]) => ({
    name: category,
    slug: prompts[0].categorySlug,
    icon: prompts[0].icon,
    count: prompts.length
  }));

  return (
    <div className="min-h-screen pt-20 pb-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Page Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Explore the Library
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Browse our entire collection of {allPrompts.length} engineered AI prompts across all technical and creative domains.
          </p>
        </div>

        {/* THE FIX: Sticky Category Jump Menu */}
        <div className="sticky top-16 z-40 bg-[var(--background)]/90 backdrop-blur-md py-4 mb-16 border-b border-[var(--border)] -mx-4 px-4 sm:mx-0 sm:px-0">
          <nav className="flex flex-wrap items-center justify-center gap-3" aria-label="Category Jump Menu">
            {jumpLinks.map((link) => (
              <a
                key={link.slug}
                href={`#${link.slug}`}
                className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all flex items-center gap-2 group shadow-sm"
              >
                <span aria-hidden="true" className="group-hover:scale-110 transition-transform">{link.icon}</span>
                {link.name}
                <span className="text-xs text-gray-400 bg-[var(--background)] px-2 py-0.5 rounded-full border border-[var(--border)]">
                  {link.count}
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Grouped Prompt Sections */}
        <div className="space-y-20">
          {Object.entries(groupedPrompts).map(([category, prompts]) => (
            // The scroll-mt-32 ensures the sticky header doesn't cover the title when jumping
            <section key={category} className="scroll-mt-36" id={prompts[0].categorySlug}>
              
              {/* Category Header */}
              <div className="flex items-end justify-between mb-8 border-b border-[var(--border)] pb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">{prompts[0].icon}</span> 
                  {category}
                  <span className="ml-3 text-sm font-medium px-3 py-1 rounded-full bg-[var(--card)] border border-[var(--border)] text-gray-400">
                    {prompts.length} Prompts
                  </span>
                </h2>
                
                <Link 
                  href={`/category/${prompts[0].categorySlug}`}
                  className="hidden sm:flex text-sm font-medium text-[var(--primary)] hover:text-blue-400 transition-colors items-center gap-1 group"
                >
                  View Category 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>

              {/* The Grid for this specific category */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
              
              {/* Mobile View Category Button */}
              <div className="mt-6 sm:hidden">
                <Link 
                  href={`/category/${prompts[0].categorySlug}`}
                  className="block w-full text-center py-3 rounded-lg bg-[var(--card)] border border-[var(--border)] text-sm font-medium text-white hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                >
                  View All {category} Prompts
                </Link>
              </div>
              
            </section>
          ))}
        </div>

      </div>
    </div>
  );
}