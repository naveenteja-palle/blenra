import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-8">
        <span className="text-4xl">🚀</span>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-white">You're All Set!</h1>
      <p className="text-gray-400 max-w-md mb-10 text-lg">
        Check your inbox. We've sent the full database of 400+ engineered prompts to you. 
        Ready to build something amazing?
      </p>
      <div className="flex gap-4">
        <Link 
          href="/explore" 
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all"
        >
          Back to Explore
        </Link>
        <a 
          href="https://instagram.com/lean_on_god" 
          target="_blank"
          className="px-8 py-3 bg-[var(--card)] border border-[var(--border)] text-white font-bold rounded-full hover:bg-[var(--border)] transition-all"
        >
          Follow on Instagram
        </a>
      </div>
    </div>
  );
}