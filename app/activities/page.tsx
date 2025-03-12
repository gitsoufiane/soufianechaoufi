import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Activities',
  description: 'Explore my professional activities and engagements',
};

export default function ActivitiesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Activities</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Activity cards will go here */}
      </div>
    </div>
  );
}
