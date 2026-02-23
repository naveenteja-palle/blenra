import Link from 'next/link';
import Image from 'next/image';
import { PromptItem } from '@/types/prompt';

export default function PromptCard({ prompt }: { prompt: PromptItem }) {
  // THE FIREWALL: Silently hide any blank or corrupted AI-generated rows
  if (!prompt || !prompt.category || !prompt.slug) {
    return null;
  }

  // Safely extract our data
  const { title, tag, category, categorySlug, slug, icon, imageUrl } = prompt;

  // STRICT URL VALIDATION: Ensure the image string is safe for Next.js
  const isValidImage = imageUrl ? (imageUrl.startsWith('/') || imageUrl.startsWith('http')) : false;

  // The condition: Only show the image if it's "ai-portraits" AND the URL is safely formatted
  const showImage = categorySlug === 'ai-portraits' && isValidImage;

  return (
    <Link href={`/prompts/${categorySlug}/${slug}`} className="group block h-full">
      <article className="flex flex-col h-full bg-[var(--card)] border border-[var(--border)] rounded-2xl hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--primary)]/10 overflow-hidden cursor-pointer">
        
        {/* CONDITIONAL IMAGE RENDER */}
        {showImage && (
          <div className="relative w-full h-48 sm:h-56 border-b border-[var(--border)] overflow-hidden bg-black/20">
            <Image 
              src={imageUrl as string} 
              alt={`AI generated output for ${title}`} 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        )}

        {/* TEXT CONTENT */}
        <div className="flex flex-col flex-1 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl" aria-hidden="true">{icon}</span>
            <h2 className="text-xs font-semibold tracking-wider text-[var(--primary)] uppercase">{category}</h2>
          </div>
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
            {title}
          </h3>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="inline-flex items-center rounded-full bg-[var(--background)] border border-[var(--border)] px-2.5 py-0.5 text-xs font-semibold text-gray-300">
              {tag}
            </span>
            <span className="text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300" aria-hidden="true">
              &rarr;
            </span>
          </div>
        </div>
        
      </article>
    </Link>
  );
}