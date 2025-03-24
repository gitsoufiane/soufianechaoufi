"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  href: string;
}

interface NavbarProps {
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Resume", href: "/resume" },
  { name: "Books", href: "/books" },
  { name: "Activities", href: "/activities" },
  { name: "Contact", href: "/contact" },
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
    <nav
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/60 w-full border-b px-4 backdrop-blur",
        className,
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between">
        {/* SC Icon */}
        <div className="flex items-center">
          <span className="text-xl font-bold">SC</span>
        </div>

        {/* Desktop navigation */}
        <div className="mx-auto hidden items-center space-x-6 md:flex">
          {defaultNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="bg-background absolute top-16 right-0 left-0 border-t md:hidden">
            <div className="flex flex-col space-y-2 p-4 pb-6">
              {defaultNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground py-2 text-sm font-medium transition-colors"
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
