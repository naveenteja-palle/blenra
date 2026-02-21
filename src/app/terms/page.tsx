import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Blenra',
  description: 'Terms of Service and user agreements for Blenra.com.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl flex-1">
      <h1 className="text-4xl font-bold mb-8 text-[var(--foreground)]">Terms of Service</h1>
      <div className="prose prose-invert max-w-none text-gray-300 space-y-6 leading-relaxed">
        <p>
          By accessing the website at https://blenra.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        </p>
        
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials (information or software) on Blenra's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title. Under this license you may not:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Attempt to decompile or reverse engineer any software contained on the website.</li>
          <li>Use automated scripts or scrapers to bulk-download the prompt database without purchasing a commercial license.</li>
          <li>Remove any copyright or other proprietary notations from the materials.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Disclaimer</h2>
        <p>
          The materials on Blenra's website are provided on an 'as is' basis. Blenra makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. Limitations</h2>
        <p>
          In no event shall Blenra or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Blenra's website.
        </p>
      </div>
    </div>
  );
}