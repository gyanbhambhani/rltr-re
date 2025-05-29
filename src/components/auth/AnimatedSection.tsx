"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  direction?: "left" | "right";
  className?: string;
}

const MotionDiv = motion("div");

export function AnimatedSection({ children, direction = "left", className = "" }: AnimatedSectionProps) {
  const xOffset = direction === "left" ? -50 : 50;

  return (
    <MotionDiv
      initial={{ opacity: 0, x: xOffset }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </MotionDiv>
  );
} 