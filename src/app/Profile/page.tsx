
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  const currentName = user?.name ?? "";
  const displayedName = name ?? currentName;
  const trimmedName = displayedName.trim();

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trimmedName) {
      toast.error("Please enter your name.");
      return;
    }

    if (trimmedName === currentName) {
      toast.info("Your name is already up to date.");
      return;
    }

    try {
      setSaving(true);

      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        toast.error(error.message || "Failed to update your profile.");
        return;
      }

      setName(trimmedName);
      toast.success("Profile updated successfully!");

      await authClient.getSession();
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setSigningOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Unable to sign out.");
        return;
      }

      toast.success("Signed out successfully!");
      router.replace("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong while signing out.");
    } finally {
      setSigningOut(false);
    }
  };

  if (isPending || !user) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f0f5f0]">
       

        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10">
          <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mb-5 h-24 animate-pulse rounded-xl border border-gray-200 bg-white" />
          <div className="h-52 animate-pulse rounded-xl border border-gray-200 bg-white" />
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5f0]">
      

      <main className="w-full flex-1 px-4 py-10 sm:py-12">
        <div className="mx-auto max-w-3xl">
          {/* Page Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#26352a]">
              My Profile
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View and manage your account information.
            </p>
          </div>

          {/* Profile Summary */}
          <section className="mb-5 flex flex-col gap-4 rounded-xl border border-[#dfe7df] bg-[#fbfcfb] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex min-w-0 items-center gap-3">
              {user.image ? (
                <Image
                  src={user.image}
                  alt="Profile picture"
                  width={64}
                  height={64}
                  unoptimized
                  referrerPolicy="no-referrer"
                  className="h-16 w-16 shrink-0 rounded-xl bg-gray-100 object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-100 text-2xl font-bold text-green-800">
                  {displayedName.trim().charAt(0).toUpperCase() || "U"}
                </div>
              )}

              <div className="min-w-0">
                <h2 className="break-words text-base font-semibold text-[#26352a]">
                  {displayedName || "User"}
                </h2>

                <p className="mt-1 break-all text-sm text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={signingOut}
              className="shrink-0 self-start rounded-lg border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-60 sm:self-center"
            >
              {signingOut ? "Signing Out..." : "↪ Sign Out"}
            </button>
          </section>

          {/* Profile Information Form */}
          <section className="rounded-xl border border-[#dfe7df] bg-[#fbfcfb] p-5 sm:p-6">
            <h2 className="mb-6 text-base font-semibold text-[#26352a]">
              Information
            </h2>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block px-1 text-sm font-medium text-gray-700"
                >
                  Name
                </label>

                <input
                  id="profile-name"
                  type="text"
                  value={displayedName}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  maxLength={100}
                  required
                  className="w-full rounded-lg border border-[#dfe7df] bg-transparent px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              

              <button
                type="submit"
                disabled={saving || !trimmedName}
                className="w-full rounded-lg bg-[#07883f] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067334] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Updating..." : "Update"}
              </button>
            </form>
          </section>

          <div className="mt-5 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 transition hover:text-green-700"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

