"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProjectCard from "@/components/ProjectCard";
import { Project } from "@/types/project";
import AnimatedNumber from "@/components/AnimatedNumber";

// Import projects data (we'll create this file next)
import { projects } from "./projects";

const categories = [
  { name: "All", slug: "all", description: "All projects" },
  {
    name: "Web Apps",
    slug: "web-app",
    description: "Full-stack web applications",
  },
  { name: "Tools", slug: "tool", description: "Developer tools and utilities" },
  { name: "Libraries", slug: "library", description: "Open source libraries" },
];

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <div className="py-12">
      {/* Header */}
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">My Projects</h1>
        <p className="text-muted-foreground text-xl leading-relaxed">
          A showcase of my recent work and contributions to the development
          community. Each project represents a unique challenge and learning
          opportunity.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-center text-2xl font-bold">
              <AnimatedNumber value={projects.length} />
            </CardTitle>
            <CardDescription className="text-center">
              Total Projects
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-center text-2xl font-bold">
              <AnimatedNumber value={featuredProjects.length} />
            </CardTitle>
            <CardDescription className="text-center">
              Featured Projects
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-center text-2xl font-bold">
              <AnimatedNumber
                value={projects.filter((p) => p.status === "maintained").length}
              />
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
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Featured Projects
            </h2>
            <Badge variant="secondary">
              <AnimatedNumber value={featuredProjects.length} /> project
              {featuredProjects.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              Other Projects
            </h2>
            <Badge variant="outline">
              <AnimatedNumber value={otherProjects.length} /> project
              {otherProjects.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="py-16 text-center">
          <h3 className="mb-2 text-xl font-semibold">No projects yet</h3>
          <p className="text-muted-foreground mb-6">
            I'm currently working on some exciting projects. Check back soon!
          </p>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-muted mt-8 rounded-lg p-8 text-center">
        <h3 className="mb-2 text-xl font-semibold">Want to learn more?</h3>
        <p className="text-muted-foreground mb-4">
          Check out my blog for insights and tutorials on modern web
          development.
        </p>
        <Button asChild>
          <a href="/blog">Read Articles</a>
        </Button>
      </div>
    </div>
  );
}
