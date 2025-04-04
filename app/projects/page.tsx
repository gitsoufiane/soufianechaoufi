import { Wrench } from "lucide-react";

export const metadata = {
  title: "Projects | Soufiane Chaoufi",
  description:
    "A showcase of my projects, including web development, software engineering, and other technical endeavors.",
};

export default function ProjectsPage() {
  return (
    <div className="container mx-auto max-w-7xl py-8">
      {/* Replace existing content with this centered block */}
      <div className="flex min-h-[calc(100vh-theme(spacing.16)*2)] flex-col items-center justify-center text-center">
        {" "}
        {/* Adjust height calculation based on nav/footer */}
        <Wrench className="text-muted-foreground mb-4 h-16 w-16" />
        <h1 className="text-2xl font-semibold">Projects</h1>
        <p className="text-muted-foreground">
          This section is currently under construction. Check back soon!
        </p>
      </div>
    </div>
  );
}
