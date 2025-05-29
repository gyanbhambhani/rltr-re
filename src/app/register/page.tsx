"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import usersData from "@/data/users.json";
import type { FlipMyFundData, User } from "@/types/flipmyfund";
import { AnimatedSection } from "@/components/auth/AnimatedSection";

const data = usersData as FlipMyFundData;

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const existingUser = data.users.find((u: User) => u.email === email);
      if (existingUser) {
        setError("Email already exists");
      } else {
        // In a real app, you would save the user to a database
        console.log("New user registered:", { email, password });
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen">
      {/* Left Side (Sign Up Card) */}
      <div className="w-1/3 bg-white flex items-center justify-center p-8 shadow-lg">
        <AnimatedSection direction="left" className="w-full max-w-sm">
          <h2 className="text-3xl font-bold text-gray-800">Sign Up</h2>
          <p className="text-sm text-gray-600 mt-2">
            Create your account and start your FlipFund journey.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Create a password"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button
              type="submit"
              className="w-full py-3 hover:scale-105 transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </form>
          <p className="mt-6 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </AnimatedSection>
      </div>

      {/* Right Side (Welcome Section) */}
      <div className="w-2/3 bg-gradient-to-r from-primary via-primary/80 to-primary/60 flex items-center justify-center p-12 relative">
        <AnimatedSection direction="right" className="max-w-lg">
          <h1 className="text-5xl font-extrabold leading-tight text-white">
            Join <span className="text-white">FlipFund</span>
          </h1>
          <p className="mt-4 text-lg text-white opacity-90">
            Connect with real estate flippers and investors to turn your property vision into reality.
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
} 