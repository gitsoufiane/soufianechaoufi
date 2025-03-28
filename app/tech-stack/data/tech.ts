// app/tech-stack/data/tech.ts
export interface TechItem {
  name: string;
  icon?: string; // Corresponds to the key in download script's iconUrls
}

export interface TechCategory {
  name: string;
  items: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    name: "Methodologies",
    items: [{ name: "Agile/Scrum" }, { name: "TDD" }],
  },
  {
    name: "Frontend Development",
    items: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "React", icon: "react" },
      { name: "Redux", icon: "redux" },
      { name: "GraphQL", icon: "graphql" },
      { name: "React Hook Form", icon: "react-hook-form" },
      { name: "React Query", icon: "react-query" },
      { name: "React Router", icon: "react-router" },
      { name: "Zod", icon: "zod" },
      { name: "Storybook", icon: "storybook" },
      { name: "XState", icon: "xstate" },
    ],
  },
  {
    name: "Styling",
    items: [
      { name: "TailwindCSS", icon: "tailwindcss" },
      { name: "Styled Components", icon: "styled-components" },
    ],
  },
  {
    name: "Monorepo Management",
    items: [{ name: "Nx", icon: "nx" }],
  },
  {
    name: "Testing / Debugging",
    items: [
      { name: "Jest", icon: "jest" },
      { name: "Vitest", icon: "vitest" },
      { name: "React Testing Library", icon: "testing-library" },
      { name: "PlayWright", icon: "playwright" },
      { name: "DevTools", icon: "chrome" }, // Using Chrome icon
      { name: "Burp Suite", icon: "burp-suite" },
      { name: "MSW", icon: "msw" }, // Added MSW
    ],
  },
  {
    name: "Version Control",
    items: [{ name: "Git", icon: "git" }],
  },
  {
    name: "CI/CD",
    items: [{ name: "GitHub Actions", icon: "github-actions" }],
  },
  {
    name: "Graphic and UI/UX Design",
    items: [{ name: "Figma", icon: "figma" }],
  },
  {
    name: "Linting and Code Quality",
    items: [
      { name: "ESLint", icon: "eslint" },
      { name: "Prettier", icon: "prettier" },
    ],
  },
  {
    name: "Backend Development",
    items: [
      { name: "Python", icon: "python" },
      { name: "Django", icon: "django" },
    ],
  },
  {
    name: "QA",
    items: [
      { name: "TestMo" }, // No icon found
      { name: "TestRail", icon: "testrail" },
    ],
  },
  {
    name: "Tools",
    items: [
      { name: "Notion", icon: "notion" },
      { name: "Postman", icon: "postman" },
      { name: "VSCode", icon: "vscode" },
      { name: "LaunchDarkly", icon: "launchdarkly" },
      { name: "Sentry", icon: "sentry" },
      { name: "DataDog", icon: "datadog" },
      { name: "Jira", icon: "jira" },
    ],
  },
];
