"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "../../src/components/GlassCard";
import { useCustomerAuth } from "../../src/context/CustomerAuthContext";
import {
  listCustomerRequests,
  getStatusLabel,
  type ServiceRequest,
} from "../../src/mocks/serviceApi";

export default function AccountDashboardPage() {
  const router = useRouter();
  const { customer, loading, logout } = useCustomerAuth();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  useEffect(() => {
    if (!loading && !customer) {
      router.replace("/account/login");
    }
  }, [customer, loading, router]);

  useEffect(() => {
    async function load() {
      if (!customer) return;
      setLoadingRequests(true);
      try {
        const data = await listCustomerRequests(customer.id);
        setRequests(data);
      } finally {
        setLoadingRequests(false);
      }
    }
    load();
  }, [customer]);

  if (!customer) {
    return null;
  }

  const activeRequests = requests.filter(
    (r) => r.status !== "completed" && r.status !== "paid",
  );
  const pastRequests = requests.filter(
    (r) => r.status === "completed" || r.status === "paid",
  );

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="section-shell">
        <header className="mb-8 flex flex-col gap-3 border-b border-neutral-300 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Account
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
              Welcome back{customer.name ? `, ${customer.name}` : ""}
            </h1>
            <p className="mt-2 text-sm text-neutral-600 sm:text-base">
              View the status of your service requests, see what work was
              completed, and review billing details.
            </p>
          </div>

          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-700 transition hover:bg-neutral-900 hover:text-white"
          >
            Sign out
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Your service requests
            </h2>

            <GlassCard className="p-5 text-sm text-neutral-800">
              {loadingRequests ? (
                <p className="text-sm text-neutral-500">Loading your requests…</p>
              ) : activeRequests.length === 0 && pastRequests.length === 0 ? (
                <p className="text-sm text-neutral-500">
                  When you submit a service request using this email address,
                  you&apos;ll see it appear here with live status updates.
                </p>
              ) : (
                <div className="space-y-4">
                  {activeRequests.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                        Active
                      </p>
                      <div className="space-y-3">
                        {activeRequests.map((req) => (
                          <RequestRow key={req.id} request={req} />
                        ))}
                      </div>
                    </div>
                  )}

                  {pastRequests.length > 0 && (
                    <div className="space-y-2 border-t border-neutral-200 pt-3">
                      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                        Past
                      </p>
                      <div className="space-y-3">
                        {pastRequests.map((req) => (
                          <RequestRow key={req.id} request={req} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </GlassCard>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Billing & payment (demo)
            </h2>
            <GlassCard className="p-5 text-sm text-neutral-800">
              <p className="text-sm text-neutral-600">
                This section shows how a billing summary could look once real
                payments are connected. For now, amounts and line items are
                placeholders.
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between text-neutral-700">
                  <span>Diagnostics & inspection</span>
                  <span>$95.00</span>
                </div>
                <div className="flex items-center justify-between text-neutral-700">
                  <span>Parts & labor (example)</span>
                  <span>$320.00</span>
                </div>
                <div className="flex items-center justify-between text-neutral-500 text-xs border-t border-dashed border-neutral-300 pt-2">
                  <span>Estimated total (example)</span>
                  <span>$415.00</span>
                </div>
              </div>

              <button
                type="button"
                disabled
                className="mt-4 flex w-full items-center justify-center rounded-full bg-neutral-900 px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-white opacity-60"
              >
                Pay now (coming soon)
              </button>

              <p className="mt-2 text-[0.75rem] text-neutral-500">
                In a future version, this would connect to your real invoice and
                payment provider. For now, it&apos;s here to show the intended
                layout.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>
    </main>
  );
}

function RequestRow({ request }: { request: ServiceRequest }) {
  const statusLabel = getStatusLabel(request.status);
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-neutral-200 bg-white/70 p-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          {request.id}
        </p>
        <p className="text-sm text-neutral-900">
          {request.vehicle.description}
        </p>
        <p className="text-[0.75rem] text-neutral-500 line-clamp-2">
          {request.details.concern}
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2 sm:mt-0 sm:flex-col sm:items-end">
        <span className="inline-flex items-center rounded-full bg-neutral-900 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white">
          {statusLabel}
        </span>
        <span className="text-[0.7rem] text-neutral-400">
          Updated {new Date(request.updatedAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
