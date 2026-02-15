"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

function RegisterForm() {
  const { user, loading, registerWithEmail } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      router.push(redirect);
    }
  }, [user, loading, router, redirect]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);
    const result = await registerWithEmail(name, email, password);
    if (result.error) {
      setError(result.error);
      setSubmitting(false);
    } else {
      router.push(redirect);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-bamboo-300 border-t-forest-500" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-lg border border-bamboo-200 bg-white p-8">
        {/* Logo */}
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-forest-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 20 C4 20, 8 12, 8 4 M8 4 C8 4, 12 12, 12 20 M8 8 L6 10 M8 12 L10 14" />
            <path d="M12 20 C12 20, 16 12, 16 4 M16 4 C16 4, 20 12, 20 20 M16 8 L14 10 M16 12 L18 14" />
          </svg>
          <h1 className="mt-4 font-serif text-2xl font-bold text-bamboo-800">
            Create Account
          </h1>
          <p className="mt-1 text-sm text-bamboo-600">
            Join BambooParts to track your orders
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-bamboo-700">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-bamboo-200 px-4 py-2.5 text-sm text-bamboo-800 placeholder:text-bamboo-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-bamboo-700">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-bamboo-200 px-4 py-2.5 text-sm text-bamboo-800 placeholder:text-bamboo-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-bamboo-700">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-bamboo-200 px-4 py-2.5 text-sm text-bamboo-800 placeholder:text-bamboo-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-bamboo-700">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-bamboo-200 px-4 py-2.5 text-sm text-bamboo-800 placeholder:text-bamboo-400 focus:border-forest-500 focus:outline-none focus:ring-1 focus:ring-forest-500"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-forest-500 px-6 py-2.5 font-medium text-white transition-colors hover:bg-forest-600 disabled:opacity-50"
          >
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Login link */}
        <p className="mt-6 text-center text-sm text-bamboo-600">
          Already have an account?{" "}
          <Link href={`/login${redirect !== "/" ? `?redirect=${redirect}` : ""}`} className="font-medium text-forest-500 hover:text-forest-600">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-bamboo-300 border-t-forest-500" />
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
