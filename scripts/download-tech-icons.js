const fs = require("fs");
const https = require("https");
const path = require("path");

const iconUrls = {
  html: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
  css: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
  javascript:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
  typescript:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
  react:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
  "react-native":
    "https://raw.githubusercontent.com/kristerkari/react-native-svg-transformer/master/images/react-native-logo.png",
  redux:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg",
  graphql:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/graphql/graphql-plain.svg",
  "react-hook-form":
    "https://avatars.githubusercontent.com/u/53986236?s=200&v=4",
  "react-query":
    "https://raw.githubusercontent.com/TanStack/query/main/docs/src/images/emblem-light.svg",
  zod: "https://zod.dev/logo.svg",
  storybook:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/storybook/storybook-original.svg",
  tailwindcss:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg",
  shadcn: "https://avatars.githubusercontent.com/u/124599?v=4",
  "styled-components":
    "https://raw.githubusercontent.com/styled-components/brand/master/styled-components.svg",
  nx: "https://nx.dev/images/nx-logo-white.svg",
  jest: "https://raw.githubusercontent.com/devicons/devicon/master/icons/jest/jest-plain.svg",
  vitest: "https://vitest.dev/logo.svg",
  "testing-library": "https://testing-library.com/img/octopus-128x128.png",
  playwright: "https://playwright.dev/img/playwright-logo.svg",
  chrome:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/chrome/chrome-original.svg",
  git: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
  "github-actions":
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg",
  figma:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg",
  eslint:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/eslint/eslint-original.svg",
  prettier: "https://prettier.io/icon.png",
  husky: "https://raw.githubusercontent.com/typicode/husky/main/docs/logo.png",
  python:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
  django:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg",
  testrail:
    "https://media.gurock.com/gk-media/logos/TestRail%20Logo%20Square.svg",
  vscode:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg",
  postman: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
  notion: "https://www.vectorlogo.zone/logos/notion/notion-icon.svg",
  launchdarkly: "https://avatars.githubusercontent.com/u/19977010?s=200&v=4",
  sentry:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/sentry/sentry-original.svg",
};

const outputDir = path.join(__dirname, "../public/tech-stack");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

Object.entries(iconUrls).forEach(([name, url]) => {
  const outputPath = path.join(outputDir, `${name}.svg`);

  https
    .get(url, (response) => {
      const file = fs.createWriteStream(outputPath);
      response.pipe(file);

      file.on("finish", () => {
        file.close();
        console.log(`Downloaded: ${name}`);
      });
    })
    .on("error", (err) => {
      console.error(`Error downloading ${name}: ${err.message}`);
    });
});
