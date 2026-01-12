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
            About, contact & credentials
          </h1>
          <p className="mt-4 text-sm text-neutral-600 sm:text-base">
            This page is a placeholder for your real story, contact methods, and
            certifications. Swap in your own details when youre ready.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <GlassCard className="col-span-2 p-5 text-sm text-neutral-700" delay={0.05}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              About Ace Auto Repair
            </h2>
            <p className="mt-2 text-sm text-neutral-700">
              Use this section to introduce your shop: how long youve been in
              business, what you specialize in, and what drivers appreciate most
              about working with you.
            </p>
            <p className="mt-2 text-sm text-neutral-700">
              You might talk about your approach to diagnostics, your policy on
              communication and approvals, or your commitment to transparent
              pricing.
            </p>
          </GlassCard>

          <GlassCard className="p-5 text-sm text-neutral-700" delay={0.1}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
              Contact
            </h2>
            <p className="mt-2 text-sm text-neutral-700">
              Phone: (555) 013-2042
              <br />
              Email: service@aceauto.example
            </p>
            <p className="mt-2 text-sm text-neutral-700">
              123 Placeholder Ave
              <br />
              Your City, ST 00000
            </p>
            <p className="mt-2 text-xs text-neutral-500">
              Replace the above with your real address, phone, and preferred
              contact details.
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
