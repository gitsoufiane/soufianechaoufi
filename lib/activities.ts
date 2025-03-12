import { Activity } from "@/types/activity";

export const activities: Activity[] = [
  {
    id: "1",
    title: "Volunteer Mentor",
    organization: "Tech for Good",
    role: "Mentor",
    date: "2023 - Present",
    description: "Mentored junior developers in web development best practices and career guidance.",
    skills: ["Mentoring", "JavaScript", "React"],
    links: {
      website: "https://techforgood.org"
    }
  },
  {
    id: "2",
    title: "Hackathon Organizer",
    organization: "Code for Change",
    role: "Lead Organizer",
    date: "2022",
    description: "Organized a 48-hour hackathon focused on social impact projects.",
    skills: ["Event Planning", "Team Leadership", "Public Speaking"],
    links: {
      website: "https://codeforchange.dev"
    }
  },
  {
    id: "3",
    title: "Workshop Facilitator",
    organization: "Women Who Code",
    role: "Speaker",
    date: "2021",
    description: "Conducted workshops on modern web development techniques and tools.",
    skills: ["Teaching", "Web Development", "Public Speaking"],
    links: {
      certificate: "https://certificates.womenwhocode.com/12345"
    }
  }
];
