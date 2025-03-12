interface TechItem {
  name: string;
  description?: string;
  icon?: string;
}

interface TechCategory {
  title: string;
  items: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    title: "Soft Skills",
    items: [
      { name: "Clear Communication" },
      { name: "Team Collaboration" },
      { name: "Cross-functional Team Work" },
      { name: "Fast Learning" }
    ]
  },
  {
    title: "Methodologies",
    items: [
      { name: "Agile/Scrum", description: "Project management with Jira" },
      { name: "TDD", description: "Test-Driven Development" }
    ]
  },
  {
    title: "Frontend Development",
    items: [
      { name: "HTML", icon: "/tech-stack/html.svg" },
      { name: "CSS", icon: "/tech-stack/css.svg" },
      { name: "JavaScript", icon: "/tech-stack/javascript.svg" },
      { name: "TypeScript", icon: "/tech-stack/typescript.svg" },
      { name: "React", icon: "/tech-stack/react.svg" },
      { name: "React Native", icon: "/tech-stack/react-native.svg" },
      { name: "React Hook Form", icon: "/tech-stack/react-hook-form.svg" },
      { name: "React Query", icon: "/tech-stack/react-query.svg" },
      { name: "Redux", icon: "/tech-stack/redux.svg" },
      { name: "GraphQL", icon: "/tech-stack/graphql.svg" },
      { name: "Zod", icon: "/tech-stack/zod.svg" },
      { name: "React Router" },
      { name: "Storybook", icon: "/tech-stack/storybook.svg" },
      { name: "LaunchDarkly", icon: "/tech-stack/launchdarkly.svg" }
    ]
  },
  {
    title: "Styling & UI",
    items: [
      { name: "TailwindCSS", icon: "/tech-stack/tailwindcss.svg" },
      { name: "shadcn/ui", icon: "/tech-stack/shadcn.svg", description: "Accessible and customizable UI components" },
      { name: "Styled Components", icon: "/tech-stack/styled-components.svg" },
      { name: "Design System" }
    ]
  },
  {
    title: "Monorepo Management",
    items: [
      { name: "Nx", icon: "/tech-stack/nx.svg", description: "Smart, fast and extensible build system" }
    ]
  },
  {
    title: "Testing & Debugging",
    items: [
      { name: "Jest", icon: "/tech-stack/jest.svg" },
      { name: "Vitest", icon: "/tech-stack/vitest.svg" },
      { name: "React Testing Library", icon: "/tech-stack/testing-library.svg" },
      { name: "Playwright", icon: "/tech-stack/playwright.svg" },
      { name: "DevTools", icon: "/tech-stack/chrome.svg" }
    ]
  },
  {
    title: "Version Control",
    items: [
      { name: "Git", icon: "/tech-stack/git.svg" }
    ]
  },
  {
    title: "CI/CD",
    items: [
      { name: "GitHub Actions", icon: "/tech-stack/github-actions.svg" }
    ]
  },
  {
    title: "Design",
    items: [
      { name: "Figma", icon: "/tech-stack/figma.svg" }
    ]
  },
  {
    title: "Code Quality",
    items: [
      { name: "ESLint", icon: "/tech-stack/eslint.svg" },
      { name: "Prettier", icon: "/tech-stack/prettier.svg", description: "Code formatting" },
      { name: "Husky", icon: "/tech-stack/husky.svg" }
    ]
  },
  {
    title: "Backend Development",
    items: [
      { name: "Python", icon: "/tech-stack/python.svg" },
      { name: "Django", icon: "/tech-stack/django.svg" }
    ]
  },
  {
    title: "QA",
    items: [
      { name: "TestMo" },
      { name: "TestRail", icon: "/tech-stack/testrail.svg" }
    ]
  },
  {
    title: "Tools",
    items: [
      { name: "Notion", icon: "/tech-stack/notion.svg", description: "Documentation & collaboration" },
      { name: "Postman", icon: "/tech-stack/postman.svg" },
      { name: "VS Code", icon: "/tech-stack/vscode.svg" },
      { name: "LaunchDarkly", icon: "/tech-stack/launchdarkly.svg" },
      { name: "Sentry", icon: "/tech-stack/sentry.svg" }
    ]
  }
];
