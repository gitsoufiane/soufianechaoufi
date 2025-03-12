import { ContactForm } from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Contact Me</h1>
        
        <div className="mb-8 space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Professional Contact Information</h2>
            <div className="space-y-1 text-muted-foreground">
              <p>Email: <a href="mailto:soufiane.chaoufi@gmail.com" className="text-primary hover:underline">soufiane.chaoufi@gmail.com</a></p>
              <p>Location: Vancouver, Canada</p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold mb-4">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
