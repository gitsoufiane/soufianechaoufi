import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin } from 'lucide-react';
import { Activity } from '@/types/activity';

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        {activity.coverImage && (
          <img
            src={activity.coverImage}
            alt={activity.title}
            className="w-full h-32 object-cover mb-2"
          />
        )}
        <CardTitle className="flex items-start justify-between">
          <span>{activity.title}</span>
        </CardTitle>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="mr-1 h-4 w-4" />
            <span>{activity.date}</span>
          </div>
          {activity.location && (
            <div className="flex items-center">
              <MapPin className="mr-1 h-4 w-4" />
              <span>{activity.location}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{activity.description}</p>
        {activity.tags && (
          <div className="flex flex-wrap gap-2">
            {activity.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
