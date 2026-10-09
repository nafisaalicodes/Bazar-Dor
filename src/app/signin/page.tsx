
"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import Footer from "@/components/Footer";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const authToastShown = useRef(false);

  // Show a toast when a protected page redirects here.
  useEffect(() => {
    if (authToastShown.current) return;

    const params = new URLSearchParams(window.location.search);

    if (params.get("reason") === "auth-required") {
      authToastShown.current = true;
      toast.error("Please sign in to view product details.");

      // Remove the query parameter so refreshing does not repeat the toast.
      window.history.replaceState({}, "", "/signin");
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      toast.success("You have signed in successfully!");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (
    provider: "google" | "github"
  ) => {
    try {
      setLoading(true);

      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch {
      toast.error(`Unable to sign in with ${provider}.`);
      setLoading(false);
    }
  };

  return (
    <>
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-[#f2f4f0] px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-7 text-center">
            <Link
              href="/"
              className="text-3xl font-extrabold tracking-tight text-black-600"
            >
              Sign In
            </Link>

            <p className="whitespace-nowrap mt-2 text-sm text-gray-500">
               Sign in to view detailed prices, compare markets and access your profile. 
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={loading}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled={loading}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:bg-gray-100"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialLogin("google")}
              className="rounded-lg border border-gray-300 px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Google
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSocialLogin("github")}
              className="rounded-lg border border-gray-300 px-3 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              GitHub
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-green-700 hover:underline"
            >
              Sign Up
            </Link>
          </p>

          <p className="mt-4 text-center text-xs leading-5 text-gray-500">
            Sign in to access protected product details and explore
            market prices.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}