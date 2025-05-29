"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaHome, FaChartLine, FaUsers } from "react-icons/fa";

const features = [
  {
    icon: FaHome,
    title: "Property Listings",
    description: "Browse through carefully vetted real estate opportunities ready for investment.",
  },
  {
    icon: FaChartLine,
    title: "Smart Investment",
    description: "Track your investments and monitor returns with our intuitive dashboard.",
  },
  {
    icon: FaUsers,
    title: "Community Driven",
    description: "Join a community of investors and property flippers working together.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-32">
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl gradient-text">
              Revolutionize Real Estate Investment
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join the future of property investment. Fund real estate flips or list your properties.
              Together, we're building wealth through smart real estate investments.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 to-background" />
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose FlipFund?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We're making real estate investment accessible, transparent, and profitable for everyone.
            </p>
          </motion.div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                    <feature.icon className="h-5 w-5 flex-none text-primary" />
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden bg-primary px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to Start Your Investment Journey?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-foreground/90">
          Join thousands of investors who are already building wealth through FlipFund.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Get Started Now</Link>
          </Button>
          <Button size="lg" variant="ghost" className="text-white" asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
