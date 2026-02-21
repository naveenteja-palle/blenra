import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Blenra',
  description: 'Privacy Policy and data collection practices for Blenra.com.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl flex-1">
      <h1 className="text-4xl font-bold mb-8 text-[var(--foreground)]">Privacy Policy</h1>
      <div className="prose prose-invert max-w-none text-gray-300 space-y-6 leading-relaxed">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <p>
          At Blenra, accessible from https://blenra.com, one of our main priorities is the privacy of our visitors. 
          This Privacy Policy document contains types of information that is collected and recorded by Blenra and how we use it.
        </p>
        
        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Log Files & Analytics</h2>
        <p>
          Blenra follows a standard procedure of using log files. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Cookies and Web Beacons</h2>
        <p>
          Like any other website, Blenra uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. We use this information to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h2 className="text-2xl font-semibold text-white mt-8 mb-4">Google DoubleClick DART Cookie (AdSense)</h2>
        <p>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: https://policies.google.com/technologies/ads
        </p>

        <p className="mt-8 text-sm text-gray-500 italic">
          Disclaimer: This is a standard privacy policy template. Ensure you review this to comply with your specific local laws (e.g., GDPR, CCPA).
        </p>
      </div>
    </div>
  );
}