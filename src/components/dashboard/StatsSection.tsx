"use client";

import { FaChartLine, FaBuilding, FaMoneyBillWave } from "react-icons/fa";
import { StatCard } from "./StatCard";

const stats = [
  {
    name: "Total Investments",
    value: "$24,500",
    change: "+12.5%",
    icon: FaChartLine,
  },
  {
    name: "Active Properties",
    value: "12",
    change: "+2",
    icon: FaBuilding,
  },
  {
    name: "Monthly Returns",
    value: "$1,200",
    change: "+8.2%",
    icon: FaMoneyBillWave,
  },
];

export function StatsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <StatCard key={stat.name} {...stat} index={index} />
      ))}
    </div>
  );
} 