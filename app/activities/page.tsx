import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { activities } from "./data/activities";

export const metadata = {
  title: 'Activities | Soufiane Chaoufi',
  description: 'Professional activities, conferences, workshops, and community engagement.',
};

export default function ActivitiesPage() {
  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Activities</h1>
        <p className="text-muted-foreground">
          Conferences, workshops, and other professional activities I've participated in.
        </p>
      </div>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{activity.title}</CardTitle>
                  <p className="text-muted-foreground">{activity.location}</p>
                </div>
                <Badge variant="secondary">{activity.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p>{activity.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
