
"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import Footer from "@/components/Footer";

const SignInPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center bg-[#f0f5f0] px-4 py-10">
        <section className="w-full max-w-[440px]">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-[#26352a]">
              Sign In
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Sign in to view detailed prices, compare markets, and access your profile.
            </p>
          </div>

          <div className="rounded-xl border border-[#dfe7df] bg-[#fbfcfb] p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-semibold text-gray-800"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 py-2.5 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#07883f] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067334] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => handleSocialLogin("google")}
                className="rounded-lg border border-[#dfe7df] px-2 py-2.5 text-xs font-semibold text-gray-800 transition hover:bg-gray-100 disabled:opacity-60 sm:text-sm"
              >
                Google
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => handleSocialLogin("github")}
                className="rounded-lg border border-[#dfe7df] px-2 py-2.5 text-xs font-semibold text-gray-800 transition hover:bg-gray-100 disabled:opacity-60 sm:text-sm"
              >
                GitHub
              </button>
            </div>

            <p className="mt-5 text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-green-700 hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <div className="mt-5 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 transition hover:text-green-700"
            >
              ← Back to Home
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SignInPage;

