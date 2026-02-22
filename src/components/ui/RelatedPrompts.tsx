import Link from 'next/link';
import { getPromptsByCategory } from '@/lib/dataFetcher';

interface RelatedPromptsProps {
  currentSlug: string;
  categorySlug: string;
  categoryName: string;
}

export default async function RelatedPrompts({ 
  currentSlug, 
  categorySlug, 
  categoryName 
}: RelatedPromptsProps) {
  
  const allCategoryPrompts = await getPromptsByCategory(categorySlug);

  const relatedPrompts = allCategoryPrompts
    .filter((prompt) => prompt.slug !== currentSlug)
    .slice(0, 3); 

  if (relatedPrompts.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-[var(--border)]">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold text-[var(--foreground)]">
          More <span className="text-[var(--primary)]">{categoryName}</span> Prompts
        </h3>
        <Link 
          href={`/category/${categorySlug}`} 
          className="text-sm text-gray-400 hover:text-[var(--foreground)] transition-colors"
        >
          View all &rarr;
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* FIX: Removed the floating comment that broke the JSX parser */}
        {relatedPrompts.map((prompt) => (
          <Link 
            href={`/prompts/${prompt.categorySlug}/${prompt.slug}`} 
            key={prompt.id} 
            className="group block"
          >
            <div className="h-full p-6 rounded-xl bg-[var(--card)] border border-[var(--border)] group-hover:border-[var(--primary)] transition-all duration-200">
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{prompt.icon}</span>
                <span className="text-xs font-medium text-[var(--primary)] bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                  {prompt.tag}
                </span>
              </div>
              
              <h4 className="text-[var(--foreground)] font-medium mb-3 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                {prompt.title}
              </h4>
              
              <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                {prompt.exampleOutput}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}