"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface StaggeredContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  as?: "div" | "ul" | "section";
}

interface StaggeredItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

export function StaggeredContainer({
  children,
  className,
  staggerDelay = 0.1,
  as = "div",
}: StaggeredContainerProps) {
  const Component = motion[as];

  const customContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <Component
      variants={customContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {children}
    </Component>
  );
}

export function StaggeredItem({
  children,
  className,
  as = "div",
}: StaggeredItemProps) {
  const Component = motion[as];

  return (
    <Component variants={itemVariants} className={className}>
      {children}
    </Component>
  );
}

export { containerVariants, itemVariants };
