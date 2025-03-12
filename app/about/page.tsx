import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me | Soufiane Chaoufi',
  description: 'A brief overview of my background, skills, and experience in software development and technology.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">About Me</h1>
        <p className="text-muted-foreground">
          A brief overview of my background, skills, and experience in software development and technology.
        </p>
      </div>
      
      <div className="prose dark:prose-invert mt-8">
        {/* About content will go here */}
      </div>
    </div>
  );
}
