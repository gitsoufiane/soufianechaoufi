"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnimatedThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const iconVariants = {
    initial: {
      scale: 0.8,
      rotate: -180,
      opacity: 0,
    },
    animate: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        duration: 0.5,
      },
    },
    exit: {
      scale: 0.8,
      rotate: 180,
      opacity: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        duration: 0.3,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        type: "spring" as const,
        stiffness: 600,
        damping: 25,
      },
    },
  };

  return (
    <motion.div
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleThemeToggle}
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        className="relative overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute flex items-center justify-center"
            >
              <Sun className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute flex items-center justify-center"
            >
              <Moon className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </motion.div>
  );
}