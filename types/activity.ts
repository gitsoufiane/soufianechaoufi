export type Activity = {
  id: string;
  title: string;
  organization: string;
  role: string;
  date: string;
  description: string;
  skills: string[];
  links?: {
    website?: string;
    certificate?: string;
  };
};
