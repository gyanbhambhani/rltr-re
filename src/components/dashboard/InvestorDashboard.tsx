"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";

const recentInvestments = [
  {
    id: 1,
    property: "Modern Downtown Loft",
    amount: "$5,000",
    date: "2024-03-15",
    status: "Active",
  },
  {
    id: 2,
    property: "Suburban Family Home",
    amount: "$8,000",
    date: "2024-03-10",
    status: "Pending",
  },
  {
    id: 3,
    property: "Beachfront Condo",
    amount: "$3,500",
    date: "2024-03-05",
    status: "Completed",
  },
];

export function InvestorDashboard() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-4 rounded-xl border bg-card p-6"
      >
        <h3 className="text-lg font-semibold">Investment Overview</h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
              <p className="text-2xl font-bold">$24,500</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expected Returns</p>
              <p className="text-2xl font-bold text-green-600">+15.8%</p>
            </div>
          </div>
          <div className="h-[200px] rounded-lg bg-muted">
            {/* TODO: Add investment chart */}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="col-span-3 rounded-xl border bg-card p-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Investments</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            View All <FaArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 space-y-4">
          {recentInvestments.map((investment) => (
            <div
              key={investment.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-medium">{investment.property}</p>
                <p className="text-sm text-muted-foreground">
                  {investment.date}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{investment.amount}</p>
                <p
                  className={`text-sm ${
                    investment.status === "Active"
                      ? "text-green-600"
                      : investment.status === "Pending"
                      ? "text-yellow-600"
                      : "text-muted-foreground"
                  }`}
                >
                  {investment.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
} 