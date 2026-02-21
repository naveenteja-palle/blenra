import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Blenra',
  description: 'Learn about Blenra, the ultimate directory for engineered AI prompts.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl flex-1">
      <h1 className="text-4xl font-bold mb-8 text-[var(--foreground)]">About Blenra</h1>
      <div className="prose prose-invert max-w-none text-gray-300 space-y-6 leading-relaxed">
        <p>
          Welcome to Blenra, the premier destination for high-quality, engineered AI prompts. 
          As artificial intelligence transforms how we build, create, and scale, the difference between an average output and a production-ready result comes entirely down to the prompt.
        </p>
        <p>
          We created Blenra because we were tired of sifting through low-quality, generic AI commands. Our database is built for professionals—Cloud & DevOps engineers, frontend developers, and high-volume creators—who need strict, parameter-driven prompts that yield consistent results every single time.
        </p>
        <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Our Mission</h2>
        <p>
          To bridge the gap between human intent and machine execution by providing the world's most structured, reliable, and easily accessible prompt library.
        </p>
      </div>
    </div>
  );
}