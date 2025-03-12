import { ContactForm } from '@/components/ContactForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Me | Soufiane Chaoufi',
  description: 'Get in touch with me for collaboration, opportunities, or any questions about my work.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Contact Me</h1>
        <p className="text-muted-foreground">
          Get in touch with me for collaboration, opportunities, or any questions about my work.
        </p>
      </div>

      <div className="mt-8 max-w-2xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Professional Contact Information</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>Email: <a href="mailto:soufiane.chaoufi@gmail.com" className="text-primary hover:underline">soufiane.chaoufi@gmail.com</a></p>
              <p>Location: Vancouver, Canada</p>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
