import SearchBar from '@/components/ui/SearchBar';
import PromptCard from '@/components/ui/PromptCard';
import Link from 'next/link';
import { getAllPrompts } from '@/lib/dataFetcher';

export default async function HomePage() {
  // SECURE SERVER FETCH: This runs entirely on the backend. 
  // It fetches the real data from your database file without exposing any logic to the browser.
  const trendingPrompts = await getAllPrompts();

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        
        {/* Animated Floating Background Icons */}
        <div className="absolute top-20 left-[10%] opacity-20 animate-float text-5xl" aria-hidden="true">☁️</div>
        <div className="absolute bottom-20 right-[15%] opacity-20 animate-float-delayed text-5xl" aria-hidden="true">🧊</div>
        <div className="absolute top-32 right-[20%] opacity-20 animate-float text-4xl" aria-hidden="true">⚙️</div>
        <div className="absolute bottom-32 left-[20%] opacity-10 animate-float-delayed text-6xl" aria-hidden="true">⚡</div>

        {/* Background Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-20 bg-[var(--primary)] blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            The Ultimate Library of <br className="hidden sm:block" />
            <span className="text-[var(--primary)]">Engineered AI Prompts</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Search 10,000+ optimized prompts for infrastructure scaling, frontend component generation, and viral content creation. 
          </p>
          
          <SearchBar />

          {/* Category Navigation Pills */}
          <nav className="mt-8 flex flex-wrap justify-center gap-3" aria-label="Quick Categories">
            <Link href="/category/cloud-devops" className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">☁️ Cloud & DevOps</Link>
            <Link href="/category/web-components" className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">🧊 Web Components</Link>
            <Link href="/category/social-media" className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">📱 Social Media</Link>
            <Link href="/category/ai-portraits" className="px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">👔 AI Portraits</Link>
          </nav>
        </div>
      </section>

      {/* Trending Prompts Grid */}
      <section className="py-16 bg-[var(--background)] px-4 sm:px-6 lg:px-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Trending Prompts</h2>
            <Link href="/explore" className="text-sm font-medium text-[var(--primary)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded">
              View all &rarr;
            </Link>
          </div>
          
          {/* Responsive Grid Layout Loading Dynamic Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* THE FIX: Pass the whole object and slice to show only the 6 newest prompts */}
            {trendingPrompts.slice(0, 6).map((prompt) => (
              <PromptCard 
                key={prompt.id}
                prompt={prompt}
              />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}