export interface MediaItem {
  id: string;
  title: string;
  type: string;
  date: string;
  description: string;
  image?: string;
  tags: string[];
  links?: Array<{
    label: string;
    url: string;
  }>;
}
