"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "../../src/components/GlassCard";

type InfoTabId = "about" | "contact" | "credentials";

const INFO_TABS: { id: InfoTabId; label: string }[] = [
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "credentials", label: "Credentials & certifications" },
];

export default function InfoPage() {
  const [activeTab, setActiveTab] = useState<InfoTabId>("about");

  return (
    <section className="section-shell" aria-labelledby="info-page-heading">
      <header className="mb-8 max-w-3xl border-b border-neutral-300 pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
          Info
        </p>
        <h1
          id="info-page-heading"
          className="mt-2 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl"
        >
          Richmond, VA mobile mechanic: about, contact, credentials
        </h1>
        <p className="mt-4 text-sm text-neutral-600 sm:text-base">
          Learn more about your Richmond, Virginia mobile mechanic service,
          how to get in touch, and the credentials that back up every
          on-site repair.
        </p>
      </header>

      <nav className="mb-6" aria-label="Info sections">
        <div
          role="tablist"
          aria-orientation="horizontal"
          className="inline-flex flex-wrap gap-2 rounded-full bg-neutral-100 p-1 text-xs sm:text-sm"
        >
          {INFO_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`info-${tab.id}-tab`}
                aria-selected={isActive}
                aria-controls={`info-${tab.id}-panel`}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center justify-center rounded-full px-3 py-1.5 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/70 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-100 ${
                  isActive
                    ? "bg-neutral-900 text-neutral-50 shadow-sm"
                    : "text-neutral-600 hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        <motion.section
          key={activeTab}
          id={`info-${activeTab}-panel`}
          role="tabpanel"
          aria-labelledby={`info-${activeTab}-tab`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {activeTab === "about" && (
            <GlassCard className="p-5 text-sm text-neutral-700" delay={0.05}>
              <h2
                id="info-about-heading"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500"
              >
                About your Richmond mobile mechanic
              </h2>
              <p className="mt-2 text-sm text-neutral-700">
                Use this section to introduce your Richmond, VA mobile mechanic
                service: how long you&apos;ve been helping local drivers, what types
                of mobile auto repair you specialize in, and what people
                appreciate most about having a mechanic come to them.
              </p>
              <p className="mt-2 text-sm text-neutral-700">
                You might talk about your approach to on-site diagnostics,
                communication and approvals over the phone, or your commitment to
                transparent pricing for mobile car repair in the Richmond area.
              </p>
            </GlassCard>
          )}

          {activeTab === "contact" && (
            <GlassCard className="p-5 text-sm text-neutral-700" delay={0.05}>
              <h2
                id="info-contact-heading"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500"
              >
                Contact your Richmond mobile mechanic
              </h2>
              <p className="mt-2 text-sm text-neutral-700">
                Phone: 804-441-4309
                <br />
                Email: service@aceauto.example
              </p>
              <p className="mt-2 text-sm text-neutral-700">
                Based in Richmond, VA and serving RVA and nearby communities
                with on-site auto repair.
              </p>
              <p className="mt-2 text-xs text-neutral-500">
                Replace the above with your exact address (if applicable) and
                any additional service area details.
              </p>
            </GlassCard>
          )}

          {activeTab === "credentials" && (
            <GlassCard className="p-5 text-sm text-neutral-700" delay={0.05}>
              <h2
                id="info-credentials-heading"
                className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500"
              >
                Credentials & certifications
              </h2>
              <p className="mt-2 text-sm text-neutral-700">
                Use this space for ASE certifications, hybrid/EV training,
                dealership experience, or any partner networks (AAA, local
                associations, etc.).
              </p>
              <p className="mt-2 text-sm text-neutral-700">
                You can also add insurance details, business licensing
                information, and any safety or continuing-education programs that
                give drivers confidence in your work.
              </p>
            </GlassCard>
          )}
        </motion.section>
      </AnimatePresence>
    </section>
  );
}
