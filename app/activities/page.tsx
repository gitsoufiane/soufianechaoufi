'use client';

import { activities, categoryNames, ActivityCategory } from '@/lib/activities';
import { ActivityCard } from '@/components/custom/ActivityCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Mountain, Utensils } from 'lucide-react';

const categoryIcons = {
  photography: <Camera className="w-4 h-4" />,
  hiking: <Mountain className="w-4 h-4" />,
  cooking: <Utensils className="w-4 h-4" />
};

export default function ActivitiesPage() {
  const categories = Object.keys(categoryNames) as ActivityCategory[];

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Activities</h1>
        <p className="text-muted-foreground">
          Exploring various hobbies and activities beyond software development.
        </p>
      </div>

      <Tabs defaultValue="photography" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="flex items-center justify-center gap-2 px-6 py-2"
            >
              {categoryIcons[category]}
              <span>{categoryNames[category]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
              {activities
                .filter((activity) => activity.category === category)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
