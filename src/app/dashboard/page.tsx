import { FaChartLine, FaBuilding, FaMoneyBillWave } from "react-icons/fa";
import { InvestorDashboard } from "@/components/dashboard/InvestorDashboard";
import { FlipperDashboard } from "@/components/dashboard/FlipperDashboard";
import { StatsSection } from "@/components/dashboard/StatsSection";
import { StatCard } from "@/components/dashboard/StatCard";

// TODO: Get user type from auth context
const userType = "investor";

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

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <StatsSection />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {userType === "investor" ? (
          <InvestorDashboard />
        ) : (
          <FlipperDashboard />
        )}
      </div>
    </div>
  );
} 