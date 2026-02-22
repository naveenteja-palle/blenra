import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPromptBySlug } from '@/lib/dataFetcher';
import RelatedPrompts from '@/components/ui/RelatedPrompts';
import InteractivePrompt from '@/components/ui/InteractivePrompt'; // <-- Added Import

// 1. Dynamic SEO Generation connected to Database
export async function generateMetadata({ params }: { params: Promise<{ category: string, slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const promptData = await getPromptBySlug(resolvedParams.slug);
  
  if (!promptData) {
    return { title: 'Prompt Not Found | Blenra' };
  }
  
  return {
    title: `${promptData.title} | Blenra AI Prompts`,
    description: `Copy this engineered AI prompt optimized for ${promptData.targetAI}. Categories: ${promptData.category}.`,
  };
}

// 2. The Main Server Component Layout
export default async function PromptDetailsPage({ params }: { params: Promise<{ category: string, slug: string }> }) {
  const resolvedParams = await params;
  const promptData = await getPromptBySlug(resolvedParams.slug);

  if (!promptData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 max-w-7xl flex-1">
      
      {/* Breadcrumb Navigation */}
      <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/category/${promptData.categorySlug}`} className="hover:text-[var(--primary)] transition-colors capitalize">
          {promptData.category}
        </Link>
        <span>/</span>
        <span className="text-gray-200 truncate">{promptData.title}</span>
      </nav>

      {/* THE MAGIC HAPPENS HERE: Our new interactive client component */}
      <InteractivePrompt promptData={promptData} />

      {/* Related Prompts Section */}
      <RelatedPrompts 
        currentSlug={promptData.slug} 
        categorySlug={promptData.categorySlug} 
        categoryName={promptData.category} 
      />

    </div>
  );
}