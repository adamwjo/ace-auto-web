"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import GlassCard from "../src/components/GlassCard";

const featureCards = [
  {
    href: "/guides",
    title: "Step-by-step guides",
    body: "Learn the basics of car care  from oil changes to warning lights  in plain language.",
  },
  {
    href: "/faqs",
    title: "FAQs, decoded",
    body: "Straight answers on pricing, timing, and what to expect when you book a service.",
  },
  {
    href: "/service-request",
    title: "Request service online",
    body: "Tell us what your vehicle is doing and well prep before you arrive.",
  },
  {
    href: "/info",
    title: "About, contact & credentials",
    body: "See whos behind the wrenches, how to reach us, and why drivers trust Ace.",
  },
];

export default function Home() {
  const prefersReducedMotion = useReducedMotion();

  const heroVariants = prefersReducedMotion
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };

  return (
    <main className="min-h-screen bg-transparent">
      {/* HERO SECTION - editorial layout inspired by sandbox */}
      <section className="relative flex min-h-[80vh] flex-col justify-center px-6 md:px-16 lg:px-24 overflow-hidden">
        {/* abstract right-side gradient */}
        <div className="pointer-events-none absolute right-[-10%] top-0 h-full w-1/2 skew-x-12 bg-gradient-to-l from-neutral-200/60 to-transparent mix-blend-multiply" />

        <motion.div
          initial={heroVariants.initial}
          animate={heroVariants.animate}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl space-y-8"
        >
          <span className="mb-2 block text-sm font-semibold uppercase tracking-[0.3em] text-luxury-accent">
            Local  Honest  Detailed
          </span>

          <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-neutral-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Glass-clear
            <br />
            <span className="text-neutral-400">auto repair.</span>
          </h1>

          <p className="max-w-xl border-l-2 border-luxury-accent pl-5 text-base font-light text-neutral-600 sm:text-lg">
            Ace Auto Repair combines modern diagnostics, practical guides, and
            straightforward service requests so you always know whats happening
            with your car before it goes on the lift.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/service-request"
              className="group relative overflow-hidden px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white bg-neutral-900"
            >
              <span className="relative z-10">Request service</span>
              <div className="absolute inset-0 -translate-x-full bg-white transition-transform duration-300 ease-out group-hover:translate-x-0" />
              <span className="absolute inset-0 z-10 flex items-center justify-center text-xs font-semibold uppercase tracking-[0.22em] text-neutral-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Request service
              </span>
            </Link>
            <Link
              href="/guides"
              className="flex items-center gap-2 px-8 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-900 border border-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Browse guides
            </Link>
          </div>

          <div className="grid gap-4 text-xs text-neutral-600 sm:grid-cols-3">
            <div>
              <p className="font-semibold text-neutral-900">Same-day diagnostics</p>
              <p>Drop off in the morning, get a clear plan before end of day.</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">Technician-first info</p>
              <p>Our request form captures what your tech actually needs to know.</p>
            </div>
            <div>
              <p className="font-semibold text-neutral-900">No-pressure guidance</p>
              <p>Use the guides and FAQs to decide whats urgent and what can wait.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FEATURE / DESTINATION CARDS */}
      <section className="bg-neutral-100 py-16 px-6 md:px-16 lg:px-24">
        <div className="mb-10 flex items-end justify-between border-b border-neutral-300 pb-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.28em] text-neutral-500">
            Navigate Ace
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((card, index) => (
            <GlassCard
              key={card.href}
              delay={0.1 * index}
              className="group flex h-full flex-col justify-between p-5 text-xs text-neutral-700"
            >
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-900">
                  {card.title}
                </h3>
                <p className="text-[0.8rem] text-neutral-600">{card.body}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-neutral-500 group-hover:text-luxury-accent">
                  Explore
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </main>
  );
}
