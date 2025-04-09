import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { techStack, TechCategory, TechItem } from "./tech"; // Import the data
import { TechIcon } from "@/components/custom/TechIcon"; // Import the new client component

export const metadata = {
  title: "Tech Stack | Soufiane Chaoufi",
  description:
    "Overview of the technologies, tools, and languages I use in software development.",
};

// getIconPath function removed as we now use direct iconUrl from tech.ts
export default function TechStackPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <h1 className="mb-8 text-center text-3xl font-bold tracking-tight sm:text-4xl">
        My Tech Stack
      </h1>
      <p className="text-muted-foreground mb-12 text-center text-lg">
        The tools, languages, and frameworks I frequently use to build software.
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {techStack.map((category: TechCategory) => (
          <Card key={category.name}>
            <CardHeader>
              <CardTitle>{category.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <TooltipProvider delayDuration={100}>
                <ul className="flex flex-wrap gap-4">
                  {category.items.map((item: TechItem) => {
                    // Directly use item.iconUrl if available
                    const iconUrl = item.iconUrl;
                    return (
                      <li key={item.name}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            {/* Container div for the tooltip trigger */}
                            <div className="bg-card hover:bg-accent hover:text-accent-foreground flex h-16 w-16 items-center justify-center rounded-lg border p-2 transition-colors">
                              {/* Use the TechIcon client component */}
                              <TechIcon item={item} iconUrl={iconUrl} />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </li>
                    );
                  })}
                </ul>
              </TooltipProvider>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
