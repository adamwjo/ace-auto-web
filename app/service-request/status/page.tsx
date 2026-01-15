"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import GlassCard from "../../../src/components/GlassCard";
import {
  getRequestByIdForContact,
  getStatusLabel,
  type ServiceRequest,
  type ServiceRequestStatus,
} from "../../../src/mocks/serviceApi";

const STATUS_ORDER: ServiceRequestStatus[] = [
  "submitted",
  "accepted",
  "scheduled",
  "tech_on_the_way",
  "in_progress",
  "completed",
  "billed",
  "paid",
];

export default function ServiceRequestStatusPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-neutral-50">
          <section className="section-shell">
            <p className="text-sm text-neutral-600">Loading request status…</p>
          </section>
        </main>
      }
    >
      <ServiceRequestStatusPageInner />
    </Suspense>
  );
}

function ServiceRequestStatusPageInner() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") ?? "";

  const [requestId, setRequestId] = useState(initialId);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [request, setRequest] = useState<ServiceRequest | null>(null);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setRequest(null);
    setLoading(true);
    try {
      const found = await getRequestByIdForContact({ requestId, emailOrPhone });
      if (!found) {
        setError("We couldn't find a request that matches those details.");
      } else {
        setRequest(found);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while looking up your request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="section-shell">
        <header className="mb-8 max-w-3xl border-b border-neutral-300 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Service request
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            Check the status of a request
          </h1>
          <p className="mt-4 text-sm text-neutral-600 sm:text-base">
            Use your request ID together with the email address or mobile phone
            number you provided to see where things stand. You don&apos;t need an
            account to use this – it works for guests and account holders.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.6fr)] lg:items-start">
          <GlassCard className="p-5 sm:p-6 text-sm text-neutral-800">
            <form onSubmit={handleLookup} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Request ID
                </label>
                <input
                  type="text"
                  required
                  value={requestId}
                  onChange={(e) => setRequestId(e.target.value)}
                  placeholder="e.g. REQ-1001"
                  className="mt-1 w-full rounded-lg border border-neutral-300/80 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:ring-1 focus:ring-black/70"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  Email or mobile number
                </label>
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="The email or phone you gave on the form"
                  className="mt-1 w-full rounded-lg border border-neutral-300/80 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-black focus:ring-1 focus:ring-black/70"
                />
              </div>

              {error && (
                <p className="text-[0.78rem] text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center rounded-full bg-black px-4 py-2.5 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-red-500/30 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Looking up…" : "Check status"}
              </button>

              <p className="mt-3 text-[0.75rem] text-neutral-500">
                You&apos;ll find your request ID in the confirmation message that was
                shown right after you submitted the form, or in any future
                email/text notifications.
              </p>
            </form>
          </GlassCard>

          <GlassCard className="p-5 sm:p-6 text-sm text-neutral-800">
            {request ? (
              <StatusTimeline request={request} />
            ) : (
              <div className="text-sm text-neutral-500">
                Submit your details on the left to see a step-by-step view of
                your request once it&apos;s found.
              </div>
            )}
          </GlassCard>
        </div>
      </section>
    </main>
  );
}

function StatusTimeline({ request }: { request: ServiceRequest }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          {request.id}
        </p>
        <p className="text-sm text-neutral-900">
          {request.vehicle.description}
        </p>
        <p className="text-[0.75rem] text-neutral-500">
          {request.details.concern}
        </p>
      </div>

      <div className="mt-2 border-t border-neutral-200 pt-3">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
          Status timeline
        </p>
        <ol className="relative space-y-3 border-l border-dashed border-neutral-300 pl-4">
          {STATUS_ORDER.map((status) => {
            const label = getStatusLabel(status);
            const isReached = STATUS_ORDER.indexOf(status) <=
              STATUS_ORDER.indexOf(request.status);
            const isCurrent = status === request.status;
            return (
              <li key={status} className="relative">
                <div
                  className={`absolute -left-2 top-1 h-3 w-3 rounded-full border-2 ${
                    isCurrent
                      ? "border-red-500 bg-red-500"
                      : isReached
                        ? "border-neutral-900 bg-neutral-900"
                        : "border-neutral-300 bg-white"
                  }`}
                />
                <div className="ml-2">
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                      isCurrent
                        ? "text-red-600"
                        : isReached
                          ? "text-neutral-900"
                          : "text-neutral-400"
                    }`}
                  >
                    {label}
                  </p>
                  {isCurrent && (
                    <p className="text-[0.75rem] text-neutral-600">
                      This is where your request is right now.
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
