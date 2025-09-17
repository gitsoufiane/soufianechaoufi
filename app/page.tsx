import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Home() {

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-8 text-center">
            <div className="relative mx-auto mb-8 h-32 w-32">
              <Image
                src="/profil.png"
                alt="Soufiane Chaoufi"
                fill
                sizes="(max-width: 768px) 128px, 128px"
                className="border-primary/10 rounded-full border-4 object-cover"
                priority
              />
            </div>

            <div className="space-y-4">
              <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent capitalize sm:text-6xl">
                soufiane chaoufi
              </h1>
              <div className="text-muted-foreground text-2xl sm:text-3xl">
                <span className="inline-block">Senior Frontend Developer</span>
              </div>
              <p className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed sm:text-xl">
                Building scalable web experiences that users love. 5+ years
                crafting exceptional digital products with React, TypeScript,
                and modern web technologies.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/blog">
                  Read My Articles
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link href="/contact">
                  Let's Connect
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="flex justify-center gap-6 pt-4">
              <Link
                href="https://github.com/gitsoufiane"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/soufianechaoufi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link
                href="mailto:contact@soufianechaoufi.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>




      {/* Call to Action */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ready to discuss your next project?
          </h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-xl">
            I'm always interested in hearing about new opportunities and
            challenging projects. Let's create something amazing together.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2">
              <Link href="/contact">
                Get In Touch
                <Mail className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/blog">
                Read Articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
