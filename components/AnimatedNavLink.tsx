"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedNavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}

export default function AnimatedNavLink({
  href,
  children,
  isActive,
  onClick,
  className,
}: AnimatedNavLinkProps) {

  const linkVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: 0.97,
      transition: {
        type: "spring" as const,
        stiffness: 600,
        damping: 25,
      },
    },
  };

  const underlineVariants = {
    initial: {
      scaleX: 0,
    },
    active: {
      scaleX: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const progressVariants = {
    animate: {
      x: ["-100%", "100%"],
      transition: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 1,
      },
    },
  };

  return (
    <div className="relative">
      <motion.div
        variants={linkVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className="relative"
      >
        <Link
          href={href}
          onClick={onClick}
          className={cn(
            "relative text-sm font-medium transition-colors duration-200",
            isActive
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
            className,
          )}
        >
          {children}

          {/* Active state underline with progress animation */}
          {isActive && (
            <div className="absolute -bottom-1 left-0 h-0.5 w-full overflow-hidden bg-muted">
              <motion.div
                variants={underlineVariants}
                initial="initial"
                animate="active"
                className="h-full w-full bg-primary origin-left"
              />
              <motion.div
                variants={progressVariants}
                animate="animate"
                className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-primary-foreground/40 to-transparent"
              />
            </div>
          )}
        </Link>
      </motion.div>
    </div>
  );
}