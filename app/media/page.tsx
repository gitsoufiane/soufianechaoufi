import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Media',
  description: 'Explore my media appearances and publications',
};

export default function MediaPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Media</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Media cards will go here */}
      </div>
    </div>
  );
}
