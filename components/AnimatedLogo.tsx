"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AnimatedLogo() {
  const containerVariants = {
    hover: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    initial: {
      x: 0,
      scale: 1,
    },
    hover: {
      x: [0, -2, 2, 0],
      scale: [1, 1.1, 1.1, 1],
      transition: {
        duration: 0.6,
        ease: "easeInOut" as const,
        times: [0, 0.3, 0.7, 1],
      },
    },
  };

  const glowVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
    },
    hover: {
      opacity: [0, 0.3, 0],
      scale: [0.8, 1.2, 1.4],
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <Link href="/" className="flex items-center">
      <motion.div
        variants={containerVariants}
        initial="initial"
        whileHover="hover"
        className="relative flex items-center cursor-pointer"
      >
        {/* Glow effect */}
        <motion.div
          variants={glowVariants}
          className="absolute inset-0 bg-primary/20 blur-lg rounded-full"
        />

        {/* Letters */}
        <motion.span
          variants={letterVariants}
          className="text-xl font-bold text-foreground relative z-10"
        >
          S
        </motion.span>
        <motion.span
          variants={letterVariants}
          className="text-xl font-bold text-foreground relative z-10"
        >
          C
        </motion.span>

        {/* Connecting line animation */}
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/60"
          initial={{ width: 0, opacity: 0 }}
          whileHover={{
            width: "100%",
            opacity: 1,
            transition: {
              duration: 0.4,
              ease: "easeOut" as const,
            },
          }}
        />
      </motion.div>
    </Link>
  );
}