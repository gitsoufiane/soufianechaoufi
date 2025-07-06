import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Calendar, Award, ExternalLink, Mail, Linkedin, Github } from "lucide-react";
import { techStack } from "../tech-stack/tech";

export const metadata = {
  title: "About | Soufiane Chaoufi",
  description:
    "Learn more about Soufiane Chaoufi - Senior Frontend Developer with 5+ years of experience in React, TypeScript, and modern web technologies.",
};

export default function AboutPage() {
  const experience = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      location: "Vancouver, Canada",
      description: "Leading frontend development for complex web applications, mentoring junior developers, and implementing scalable design systems.",
      technologies: ["React", "TypeScript", "Next.js", "TailwindCSS", "GraphQL"]
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency Pro",
      period: "2020 - 2022",
      location: "Montreal, Canada",
      description: "Developed responsive web applications for various clients, focusing on performance optimization and user experience.",
      technologies: ["React", "JavaScript", "SCSS", "Node.js", "MongoDB"]
    },
    {
      title: "Junior Frontend Developer",
      company: "StartupXYZ",
      period: "2019 - 2020",
      location: "Remote",
      description: "Built and maintained company's main product interface, collaborated with design team to implement pixel-perfect UIs.",
      technologies: ["Vue.js", "JavaScript", "CSS3", "Firebase"]
    }
  ];

  const skills = techStack.slice(0, 6);
  
  const values = [
    {
      title: "Quality First",
      description: "I believe in writing clean, maintainable code that stands the test of time."
    },
    {
      title: "User-Centric",
      description: "Every line of code I write is with the end user's experience in mind."
    },
    {
      title: "Continuous Learning",
      description: "Technology evolves rapidly, and I'm committed to staying at the forefront."
    },
    {
      title: "Collaboration",
      description: "Great products are built by great teams working together towards a common goal."
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="relative w-40 h-40 mx-auto mb-8">
            <Image
              src="/profil.png"
              alt="Soufiane Chaoufi"
              fill
              className="rounded-full object-cover border-4 border-primary/10"
              priority
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Hi, I'm Soufiane
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            A passionate Senior Frontend Developer who loves crafting exceptional digital experiences 
            that make a difference in people's lives.
          </p>
          <div className="flex items-center justify-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Vancouver, Canada</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>5+ Years Experience</span>
            </div>
          </div>
        </section>

        {/* My Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">My Story</h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              My journey into web development started during my computer science studies, where I discovered 
              my passion for creating intuitive user interfaces. What began as curiosity about how websites 
              work quickly evolved into a deep fascination with the intersection of design and technology.
            </p>
            <p>
              Over the past 5+ years, I've had the privilege of working with diverse teams and clients, 
              from early-stage startups to established enterprises. Each project has taught me valuable 
              lessons about problem-solving, user empathy, and the importance of clean, maintainable code.
            </p>
            <p>
              When I'm not coding, you'll find me reading about the latest web technologies, contributing 
              to open-source projects, or exploring the beautiful landscapes of British Columbia. I believe 
              that staying curious and maintaining a healthy work-life balance makes me a better developer 
              and team member.
            </p>
          </div>
        </section>

        {/* Experience Timeline */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Experience</h2>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-lg font-medium text-primary">
                        {job.company}
                      </CardDescription>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{job.period}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {skills.map((category) => (
              <Card key={category.name}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.items.slice(0, 5).map((item) => (
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
            <Button asChild variant="outline">
              <Link href="/tech-stack">
                View Complete Tech Stack
                <ExternalLink className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Values & Approach */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Values & Approach</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Personal Interests */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Beyond Code</h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">What I Love</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Reading about emerging technologies and industry trends</li>
                    <li>• Contributing to open-source projects</li>
                    <li>• Photography and exploring nature</li>
                    <li>• Learning new languages (currently improving my French)</li>
                    <li>• Mentoring aspiring developers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Fun Facts</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• I've visited over 15 countries</li>
                    <li>• I can solve a Rubik's cube in under 2 minutes</li>
                    <li>• I'm a coffee enthusiast (currently perfecting my pour-over technique)</li>
                    <li>• I volunteer as a coding instructor for local non-profits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Connect */}
        <section className="text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-primary/5">
            <h3 className="text-2xl font-bold mb-4">
              Let's Connect
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              I'm always interested in meeting fellow developers, discussing new technologies, 
              or exploring potential collaborations.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">
                  <Mail className="w-4 h-4 mr-2" />
                  Get In Touch
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://linkedin.com/in/soufianechaoufi" target="_blank">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://github.com/soufianechaoufi" target="_blank">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}