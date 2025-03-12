import { Tool } from '@/types/tool';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={tool.url} target="_blank" rel="noopener noreferrer">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{tool.name}</CardTitle>
          <CardDescription>{tool.category}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{tool.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
