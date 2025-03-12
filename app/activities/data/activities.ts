import { Activity } from "@/types/activity";

export const activities: Activity[] = [
  {
    id: '1',
    title: 'Mountain Photography',
    description: 'Capturing the stunning landscapes of mountain ranges and natural scenery.',
    date: '2024-03',
    category: 'photography',
    tags: ['Landscape', 'Nature', 'Mountains'],
    coverImage: '/images/mountain-photography.jpg'
  },
  {
    id: '2',
    title: 'Grouse Grind Hike',
    description: 'Completed the challenging Grouse Grind trail, known as "Mother Nature\'s Stairmaster".',
    date: '2024-02',
    location: 'North Vancouver, BC',
    category: 'hiking',
    tags: ['Mountain', 'Trail', 'Fitness'],
    coverImage: '/images/grouse-grind.jpg'
  },
  {
    id: '3',
    title: 'Italian Cuisine Workshop',
    description: 'Learned to make authentic Italian pasta and sauces from scratch.',
    date: '2024-01',
    category: 'cooking',
    tags: ['Italian', 'Pasta', 'Cooking Class'],
    coverImage: '/images/italian-cuisine.jpg'
  }
];

export type ActivityCategory = 'photography' | 'hiking' | 'cooking';

export const categoryNames = {
  photography: 'Photography',
  hiking: 'Hiking & Outdoor',
  cooking: 'Cooking & Culinary'
};
