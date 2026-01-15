"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "../../../src/components/GlassCard";
import { useCustomerAuth } from "../../../src/context/CustomerAuthContext";

export default function CustomerLoginPage() {
  const router = useRouter();
  const { customer, loginWithEmail, loginWithProvider, loading } = useCustomerAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!loading && customer) {
    // If already logged in, go straight to account dashboard.
    router.replace("/account");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await loginWithEmail(email, password, name || undefined);
      router.push("/account");
    } catch (err) {
      console.error(err);
      setError("Something went wrong signing you in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleProviderLogin(provider: "apple" | "google") {
    setError(null);
    setSubmitting(true);
    try {
      await loginWithProvider(provider);
      router.push("/account");
    } catch (err) {
      console.error(err);
      setError("We couldn't complete that sign-in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="section-shell">
        <header className="mb-8 max-w-3xl border-b border-neutral-300 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Account
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            Sign in to track your service request
          </h1>
          <p className="mt-4 text-sm text-neutral-600 sm:text-base">
            Use the same email you shared on your service request to see status
            updates, past work, and billing details. Creating an account is
            optional – you can still get updates by email or text.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.5fr)] md:items-start">
          <GlassCard className="p-5 sm:p-6 text-sm text-neutral-800">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-300/80 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:ring-1 focus:ring-black/70"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Name (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-300/80 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:ring-1 focus:ring-black/70"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Password (demo only)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="You can use any password for demo accounts"
                  className="mt-1 w-full rounded-lg border border-neutral-300/80 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:ring-1 focus:ring-black/70"
                />
                <p className="mt-1 text-[0.7rem] text-neutral-500">
                  For this proof of concept, any password will sign you in as long
                  as the email matches a demo account or creates a new one.
                </p>
              </div>

              {error && (
                <p className="text-[0.78rem] text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex w-full items-center justify-center rounded-full bg-black px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-red-500/30 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Signing in…" : "Continue with email"}
              </button>

              <p className="mt-3 text-[0.75rem] text-neutral-500">
                Demo customer accounts:
                <br />
                driver.richmond@example.com (demo-customer-1)
                <br />
                fleet.manager@example.com (demo-customer-2)
              </p>
            </form>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 text-sm text-neutral-800">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Or continue with Apple or Google
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              These buttons simulate a social login and sign you into a demo
              account so you can see how the experience will feel, without
              connecting to real Apple or Google auth yet.
            </p>

            <div className="mt-4 space-y-3">
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleProviderLogin("apple")}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                Continue with Apple
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleProviderLogin("google")}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                Continue with Google
              </button>
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-4 text-[0.75rem] text-neutral-500">
              You can also track a request without an account using the status
              lookup tool once it is available.
            </div>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
