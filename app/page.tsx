import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import { projects } from "./projects/projects";
import { books } from "./books/books";
import { techStack } from "./tech-stack/tech";

export const metadata = {
  title: "Soufiane Chaoufi | Senior Frontend Developer",
  description:
    "Senior Frontend Developer with 5+ years of experience delivering high-quality, scalable web applications. Proven ability in React, TypeScript, and design systems.",
  keywords: ["portfolio", "developer", "projects", "tools"],
  openGraph: {
    title: "Soufiane Chaoufi | Senior Frontend Developer",
    description:
      "Senior Frontend Developer with 5+ years of experience delivering high-quality, scalable web applications. Proven ability in React, TypeScript, and design systems.",
    url: "https://soufianechaoufi.com",
    siteName: "Soufiane Chaoufi",
    images: [
      {
        url: "https://soufianechaoufi.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const recentBooks = books.slice(0, 3);
  const skillCategories = techStack.slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <Image
                src="/profil.png"
                alt="Soufiane Chaoufi"
                fill
                className="rounded-full object-cover border-4 border-primary/10"
                priority
              />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent capitalize">
                soufiane chaoufi
              </h1>
              <div className="text-2xl sm:text-3xl text-muted-foreground">
                <span className="inline-block">Senior Frontend Developer</span>
              </div>
              <p className="max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Building scalable web experiences that users love. 5+ years crafting exceptional digital products 
                with React, TypeScript, and modern web technologies.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/projects">
                  View My Work
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/contact">
                  Let's Connect
                  <Mail className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            <div className="flex justify-center gap-6 pt-4">
              <Link href="https://github.com/gitsoufiane" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-6 h-6" />
              </Link>
              <Link href="https://www.linkedin.com/in/soufianechaoufi/" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-6 h-6" />
              </Link>
              <Link href="mailto:contact@soufianechaoufi.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A selection of projects that showcase my expertise in building modern web applications.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project) => (
              <Card key={project.title} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {project.liveUrl && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.liveUrl} target="_blank">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={project.githubUrl} target="_blank">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tech Stack</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Technologies I work with to build exceptional digital experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {skillCategories.map((category) => (
              <Card key={category.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.items.slice(0, 4).map((item) => (
                      <Badge key={item.name} variant="outline" className="text-xs">
                        {item.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/tech-stack">
                View Complete Tech Stack
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reading List Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Currently Reading</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Books that inspire my approach to technology and personal growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {recentBooks.map((book) => (
              <Card key={book.title} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-20 flex-shrink-0">
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        by {book.author}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span key={i} className={i < book.rating ? "★" : "☆"}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({book.rating}/5)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/books">
                View Reading List
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to discuss your next project?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities and challenging projects. 
            Let's create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Get In Touch
                <Mail className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/projects">
                View My Work
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
