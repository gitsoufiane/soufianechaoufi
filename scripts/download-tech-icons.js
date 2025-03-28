const fs = require("fs");
const https = require("https");
const path = require("path");
const { URL } = require("url"); // Import URL module

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
    "https://raw.githubusercontent.com/TanStack/query/main/media/emblem-light.svg",
  zod: "https://zod.dev/logo.svg",
  storybook:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/storybook/storybook-original.svg",
  tailwindcss:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  shadcn: "https://avatars.githubusercontent.com/u/124599?v=4",
  "styled-components":
    "https://raw.githubusercontent.com/styled-components/brand/master/styled-components.svg",
  nx: "https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.svg",
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
  python:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
  django:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/django/django-plain.svg",
  testrail: "https://assets.gurock.com/general/logo/testrail/icon.svg",
  vscode:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg",
  postman: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
  notion:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg",
  launchdarkly: "https://avatars.githubusercontent.com/u/19977010?s=200&v=4",
  sentry:
    "https://raw.githubusercontent.com/devicons/devicon/master/icons/sentry/sentry-original.svg",
};

// --- Add URLs for missing icons ---
iconUrls["react-router"] =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg";
iconUrls["xstate"] = "https://xstate.js.org/logo.svg";
iconUrls["burp-suite"] =
  "https://portswigger.net/burp/assets/images/burp-suite-logo.svg";
iconUrls["datadog"] =
  "https://www.vectorlogo.zone/logos/datadoghq/datadoghq-icon.svg";
iconUrls["jira"] =
  "https://raw.githubusercontent.com/devicons/devicon/master/icons/jira/jira-original.svg";
iconUrls["msw"] =
  "https://raw.githubusercontent.com/mswjs/msw/main/media/msw-logo.svg";
// Note: Could not find a suitable icon URL for TestMo.

const outputDir = path.join(__dirname, "../public/tech-stack");

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

Object.entries(iconUrls).forEach(([name, url]) => {
  https
    .get(url, (response) => {
      // --- Add status code check ---
      if (response.statusCode !== 200) {
        console.error(
          `Error downloading ${name}: Status Code ${response.statusCode}`,
        );
        response.resume(); // Consume response data to free up memory
        return;
      }

      // --- Determine extension from Content-Type header (preferred) or URL ---
      let extension = ".svg"; // Default
      const contentType = response.headers["content-type"];
      let foundExtension = false;

      if (contentType) {
        if (contentType.includes("svg")) extension = ".svg";
        else if (contentType.includes("png")) extension = ".png";
        else if (contentType.includes("jpeg") || contentType.includes("jpg"))
          extension = ".jpg";
        else if (contentType.includes("gif")) extension = ".gif";
        else if (contentType.includes("webp")) extension = ".webp";
        else {
          console.warn(
            `Unrecognized Content-Type '${contentType}' for ${name}. Falling back to URL.`,
          );
        }
        if (extension !== ".svg") foundExtension = true; // Mark if found via content-type
      } else {
        console.warn(
          `No Content-Type header for ${name}. Falling back to URL.`,
        );
      }

      // Fallback to URL path if Content-Type didn't yield a specific extension
      if (!foundExtension) {
        try {
          const parsedUrl = new URL(url);
          const detectedExtension = path.extname(parsedUrl.pathname);
          if (
            detectedExtension &&
            [".svg", ".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(
              detectedExtension.toLowerCase(),
            )
          ) {
            extension = detectedExtension.toLowerCase();
          } else if (detectedExtension) {
            console.warn(
              `Detected unusual extension '${detectedExtension}' via URL for ${name}. Defaulting to .svg`,
            );
          }
        } catch (e) {
          console.error(
            `Error parsing URL ${url} for ${name} during fallback. Error: ${e.message}`,
          );
        }
      }
      // --- End extension logic ---

      const outputPath = path.join(outputDir, `${name}${extension}`); // Use determined extension
      const file = fs.createWriteStream(outputPath);
      response.pipe(file);

      file.on("finish", () => {
        file.close();
        console.log(`Downloaded: ${name}${extension}`); // Log with correct extension
      });
      // --- Add file write error handling ---
      file.on("error", (err) => {
        console.error(`Error writing file ${outputPath}: ${err.message}`);
        fs.unlink(outputPath, () => {}); // Attempt to delete partial file
      });
    })
    .on("error", (err) => {
      // Handle request errors (e.g., DNS resolution)
      console.error(
        `Error during download request for ${name}: ${err.message}`,
      );
    });
});
