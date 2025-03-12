import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mediaItems } from "@/lib/media";
import Image from "next/image";

export async function generateMetadata() {
  return {
    title: 'Media - Soufiane Chaoufi',
    description: 'Explore media appearances, interviews, and publications featuring Soufiane Chaoufi - insights and thought leadership in software development',
    keywords: ['media', 'interviews', 'publications', 'appearances', 'thought leadership'],
    openGraph: {
      title: 'Media - Soufiane Chaoufi',
      description: 'Explore media appearances, interviews, and publications featuring Soufiane Chaoufi - insights and thought leadership in software development',
      url: 'https://soufianechaoufi.com/media',
      siteName: 'Soufiane Chaoufi',
      images: [
        {
          url: 'https://soufianechaoufi.com/og-media.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  }
}

export default function MediaPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Media</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mediaItems.map((media) => (
          <Card key={media.id} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>{media.title}</CardTitle>
              <CardDescription className="space-y-2">
                <div>{media.type}</div>
                <div className="text-sm text-muted-foreground">{media.date}</div>
              </CardDescription>
            </CardHeader>
            
            {media.image && (
              <div className="relative aspect-video">
                <Image
                  src={media.image}
                  alt={media.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <CardContent className="flex-1 pt-6">
              <p className="mb-4">{media.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {media.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-2">
              {media.links?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
