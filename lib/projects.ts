import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: '1',
    title: 'Portfolio Website',
    description: 'My personal portfolio showcasing my skills and projects',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI'],
    contributions: [
      'Designed and implemented responsive UI',
      'Integrated dark/light theme support',
      'Created reusable components',
      'Optimized performance'
    ],
    githubUrl: 'https://github.com/username/portfolio',
    liveUrl: 'https://portfolio.com'
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce application with modern features',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma'],
    contributions: [
      'Implemented product catalog',
      'Developed shopping cart functionality',
      'Created admin dashboard',
      'Integrated payment gateway'
    ],
    githubUrl: 'https://github.com/username/ecommerce',
    liveUrl: 'https://ecommerce.com'
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'Collaborative task management tool for teams',
    technologies: ['React', 'Firebase', 'Material UI'],
    contributions: [
      'Implemented real-time collaboration',
      'Developed task assignment system',
      'Created notification system',
      'Optimized for mobile devices'
    ],
    githubUrl: 'https://github.com/username/task-manager',
    liveUrl: 'https://tasks.com'
  }
];
