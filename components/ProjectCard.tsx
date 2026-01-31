import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex h-full flex-col transition-all hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="group-hover:text-foreground text-xl leading-tight font-bold transition-colors">
            {project.title}
          </CardTitle>
          <Badge
            variant={project.status === "completed" ? "default" : "secondary"}
            className="ml-2 shrink-0"
          >
            {project.status}
          </Badge>
        </div>
        <CardDescription className="text-muted-foreground mt-2 line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-4 pt-0">
        {project.imageUrl && (
          <div className="bg-muted relative aspect-video overflow-hidden rounded-md">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        <div>
          <h4 className="text-muted-foreground mb-2 text-sm font-medium">
            Technologies:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 6).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="px-2 py-0.5 text-xs"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 6 && (
              <Badge variant="outline" className="px-2 py-0.5 text-xs">
                +{project.technologies.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        {project.highlights && project.highlights.length > 0 && (
          <div>
            <h4 className="text-muted-foreground mb-2 text-sm font-medium">
              Highlights:
            </h4>
            <ul className="text-muted-foreground space-y-1 text-sm">
              {project.highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="bg-foreground mt-2 h-1 w-1 flex-shrink-0 rounded-full" />
                  <span className="line-clamp-1">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <Calendar className="h-3 w-3" />
          {new Date(project.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })}
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex gap-2 pt-4">
        {project.liveUrl && (
          <Button asChild variant="default" size="sm" className="flex-1">
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Link>
          </Button>
        )}
        {project.githubUrl && (
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
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
