"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/types/project";
import AnimatedNumber from "@/components/AnimatedNumber";

// Import projects data (we'll create this file next)
import { projects } from "./projects";

const categories = [
  { name: "All", slug: "all", description: "All projects" },
  { name: "Web Apps", slug: "web-app", description: "Full-stack web applications" },
  { name: "Tools", slug: "tool", description: "Developer tools and utilities" },
  { name: "Libraries", slug: "library", description: "Open source libraries" },
];

export default function ProjectsPage() {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <div className="py-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          My Projects
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A showcase of my recent work and contributions to the development community.
          Each project represents a unique challenge and learning opportunity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-center">
              <AnimatedNumber value={projects.length} />
            </CardTitle>
            <CardDescription className="text-center">
              Total Projects
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-center">
              <AnimatedNumber value={featuredProjects.length} />
            </CardTitle>
            <CardDescription className="text-center">
              Featured Projects
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-center">
              <AnimatedNumber value={projects.filter(p => p.status === 'maintained').length} />
            </CardTitle>
            <CardDescription className="text-center">
              Actively Maintained
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Featured Projects</h2>
            <Badge variant="secondary">
              <AnimatedNumber value={featuredProjects.length} /> project{featuredProjects.length !== 1 ? 's' : ''}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Other Projects</h2>
            <Badge variant="outline">
              <AnimatedNumber value={otherProjects.length} /> project{otherProjects.length !== 1 ? 's' : ''}
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
          <p className="text-muted-foreground mb-6">
            I'm currently working on some exciting projects. Check back soon!
          </p>
        </div>
      )}

      {/* Storybook Link */}
      <div className="mt-16 p-8 border rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Component Library</h3>
        <p className="text-muted-foreground mb-4">
          Explore the UI components and design system used in this portfolio.
        </p>
        <Button asChild variant="outline">
          <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">
            View Storybook
          </a>
        </Button>
      </div>

      {/* Call to Action */}
      <div className="mt-8 p-8 bg-muted rounded-lg text-center">
        <h3 className="text-xl font-semibold mb-2">Interested in collaborating?</h3>
        <p className="text-muted-foreground mb-4">
          I'm always open to discussing new projects and opportunities.
        </p>
        <Button asChild>
          <a href="/contact">Get in touch</a>
        </Button>
      </div>
    </div>
  );
}