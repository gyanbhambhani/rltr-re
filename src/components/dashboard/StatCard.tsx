"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";

interface StatCardProps {
  name: string;
  value: string;
  change: string;
  icon: IconType;
  index: number;
}

export function StatCard({ name, value, change, icon: Icon, index }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.1 }}
      className="rounded-xl border bg-card p-6"
    >
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-primary/10 p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{name}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-sm text-green-600">{change}</p>
        </div>
      </div>
    </motion.div>
  );
} 