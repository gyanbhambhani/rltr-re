"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaHome,
  FaChartLine,
  FaBuilding,
  FaMoneyBillWave,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";

const investorNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: FaHome,
  },
  {
    title: "My Investments",
    href: "/dashboard/investments",
    icon: FaChartLine,
  },
  {
    title: "Browse Properties",
    href: "/dashboard/properties",
    icon: FaBuilding,
  },
  {
    title: "Wallet",
    href: "/dashboard/wallet",
    icon: FaMoneyBillWave,
  },
];

const flipperNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: FaHome,
  },
  {
    title: "My Properties",
    href: "/dashboard/properties",
    icon: FaBuilding,
  },
  {
    title: "Funding Requests",
    href: "/dashboard/funding",
    icon: FaMoneyBillWave,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: FaChartLine,
  },
];

const commonNavItems = [
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: FaCog,
  },
  {
    title: "Help & Support",
    href: "/dashboard/support",
    icon: FaQuestionCircle,
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  // TODO: Get user type from auth context
  const userType = "investor";
  const navItems = [...(userType === "investor" ? investorNavItems : flipperNavItems), ...commonNavItems];

  return (
    <nav className="grid items-start gap-2 p-4">
      {navItems.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: index * 0.1 }}
        >
          <Link
            href={item.href}
            className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "transparent"
            }`}
          >
            <item.icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        </motion.div>
      ))}
    </nav>
  );
} 