import { MediaItem } from "@/types/media";

export const mediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Project Showcase Video",
    type: "Video",
    date: "2025-02-15",
    description: "A comprehensive overview of our latest project features and capabilities.",
    image: "/media/project-showcase.jpg",
    tags: ["video", "showcase", "project"],
    links: [
      {
        label: "Watch on YouTube",
        url: "https://youtube.com"
      }
    ]
  },
  {
    id: "2",
    title: "Tech Conference Presentation",
    type: "Presentation",
    date: "2025-01-20",
    description: "Slides from my talk about modern web development trends.",
    tags: ["presentation", "conference"],
    links: [
      {
        label: "View Slides",
        url: "https://slides.com"
      }
    ]
  },
  {
    id: "3",
    title: "Podcast Interview",
    type: "Audio",
    date: "2024-12-10",
    description: "Discussion about the future of web technologies and frameworks.",
    tags: ["podcast", "interview"],
    links: [
      {
        label: "Listen on Spotify",
        url: "https://spotify.com"
      }
    ]
  }
];
