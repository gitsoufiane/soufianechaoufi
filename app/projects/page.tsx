import type { Metadata } from 'next';
import { ProjectCard } from '@/components/custom/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore my portfolio of projects',
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Project cards will go here */}
      </div>
    </div>
  );
}
