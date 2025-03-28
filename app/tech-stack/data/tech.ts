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
    name: "Languages",
    items: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Python", icon: "python" },
    ],
  },
  {
    name: "Frameworks & Libraries",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js" }, // No icon defined in script yet
      { name: "React Native", icon: "react-native" },
      { name: "Django", icon: "django" },
      { name: "React Router", icon: "react-router" },
    ],
  },
  {
    name: "State Management",
    items: [
      { name: "Redux", icon: "redux" },
      { name: "XState", icon: "xstate" },
    ],
  },
  {
    name: "Data Fetching & Caching",
    items: [
      { name: "React Query", icon: "react-query" },
      { name: "GraphQL", icon: "graphql" },
    ],
  },
  {
    name: "Form Management & Validation",
    items: [
      { name: "React Hook Form", icon: "react-hook-form" },
      { name: "Zod", icon: "zod" },
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
    name: "Testing Frameworks",
    items: [
      { name: "Jest", icon: "jest" },
      { name: "Vitest", icon: "vitest" },
      { name: "React Testing Library", icon: "testing-library" },
      { name: "PlayWright", icon: "playwright" },
    ],
  },
  {
    name: "Testing Utilities & Mocking",
    items: [
      { name: "MSW", icon: "msw" },
      { name: "DevTools", icon: "chrome" }, // Using Chrome icon for Browser DevTools
      { name: "Burp Suite", icon: "burp-suite" },
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
    name: "Monorepo Management",
    items: [{ name: "Nx", icon: "nx" }], // Assuming Nx icon exists or will be added
  },
  {
    name: "Development Tools & Environment",
    items: [
      { name: "VSCode", icon: "vscode" },
      { name: "Storybook", icon: "storybook" },
      { name: "Postman", icon: "postman" },
    ],
  },
  {
    name: "Linting and Code Quality",
    items: [
      { name: "ESLint", icon: "eslint" },
      { name: "Prettier", icon: "prettier" },
    ],
  },
  {
    name: "Graphic and UI/UX Design",
    items: [{ name: "Figma", icon: "figma" }],
  },
  {
    name: "Project Management & Collaboration",
    items: [
      { name: "Notion", icon: "notion" },
      { name: "Jira", icon: "jira" },
    ],
  },
  {
    name: "QA Tools",
    items: [
      { name: "TestMo" }, // No icon found
      { name: "TestRail", icon: "testrail" },
    ],
  },
  {
    name: "Monitoring & Observability",
    items: [
      { name: "Sentry", icon: "sentry" },
      { name: "DataDog", icon: "datadog" },
    ],
  },
  {
    name: "Feature Flagging",
    items: [{ name: "LaunchDarkly", icon: "launchdarkly" }], // Assuming LaunchDarkly icon exists
  },
  {
    name: "Methodologies",
    items: [{ name: "Agile/Scrum" }, { name: "TDD" }],
  },
  {
    name: "AI & Machine Learning",
    items: [
      { name: "OpenAI", icon: "openai" },
      { name: "Claude", icon: "claude" },
      { name: "Google Gemini", icon: "gemini" },
      { name: "Deepseek", icon: "deepseek" },
      { name: "Vercel SDK", icon: "vercel" },
      { name: "MCP Model Context Protocol", icon: "mcp" },
      { name: "Cline Agent", icon: "cline" },
      { name: "Cursor", icon: "cursor" },
    ],
  },
];
