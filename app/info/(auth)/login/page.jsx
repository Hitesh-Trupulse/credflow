"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { Eye, EyeOff } from "lucide-react";
import { auth, logInWithEmailAndPassword } from "@/firebase";
import Image from "next/image";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (user) router.push("/blogs/dashboard");
  }, [user, loading, router]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      await logInWithEmailAndPassword(form.email, form.password);
    } catch (error) {
      alert("Login failed: " + error.message);
    } finally {
      setIsLoggingIn(false);
    }
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
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#5063C6] to-[#B71CD2] bg-clip-text text-transparent">Welcome Back</h2>
          <p className="text-gray-400 mt-2">
            Login to your CredFlow dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Email
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              required
              className="bg-gray-800/50 border-[#454545] text-white focus:ring-[#5063C6]"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="bg-gray-800/50 border-[#454545] text-white focus:ring-[#5063C6]"
              />
              <button
                type="button"
                className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#5063C6] to-[#B71CD2] hover:opacity-90 text-white font-semibold py-3 px-4 rounded-lg transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white"></span>
                Logging In...
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </form>
        
        <p className="text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/blogs/signup" className="text-[#5063C6] font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}
