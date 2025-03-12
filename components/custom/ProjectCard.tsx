import { Project } from '@/types/project'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
      <p className="text-muted-foreground mb-4">{project.description}</p>
      <div className="flex gap-2">
        {project.liveUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={project.liveUrl} target="_blank">
              Live
            </Link>
          </Button>
        )}
        {project.githubUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={project.githubUrl} target="_blank">
              GitHub
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
