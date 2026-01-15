"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "../../../src/components/GlassCard";
import { useTechAuth } from "../../../src/context/TechAuthContext";

export default function ServiceTechLoginPage() {
  const router = useRouter();
  const { tech, loading, loginWithCredentials, quickLoginAs } = useTechAuth();
  const [email, setEmail] = useState("admin@aceauto.example");
  const [password, setPassword] = useState("demo-admin");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && tech) {
      router.replace("/servicetechportal");
    }
  }, [tech, loading, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const ok = await loginWithCredentials(email, password);
    setSubmitting(false);
    if (!ok) {
      setError("Those credentials didn't match a demo account.");
      return;
    }
    router.push("/servicetechportal");
  }

  async function handleQuick(role: "admin" | "tech", emailHint?: string) {
    setError(null);
    setSubmitting(true);
    await quickLoginAs(role, emailHint);
    setSubmitting(false);
    router.push("/servicetechportal");
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="section-shell">
        <header className="mb-8 max-w-3xl border-b border-neutral-300 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Service tech portal
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            Sign in as admin or technician
          </h1>
          <p className="mt-4 text-sm text-neutral-600 sm:text-base">
            Use the demo credentials below to explore how new requests are
            triaged and dispatched, and how technicians see only the work
            assigned to them.
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
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-300/80 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:ring-1 focus:ring-black/70"
                />
              </div>

              {error && (
                <p className="text-[0.78rem] text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex w-full items-center justify-center rounded-full bg-black px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-red-500/30 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>

              <p className="mt-3 text-[0.75rem] text-neutral-500">
                Demo credentials:
                <br />
                Admin – admin@aceauto.example / demo-admin
                <br />
                Tech – tech.jordan@aceauto.example / demo-tech-1
                <br />
                Tech – tech.riley@aceauto.example / demo-tech-2
              </p>
            </form>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 text-sm text-neutral-800">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Quick demo logins
            </h2>
            <p className="mt-2 text-sm text-neutral-600">
              Use these shortcuts to jump directly into the portal as a given
              role without typing credentials.
            </p>

            <div className="mt-4 space-y-3">
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleQuick("admin", "admin@aceauto.example")}
                className="flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                Log in as admin
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleQuick("tech", "tech.jordan@aceauto.example")}
                className="flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                Log in as tech (Jordan)
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => handleQuick("tech", "tech.riley@aceauto.example")}
                className="flex w-full items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                Log in as tech (Riley)
              </button>
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-4 text-[0.75rem] text-neutral-500">
              This portal is fully mocked in the browser for now – no real
              customer data or shop systems are connected yet.
            </div>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
