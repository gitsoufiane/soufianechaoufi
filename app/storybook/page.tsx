import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Storybook - UI Component Library | Soufiane Chaoufi",
  description:
    "Explore the complete UI component library built with React, TypeScript, and Tailwind CSS. Interactive component documentation powered by Storybook.",
};

export default function StorybookPage() {
  const isDevelopment = process.env.NODE_ENV === "development";
  const storybookUrl = isDevelopment
    ? "http://localhost:6006"
    : "/.storybook-static/index.html";

  return (
    <div className="relative h-screen w-full">
      <iframe
        src={storybookUrl}
        className="absolute inset-0 h-full w-full border-0"
        title="Storybook UI Component Library"
      />
      {isDevelopment && (
        <div className="absolute left-4 top-4 rounded-md bg-black/80 px-3 py-2 text-sm text-white">
          Run <code className="rounded bg-white/20 px-1">yarn storybook</code>{" "}
          to view components
        </div>
      )}
    </div>
  );
}
