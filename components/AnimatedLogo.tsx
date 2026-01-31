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
        className="relative flex cursor-pointer items-center"
      >
        {/* Glow effect */}
        <motion.div
          variants={glowVariants}
          className="bg-foreground/10 absolute inset-0 rounded-full blur-lg"
        />

        {/* Letters */}
        <motion.span
          variants={letterVariants}
          className="text-foreground relative z-10 text-xl font-bold"
        >
          S
        </motion.span>
        <motion.span
          variants={letterVariants}
          className="text-foreground relative z-10 text-xl font-bold"
        >
          C
        </motion.span>

        {/* Connecting line animation */}
        <motion.div
          className="bg-foreground absolute -bottom-1 left-0 h-0.5"
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
