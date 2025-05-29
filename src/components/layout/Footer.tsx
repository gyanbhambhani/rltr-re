"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const footerLinks = {
  product: [
    { name: "Properties", href: "/properties" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Pricing", href: "/pricing" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Cookie Policy", href: "/cookie-policy" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: FaTwitter, href: "https://twitter.com/flipfund" },
  { name: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com/company/flipfund" },
  { name: "GitHub", icon: FaGithub, href: "https://github.com/flipfund" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <motion.span
                className="text-2xl font-bold gradient-text"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                FlipFund
              </motion.span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Revolutionizing real estate investment through crowdfunding.
              Join us in building the future of property investment.
            </p>
          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold capitalize">{category}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between border-t pt-8">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FlipFund. All rights reserved.
          </p>
          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">{link.name}</span>
                <link.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 