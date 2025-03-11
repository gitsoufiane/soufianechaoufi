import { Github, Linkedin, Mail, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: <Github className="w-5 h-5 hover:scale-110 transition-transform" />,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: <Linkedin className="w-5 h-5 hover:scale-110 transition-transform" />,
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: <Mail className="w-5 h-5 hover:scale-110 transition-transform" />,
  },
];

export default function Footer({ 
  socialLinks = defaultSocialLinks, 
  className,
  companyName = 'Soufiane Chaoufi'
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(
      'w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm',
      className
    )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{companyName}</h3>
            <p className="text-sm text-muted-foreground">
              Building innovative solutions with modern web technologies.
            </p>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <form className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button type="submit" size="sm">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              We'll never share your email. Unsubscribe anytime.
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
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
