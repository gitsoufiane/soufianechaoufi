import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { activities } from "@/lib/activities";

export async function generateMetadata() {
  return {
    title: 'Activities - Soufiane Chaoufi',
    description: 'Explore the professional activities and engagements of Soufiane Chaoufi - conferences, workshops, and community involvement',
    keywords: ['activities', 'conferences', 'workshops', 'community', 'engagement'],
    openGraph: {
      title: 'Activities - Soufiane Chaoufi',
      description: 'Explore the professional activities and engagements of Soufiane Chaoufi - conferences, workshops, and community involvement',
      url: 'https://soufianechaoufi.com/activities',
      siteName: 'Soufiane Chaoufi',
      images: [
        {
          url: 'https://soufianechaoufi.com/og-activities.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
  }
}

export default function ActivitiesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Activities</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <Card key={activity.id} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>{activity.title}</CardTitle>
              <CardDescription className="space-y-2">
                <div>{activity.organization}</div>
                <div>{activity.role}</div>
                <div className="text-sm text-muted-foreground">{activity.date}</div>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1">
              <p className="mb-4">{activity.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {activity.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>

              {(activity.links?.website || activity.links?.certificate) && (
                <div className="space-y-2">
                  {activity.links?.website && (
                    <a
                      href={activity.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Visit Website
                    </a>
                  )}
                  {activity.links?.certificate && (
                    <a
                      href={activity.links.certificate}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      View Certificate
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
