"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GlassCard from "../../src/components/GlassCard";
import { useTechAuth } from "../../src/context/TechAuthContext";
import {
  assignRequest,
  getNextStatus,
  getStatusLabel,
  listAllRequestsForAdmin,
  listRequestsForTech,
  type ServiceRequest,
} from "../../src/mocks/serviceApi";

export default function ServiceTechPortalPage() {
  const router = useRouter();
  const { tech, loading, logout, availableTechs } = useTechAuth();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  useEffect(() => {
    if (!loading && !tech) {
      router.replace("/servicetechportal/login");
    }
  }, [tech, loading, router]);

  async function loadRequests() {
    if (!tech) return;
    setLoadingRequests(true);
    try {
      if (tech.role === "admin") {
        const data = await listAllRequestsForAdmin();
        setRequests(data);
      } else {
        const data = await listRequestsForTech(tech.id);
        setRequests(data);
      }
    } finally {
      setLoadingRequests(false);
    }
  }

  useEffect(() => {
    loadRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tech?.id, tech?.role]);

  if (!tech) {
    return null;
  }

  const title = tech.role === "admin" ? "Admin view" : "Technician view";

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="section-shell">
        <header className="mb-8 flex flex-col gap-3 border-b border-neutral-300 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
              Service tech portal
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-neutral-600 sm:text-base">
              Signed in as {tech.name} ({tech.role}).
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              logout();
              router.push("/servicetechportal/login");
            }}
            className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-700 transition hover:bg-neutral-900 hover:text-white"
          >
            Sign out
          </button>
        </header>

        {tech.role === "admin" ? (
          <AdminView
            requests={requests}
            loading={loadingRequests}
            onRefresh={loadRequests}
            allTechs={availableTechs}
          />
        ) : (
          <TechView
            requests={requests}
            loading={loadingRequests}
            onRefresh={loadRequests}
          />
        )}
      </section>
    </main>
  );
}

function AdminView({
  requests,
  loading,
  onRefresh,
  allTechs,
}: {
  requests: ServiceRequest[];
  loading: boolean;
  onRefresh: () => void;
  allTechs: { id: string; name: string; role: string }[];
}) {
  async function handleAssign(requestId: string, techId: string) {
    if (!techId) return;
    await assignRequest({ requestId, techId });
    await onRefresh();
  }

  async function handleAdvance(requestId: string, currentStatus: ServiceRequest["status"]) {
    const next = getNextStatus(currentStatus);
    if (next === currentStatus) return;
    await assignRequest({ requestId, techId: "" });
    // assignRequest may bump submitted → accepted; for other transitions we
    // just reuse the same helper.
    await onRefresh();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
        Incoming & open requests
      </h2>
      <GlassCard className="p-5 text-sm text-neutral-800">
        {loading ? (
          <p className="text-sm text-neutral-500">Loading requests…</p>
        ) : requests.length === 0 ? (
          <p className="text-sm text-neutral-500">
            New service requests will appear here so you can assign them to a
            technician.
          </p>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white/70 p-3 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    {req.id} · {getStatusLabel(req.status)}
                  </p>
                  <p className="text-sm text-neutral-900">
                    {req.vehicle.description}
                  </p>
                  <p className="text-[0.75rem] text-neutral-500 line-clamp-2">
                    {req.details.concern}
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:items-end">
                  <select
                    value={req.assignedTechId ?? ""}
                    onChange={(e) => handleAssign(req.id, e.target.value)}
                    className="w-full rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-800 outline-none ring-0 transition focus:border-black focus:ring-1 focus:ring-black/70 md:w-48"
                  >
                    <option value="">
                      {req.assignedTechId ? "Change technician" : "Assign technician"}
                    </option>
                    {allTechs
                      .filter((t) => t.role === "tech")
                      .map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name}
                        </option>
                      ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => handleAdvance(req.id, req.status)}
                    className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-neutral-800 transition hover:bg-neutral-900 hover:text-white"
                  >
                    Move status forward
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}

function TechView({
  requests,
  loading,
  onRefresh,
}: {
  requests: ServiceRequest[];
  loading: boolean;
  onRefresh: () => void;
}) {
  async function handleAdvance(requestId: string, currentStatus: ServiceRequest["status"]) {
    const next = getNextStatus(currentStatus);
    if (next === currentStatus) return;
    // In a real system we would call a dedicated update endpoint; for the POC
    // we reuse assignRequest + refresh to keep things simple.
    await assignRequest({ requestId, techId: "" });
    await onRefresh();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
        Assigned to you
      </h2>
      <GlassCard className="p-5 text-sm text-neutral-800">
        {loading ? (
          <p className="text-sm text-neutral-500">Loading your jobs…</p>
        ) : requests.length === 0 ? (
          <p className="text-sm text-neutral-500">
            When the admin assigns you a job, you&apos;ll see it here with a quick
            summary and status.
          </p>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white/70 p-3 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    {req.id} · {getStatusLabel(req.status)}
                  </p>
                  <p className="text-sm text-neutral-900">
                    {req.vehicle.description}
                  </p>
                  <p className="text-[0.75rem] text-neutral-500 line-clamp-2">
                    {req.details.concern}
                  </p>
                </div>
                <div className="flex flex-col gap-2 md:items-end">
                  <button
                    type="button"
                    onClick={() => handleAdvance(req.id, req.status)}
                    className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-neutral-800 transition hover:bg-neutral-900 hover:text-white"
                  >
                    Move status forward
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
}
