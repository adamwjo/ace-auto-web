import GlassCard from "../../src/components/GlassCard";

export default function InfoPage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="section-shell">
        <header className="mb-10 max-w-3xl border-b border-neutral-300 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Info
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            Richmond, VA mobile mechanic: about & contact
          </h1>
          <p className="mt-4 text-sm text-neutral-600 sm:text-base">
            This page is a placeholder for your real story as a Richmond,
            Virginia mobile mechanic, plus your contact methods and
            certifications. Swap in your own details when you&apos;re ready.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <GlassCard className="col-span-2 p-5 text-sm text-neutral-700" delay={0.05}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              About your Richmond mobile mechanic
            </h2>
            <p className="mt-2 text-sm text-neutral-700">
              Use this section to introduce your Richmond, VA mobile mechanic
              service: how long you&apos;ve been helping local drivers, what types of
              mobile auto repair you specialize in, and what people appreciate
              most about having a mechanic come to them.
            </p>
            <p className="mt-2 text-sm text-neutral-700">
              You might talk about your approach to on-site diagnostics,
              communication and approvals over the phone, or your commitment to
              transparent pricing for mobile car repair in the Richmond area.
            </p>
          </GlassCard>

          <GlassCard className="p-5 text-sm text-neutral-700" delay={0.1}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Contact your Richmond mobile mechanic
            </h2>
            <p className="mt-2 text-sm text-neutral-700">
              Phone: 804-441-4309
              <br />
              Email: service@aceauto.example
            </p>
            <p className="mt-2 text-sm text-neutral-700">
              Based in Richmond, VA and serving RVA and nearby communities with
              on-site auto repair.
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              Replace the above with your exact address (if applicable) and any
              additional service area details.
            </p>
          </GlassCard>

          <GlassCard className="col-span-3 p-5 text-sm text-neutral-700" delay={0.15}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Credentials & certifications
            </h2>
            <p className="mt-2 text-sm text-neutral-700">
              Use this space for ASE certifications, hybrid/EV training, dealer
              experience, or any partner networks (AAA, local associations,
              etc.).
            </p>
          </GlassCard>
        </div>
      </section>
    </main>
  );
}
