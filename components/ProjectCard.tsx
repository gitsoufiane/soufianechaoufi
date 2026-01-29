import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-bold leading-tight group-hover:text-foreground transition-colors">
            {project.title}
          </CardTitle>
          <Badge variant={project.status === "completed" ? "default" : "secondary"} className="ml-2 shrink-0">
            {project.status}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground line-clamp-2 mt-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 pt-0">
        {project.imageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        <div>
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Technologies:</h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 6).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs px-2 py-0.5">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 6 && (
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                +{project.technologies.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Highlights:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {project.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="w-1 h-1 bg-foreground rounded-full mt-2 flex-shrink-0" />
                  <span className="line-clamp-1">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          {new Date(project.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short'
          })}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4 mt-auto">
        {project.liveUrl && (
          <Button asChild variant="default" size="sm" className="flex-1">
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Live Demo
            </Link>
          </Button>
        )}
        {project.githubUrl && (
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Source Code
            </Link>
          </Button>
        )}
        {!project.liveUrl && !project.githubUrl && (
          <Button variant="secondary" size="sm" className="flex-1" disabled>
            Coming Soon
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}