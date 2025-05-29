"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaPlus } from "react-icons/fa";

const activeProperties = [
  {
    id: 1,
    name: "Modern Downtown Loft",
    location: "San Francisco, CA",
    funding: "$45,000 / $100,000",
    progress: 45,
    status: "Funding",
  },
  {
    id: 2,
    name: "Suburban Family Home",
    location: "Austin, TX",
    funding: "$80,000 / $150,000",
    progress: 53,
    status: "In Progress",
  },
  {
    id: 3,
    name: "Beachfront Condo",
    location: "Miami, FL",
    funding: "$120,000 / $200,000",
    progress: 60,
    status: "Renovation",
  },
];

export function FlipperDashboard() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="col-span-4 rounded-xl border bg-card p-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Active Properties</h3>
          <Button size="sm" className="gap-2">
            <FaPlus className="h-4 w-4" />
            Add Property
          </Button>
        </div>
        <div className="mt-4 space-y-4">
          {activeProperties.map((property) => (
            <div
              key={property.id}
              className="rounded-lg border p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{property.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {property.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{property.funding}</p>
                  <p
                    className={`text-sm ${
                      property.status === "Funding"
                        ? "text-blue-600"
                        : property.status === "In Progress"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {property.status}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${property.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="col-span-3 rounded-xl border bg-card p-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Funding Requests</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            View All <FaArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4 space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Funding Request</p>
                <p className="text-sm text-muted-foreground">
                  Submit a new property for funding
                </p>
              </div>
              <Button size="sm" variant="outline">
                Submit
              </Button>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Pending Approvals</p>
                <p className="text-sm text-muted-foreground">
                  2 properties awaiting review
                </p>
              </div>
              <Button size="sm" variant="outline">
                Review
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
} 