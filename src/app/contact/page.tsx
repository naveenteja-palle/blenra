import type { Metadata } from 'next';
import ContactFormClient from './ContactFormClient';

export const metadata: Metadata = {
  title: 'Contact Us | Blenra AI Prompts',
  description: 'Get in touch with the Blenra team for support, business inquiries, or feedback.',
};

export default function ContactPage() {
  return <ContactFormClient />;
}