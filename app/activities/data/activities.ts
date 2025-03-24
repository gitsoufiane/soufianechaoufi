interface Activity {
  title: string;
  description: string;
  date: string;
  type: "conference" | "workshop" | "meetup" | "hackathon" | "other";
  location?: string;
  imageUrl?: string;
  link?: string;
}

export const activities: Activity[] = [
  {
    title: "Example Activity",
    description: "Description of the activity.",
    date: "2024-03",
    type: "conference",
    location: "Virtual",
    imageUrl: "/activities/example.jpg",
    link: "https://example.com/activity",
  },
];
