import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me and my background',
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">About Me</h1>
      <div className="prose dark:prose-invert">
        {/* About content will go here */}
      </div>
    </div>
  );
}
