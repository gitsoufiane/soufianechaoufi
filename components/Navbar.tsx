'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  name: string;
  href: string;
}

interface NavbarProps {
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Tools', href: '/tools' },
  { name: 'Activities', href: '/activities' },
  { name: 'Media', href: '/media' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar({ className }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className={cn('w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4', className)}>
      <div className="container mx-auto flex items-center justify-between h-16 max-w-7xl">
        {/* SC Icon */}
        <div className="flex items-center">
          <span className="text-xl font-bold">SC</span>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6 mx-auto">
          {defaultNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </Button>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background md:hidden border-t">
            <div className="flex flex-col space-y-2 p-4">
              {defaultNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
