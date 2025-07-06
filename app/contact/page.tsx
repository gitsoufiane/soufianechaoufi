import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, MapPin, Calendar } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Soufiane Chaoufi",
  description:
    "Get in touch with me for collaboration, job opportunities, or any questions about my work as a Senior Frontend Developer.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Let's Connect
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            I'm always interested in hearing about new opportunities, collaborations, 
            or just having a conversation about frontend development.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid gap-6 mb-12 sm:grid-cols-2">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email Me</h3>
              <p className="text-sm text-muted-foreground mb-3">
                I typically respond within 24 hours
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="mailto:contact@soufianechaoufi.com">
                  contact@soufianechaoufi.com
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Based in Vancouver, Canada
              </p>
              <p className="text-sm text-muted-foreground">
                Open to remote opportunities
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Send a Message</CardTitle>
            <CardDescription>
              Whether you have a project in mind, want to collaborate, or just want to say hi, 
              I'd love to hear from you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-muted/50 rounded-lg p-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Current Availability</span>
            </div>
            <p className="text-muted-foreground mb-4">
              I'm currently available for new projects and opportunities. 
              Looking for freelance work, full-time positions, or interesting collaborations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="outline">
                <Link href="/about">
                  Learn More About Me
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/projects">
                  View My Work
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-4">
            You can also find me on these platforms:
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="https://github.com/gitsoufiane" target="_blank">
                GitHub
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="https://www.linkedin.com/in/soufianechaoufi/" target="_blank">
                LinkedIn
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
