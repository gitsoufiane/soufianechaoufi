import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { tools } from '@/lib/tools';
import type { Tool } from '@/types/tool';

export async function generateMetadata() {
  return {
    title: 'Tools - Soufiane Chaoufi',
    description: 'Discover the tools and technologies used by Soufiane Chaoufi - software development tools, frameworks, and productivity stack',
    keywords: ['tools', 'technologies', 'software development', 'productivity', 'stack'],
    openGraph: {
      title: 'Tools - Soufiane Chaoufi',
      description: 'Discover the tools and technologies used by Soufiane Chaoufi - software development tools, frameworks, and productivity stack',
      url: 'https://soufianechaoufi.com/tools',
      siteName: 'Soufiane Chaoufi',
      images: [
        {
          url: 'https://soufianechaoufi.com/og-tools.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  }
}

export default function ToolsPage() {
  return (
    <div className="container px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 sm:text-3xl md:mb-8">Tools</h1>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool: Tool) => (
          <Card key={tool.id} className="hover:shadow-lg transition-shadow h-full">
            <CardHeader>
              <CardTitle>{tool.name}</CardTitle>
              <CardDescription>{tool.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">{tool.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag: string) => (
                    <span key={tag} className="text-xs bg-muted px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
