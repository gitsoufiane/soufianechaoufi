import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "./data/projects";

export const metadata = {
  title: 'Projects | Soufiane Chaoufi',
  description: 'A showcase of my projects, including web development, software engineering, and other technical endeavors.',
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-muted-foreground">
          A selection of projects that highlight my skills and experience in software development.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <Badge key={i} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
