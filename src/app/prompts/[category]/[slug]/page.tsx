import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CopyButton from '@/components/ui/CopyButton';
import { getPromptBySlug } from '@/lib/dataFetcher';

// 1. Dynamic SEO Generation connected to Database
export async function generateMetadata({ params }: { params: Promise<{ category: string, slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  
  // SECURE FETCH: Get the exact prompt data for SEO tags
  const promptData = await getPromptBySlug(resolvedParams.slug);
  
  // If the prompt doesn't exist, don't index it
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
  
  // SECURE FETCH: Pull the data securely on the server
  const promptData = await getPromptBySlug(resolvedParams.slug);

  // SECURITY: If someone types a random URL that isn't in our database, show a 404 page
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Context & Variables */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div>
            <div className="inline-flex items-center rounded-full bg-[var(--card)] border border-[var(--border)] px-3 py-1 text-xs font-semibold text-[var(--primary)] mb-4">
              Optimized for: {promptData.targetAI}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-[var(--foreground)]">
              {promptData.title}
            </h1>
            <p className="text-gray-400 text-base leading-relaxed">
              Use this engineered prompt to drastically optimize your workflow and output.
            </p>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">Required Variables</h3>
            <ul className="space-y-3">
              {promptData.variables.map((v, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-200">
                  <span className="text-[var(--primary)]">✦</span> 
                  <code className="bg-[var(--background)] px-2 py-1 rounded border border-[var(--border)]">{v}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: The Code/Prompt Engine */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="relative bg-[#0d1117] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl">
            {/* Window Mac-style header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[var(--card)] border-b border-[var(--border)]">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-2 text-xs font-medium text-gray-400">{promptData.slug}.txt</span>
            </div>
            
            <div className="p-6 sm:p-8 overflow-x-auto text-sm sm:text-base text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
              {promptData.basePrompt}
            </div>
            
            <CopyButton textToCopy={promptData.basePrompt} />
          </div>

          {/* Example Output Box */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
            <h3 className="text-sm font-bold tracking-wider text-[var(--primary)] mb-2">Example Output</h3>
            <p className="text-sm text-gray-400 italic border-l-2 border-[var(--border)] pl-4">
              "{promptData.exampleOutput}"
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}