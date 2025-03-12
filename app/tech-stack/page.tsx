import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { techStack } from '@/lib/tech-stack';

export const metadata = {
  title: 'Tech Stack | Soufiane Chaoufi',
  description: 'Technologies, tools, and methodologies I use in my development work.',
};

export default function TechStackPage() {
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Tech Stack</h1>
        <p className="text-muted-foreground">
          Technologies, methodologies, and tools I use in my development work.
        </p>
      </div>

      <div className="mt-8 grid gap-6">
        {techStack.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {category.items.map((item) => (
                  <Badge
                    key={item.name}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-1.5 text-sm"
                  >
                    {item.icon && (
                      <div className="relative w-4 h-4">
                        <Image
                          src={item.icon}
                          alt={`${item.name} icon`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span>{item.name}</span>
                    {item.description && (
                      <span className="text-xs text-muted-foreground">
                        ({item.description})
                      </span>
                    )}
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
