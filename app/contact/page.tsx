import { ContactForm } from "@/components/ContactForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl">Let's Connect</h1>
          <p className="text-muted-foreground mx-auto max-w-lg text-xl">
            I'm always interested in hearing about new opportunities,
            collaborations, or just having a conversation about frontend
            development.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Mail className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold">Email Me</h3>
              <p className="text-muted-foreground mb-3 text-sm">
                I typically respond within 24 hours
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="mailto:schaoufi@icloud.com">
                  schaoufi@icloud.com
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <MapPin className="text-primary h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold">Location</h3>
              <p className="text-muted-foreground mb-3 text-sm">
                Based in Vancouver, Canada
              </p>
              <p className="text-muted-foreground text-sm">
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
              Whether you have a project in mind, want to collaborate, or just
              want to say hi, I'd love to hear from you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-muted/50 rounded-lg p-6">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Calendar className="text-muted-foreground h-5 w-5" />
              <span className="font-medium">Current Availability</span>
            </div>
            <p className="text-muted-foreground mb-4">
              I'm currently available for new projects and opportunities.
              Looking for freelance work, full-time positions, or interesting
              collaborations.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild variant="outline">
                <Link href="/blog">Read Articles</Link>
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
              <Link href="https://github.com/gitsoufiane" target="_blank" rel="noopener noreferrer">
                GitHub
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link
                href="https://www.linkedin.com/in/soufianechaoufi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
