import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface TechItem {
  name: string;
  category: string;
  icon: string;
}

const techStack: TechItem[] = [
  // Languages & Core Technologies
  { name: "TypeScript", category: "Languages", icon: "/tech-stack/typescript.svg" },
  { name: "Next.js", category: "Frontend", icon: "/tech-stack/nextjs.svg" },
  { name: "React", category: "Frontend", icon: "/tech-stack/react.svg" },
  { name: "Node.js", category: "Backend", icon: "/tech-stack/nodejs.svg" },
  
  // UI & Styling
  { name: "Tailwind CSS", category: "Styling", icon: "/tech-stack/tailwind.svg" },
  { name: "Shadcn UI", category: "UI", icon: "/tech-stack/shadcn.svg" },
  
  // Database & ORM
  { name: "PostgreSQL", category: "Database", icon: "/tech-stack/postgresql.svg" },
  { name: "Prisma", category: "ORM", icon: "/tech-stack/prisma.svg" },
];

export default function TechStackPage() {
  const categories = Array.from(new Set(techStack.map(tech => tech.category)));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tech Stack</h1>
      
      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category} className="space-y-4">
            <h2 className="text-2xl font-semibold">{category}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {techStack
                .filter(tech => tech.category === category)
                .map((tech) => (
                  <Card key={tech.name} className="p-4 flex items-center space-x-4">
                    <div className="relative w-12 h-12">
                      <Image
                        src={tech.icon}
                        alt={`${tech.name} icon`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{tech.name}</h3>
                      <Badge variant="secondary" className="mt-1">
                        {tech.category}
                      </Badge>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
