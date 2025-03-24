interface ExperienceItem {
  title: string;
  organization: string;
  location?: string;
  period: string;
  description?: string[];
  technologies?: string[];
  icon?: string;
}

interface TechItem {
  name: string;
  description?: string;
  icon?: string;
}

interface Category {
  title: string;
  items: TechItem[];
}

interface LanguageItem {
  name: string;
  description: string;
  icon: string;
}

interface ExperienceData {
  education: ExperienceItem[];
  workExperience: ExperienceItem[];
  skills: Category[];
  languages: LanguageItem[];
}

export const resumeData: ExperienceData = {
  education: [
    {
      title: "Master's Degree in Computer Science",
      organization:
        "École Nationale Supérieure d'Informatique et d'Analyse des Systèmes (ENSIAS)",
      period: "September 2009 – June 2012",
      location: "Rabat, Morocco",
    },
  ],
  workExperience: [
    {
      title: "Ask for work experience",
      organization: "Need company name",
      period: "Need dates",
      location: "Need location",
      description: ["Need job responsibilities"],
    },
  ],
  skills: [
    {
      title: "Soft Skills",
      items: [
        { name: "Effective cross-functional communication" },
        { name: "Strong collaborative and interpersonal skills" },
        { name: "Fast learner with adaptability to new technologies" },
        { name: "Excellent problem-solving abilities" },
        { name: "Highly organized and proactive in project execution" },
      ],
    },
    {
      title: "Frontend Development",
      items: [
        { name: "HTML", icon: "/tech-stack/html.svg" },
        { name: "CSS", icon: "/tech-stack/css.svg" },
        { name: "JavaScript", icon: "/tech-stack/javascript.svg" },
        { name: "TypeScript", icon: "/tech-stack/typescript.svg" },
        { name: "React", icon: "/tech-stack/react.svg" },
        { name: "React Hooks", icon: "/tech-stack/react.svg" },
        { name: "Redux", icon: "/tech-stack/redux.svg" },
        { name: "GraphQL", icon: "/tech-stack/graphql.svg" },
        { name: "React Router" },
        { name: "React Hook Form", icon: "/tech-stack/react-hook-form.svg" },
        { name: "React Query", icon: "/tech-stack/react-query.svg" },
        { name: "Zod", icon: "/tech-stack/zod.svg" },
        { name: "XState" },
        { name: "Storybook", icon: "/tech-stack/storybook.svg" },
        { name: "Design Systems" },
      ],
    },
    {
      title: "Styling",
      items: [
        { name: "TailwindCSS", icon: "/tech-stack/tailwindcss.svg" },
        {
          name: "Styled Components",
          icon: "/tech-stack/styled-components.svg",
        },
      ],
    },
    {
      title: "Testing & QA",
      items: [
        { name: "Jest", icon: "/tech-stack/jest.svg" },
        { name: "Vitest", icon: "/tech-stack/vitest.svg" },
        {
          name: "React Testing Library",
          icon: "/tech-stack/testing-library.svg",
        },
        { name: "Playwright", icon: "/tech-stack/playwright.svg" },
        { name: "TestMo" },
        { name: "TestRail", icon: "/tech-stack/testrail.svg" },
        { name: "Chrome DevTools", icon: "/tech-stack/chrome.svg" },
      ],
    },
    {
      title: "Monorepo Management",
      items: [{ name: "Nx", icon: "/tech-stack/nx.svg" }],
    },
    {
      title: "CI/CD",
      items: [
        { name: "GitHub Actions", icon: "/tech-stack/github-actions.svg" },
      ],
    },
    {
      title: "Code Quality",
      items: [
        { name: "ESLint", icon: "/tech-stack/eslint.svg" },
        { name: "Prettier", icon: "/tech-stack/prettier.svg" },
        { name: "LaunchDarkly", icon: "/tech-stack/launchdarkly.svg" },
        { name: "Sentry", icon: "/tech-stack/sentry.svg" },
        { name: "Datadog", icon: "/tech-stack/datadog.svg" },
      ],
    },
    {
      title: "Backend Development",
      items: [
        { name: "Python", icon: "/tech-stack/python.svg" },
        { name: "Django", icon: "/tech-stack/django.svg" },
        { name: "REST APIs" },
      ],
    },
    {
      title: "Design & Prototyping",
      items: [{ name: "Figma", icon: "/tech-stack/figma.svg" }],
    },
    {
      title: "Methodologies",
      items: [
        { name: "Agile/Scrum", description: "Project management with Jira" },
        { name: "TDD", description: "Test-Driven Development" },
      ],
    },
    {
      title: "Collaboration Tools",
      items: [
        { name: "Jira" },
        { name: "Notion", icon: "/tech-stack/notion.svg" },
        { name: "Postman", icon: "/tech-stack/postman.svg" },
        { name: "VS Code", icon: "/tech-stack/vscode.svg" },
        { name: "PagerDuty", icon: "/tech-stack/pagerduty.svg" },
      ],
    },
  ],
  languages: [
    {
      name: "English",
      description: "Professional Fluency",
      icon: "/tech-stack/gb.svg",
    },
    {
      name: "French",
      description: "Professional Fluency",
      icon: "/tech-stack/fr.svg",
    },
    { name: "Arabic", description: "Native", icon: "/tech-stack/ma.svg" },
    { name: "Spanish", description: "Basic", icon: "/tech-stack/es.svg" },
  ],
};
