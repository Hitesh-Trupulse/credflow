"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Send reset link to:", email);
    // Add API logic here to trigger reset email
  };

  return (
    <section className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/noisebg.png"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 bg-black/80 backdrop-blur-lg border border-[#454545] rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">Forgot Password?</h2>
          <p className="text-gray-400 mt-2">
            Enter your email to receive a password reset link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="bg-gray-800/50 border-[#454545] text-white focus:ring-[#5063C6]"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#5063C6] to-[#B71CD2] hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition-all cursor-pointer shadow-lg"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Remembered your password?{" "}
          <Link href="/blogs/login" className="text-[#5063C6] font-medium hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
}
