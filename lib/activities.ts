export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  images?: string[];
  location?: string;
  category: 'photography' | 'hiking' | 'cooking';
  tags?: string[];
}

export const activities: Activity[] = [
  {
    id: '1',
    title: 'Mountain Photography',
    description: 'Capturing the stunning landscapes of mountain ranges and natural scenery.',
    date: '2024-03',
    category: 'photography',
    tags: ['Landscape', 'Nature', 'Mountains'],
  },
  {
    id: '2',
    title: 'Grouse Grind Hike',
    description: 'Completed the challenging Grouse Grind trail, known as "Mother Nature\'s Stairmaster".',
    date: '2024-02',
    location: 'North Vancouver, BC',
    category: 'hiking',
    tags: ['Mountain', 'Trail', 'Fitness'],
  },
  {
    id: '3',
    title: 'Italian Cuisine Workshop',
    description: 'Learned to make authentic Italian pasta and sauces from scratch.',
    date: '2024-01',
    category: 'cooking',
    tags: ['Italian', 'Pasta', 'Cooking Class'],
  }
];

export type ActivityCategory = 'photography' | 'hiking' | 'cooking';

export const categoryNames = {
  photography: 'Photography',
  hiking: 'Hiking & Outdoor',
  cooking: 'Cooking & Culinary'
};
