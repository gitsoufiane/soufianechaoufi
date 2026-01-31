"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AnimatedMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function AnimatedMenuButton({
  isOpen,
  onClick,
}: AnimatedMenuButtonProps) {
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

  const lineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      opacity: 1,
    },
    open: {
      rotate: 0,
      y: 0,
      opacity: 1,
    },
  };

  const topLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
    open: {
      rotate: 45,
      y: 6,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const middleLineVariants = {
    closed: {
      opacity: 1,
      scaleX: 1,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
    open: {
      opacity: 0,
      scaleX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const bottomLineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
    open: {
      rotate: -45,
      y: -6,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25,
      },
    },
  };

  return (
    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
      <Button
        variant="ghost"
        size="icon"
        className="relative md:hidden"
        onClick={onClick}
        aria-label="Toggle mobile menu"
      >
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10"
        >
          {/* Top line */}
          <motion.line
            x1="2"
            y1="4"
            x2="16"
            y2="4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={topLineVariants}
            animate={isOpen ? "open" : "closed"}
            style={{ originX: 0.5, originY: 0.5, transformBox: "fill-box" }}
          />

          {/* Middle line */}
          <motion.line
            x1="2"
            y1="9"
            x2="16"
            y2="9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={middleLineVariants}
            animate={isOpen ? "open" : "closed"}
            style={{ originX: 0.5, originY: 0.5, transformBox: "fill-box" }}
          />

          {/* Bottom line */}
          <motion.line
            x1="2"
            y1="14"
            x2="16"
            y2="14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            variants={bottomLineVariants}
            animate={isOpen ? "open" : "closed"}
            style={{ originX: 0.5, originY: 0.5, transformBox: "fill-box" }}
          />
        </motion.svg>

        {/* Background ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          whileTap={{
            background:
              "radial-gradient(circle, hsl(var(--primary)/0.15) 0%, transparent 70%)",
            transition: { duration: 0.3 },
          }}
        />
      </Button>
    </motion.div>
  );
}
