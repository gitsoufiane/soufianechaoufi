import { Wrench } from "lucide-react";

export const metadata = {
  title: "Tech Stack | Soufiane Chaoufi",
  description:
    "Overview of the technologies, tools, and languages I use in software development.",
};

export default function TechStackPage() {
  return (
    <div className="container mx-auto max-w-7xl py-8">
      {/* Centered block */}
      <div className="flex min-h-[calc(100vh-theme(spacing.16)*2)] flex-col items-center justify-center text-center">
        <Wrench className="text-muted-foreground mb-4 h-16 w-16" />
        <h1 className="text-2xl font-semibold">Tech Stack</h1>
        <p className="text-muted-foreground">
          This section is currently under construction. Check back soon!
        </p>
      </div>
    </div>
  );
}
