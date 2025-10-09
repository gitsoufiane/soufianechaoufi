"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import AnimatedThemeToggle from "@/components/AnimatedThemeToggle";
import AnimatedNavLink from "@/components/AnimatedNavLink";
import AnimatedMenuButton from "@/components/AnimatedMenuButton";
import AnimatedLogo from "@/components/AnimatedLogo";

interface NavItem {
  name: string;
  href: string;
}

interface NavbarProps {
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Books", href: "/books" },
  { name: "Projects", href: "/projects" },
];

export default function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav
      id="navigation"
      className={cn(
        "bg-background/95 supports-[backdrop-filter]:bg-background/60 w-full border-b px-4 backdrop-blur",
        className,
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between">
        {/* SC Logo */}
        <AnimatedLogo />

        {/* Desktop navigation */}
        <div className="mx-auto hidden items-center space-x-6 md:flex">
          {defaultNavItems.map((item) => (
            <AnimatedNavLink
              key={item.href}
              href={item.href}
              isActive={pathname === item.href}
            >
              {item.name}
            </AnimatedNavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile menu toggle */}
          <AnimatedMenuButton
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />

          {/* Theme toggle */}
          <AnimatedThemeToggle />
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="bg-background absolute top-16 right-0 left-0 border-t md:hidden">
            <div className="flex flex-col space-y-2 p-4 pb-6">
              {defaultNavItems.map((item) => (
                <AnimatedNavLink
                  key={item.href}
                  href={item.href}
                  isActive={pathname === item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-2"
                >
                  {item.name}
                </AnimatedNavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
