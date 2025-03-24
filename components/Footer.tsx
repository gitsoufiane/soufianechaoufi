import { Github, Linkedin, Mail, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface FooterProps {
  socialLinks?: SocialLink[];
  className?: string;
  companyName?: string;
}

const defaultSocialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/gitsoufiane",
    icon: <Github className="h-5 w-5 transition-transform hover:scale-110" />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/soufianechaoufi",
    icon: <Linkedin className="h-5 w-5 transition-transform hover:scale-110" />,
  },
  {
    name: "Email",
    url: "mailto:soufiane.chaoufi@gmail.com",
    icon: <Mail className="h-5 w-5 transition-transform hover:scale-110" />,
  },
];

export default function Footer({
  socialLinks = defaultSocialLinks,
  className,
  companyName = "Soufiane Chaoufi",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/60 w-full border-t shadow-sm backdrop-blur",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{companyName}</h3>
            <p className="text-muted-foreground text-sm">
              Building innovative solutions with modern web technologies.
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Me</h3>
            <nav className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={`Visit my ${link.name} profile`}
                >
                  {link.icon}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t py-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
