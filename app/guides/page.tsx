"use client"

import { motion } from "framer-motion";
import GlassCard from "../../src/components/GlassCard";

export default function GuidesPage() {
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="section-shell">
        <header className="mb-10 max-w-3xl border-b border-neutral-300 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
            Guides
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl md:text-5xl">
            Basic car repair & maintenance, explained
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-neutral-600 sm:text-base">
            Short, practical guides to help you understand what your car needs and
            why – so conversations with your technician feel clear, not confusing.
          </p>
        </header>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={item}>
            <GlassCard className="p-5 text-sm text-neutral-700">
              <h2 className="text-sm font-semibold text-neutral-900">
                Oil changes: how often is often enough?
              </h2>
              <p className="mt-2 text-xs text-neutral-600">
                Why modern engines usually don’t need a 3,000-mile oil change, and how
                to read your maintenance schedule.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={item}>
            <GlassCard className="p-5 text-sm text-neutral-700">
              <h2 className="text-sm font-semibold text-neutral-900">
                Check engine light 101
              </h2>
              <p className="mt-2 text-xs text-neutral-600">
                What it means when it flashes vs. stays solid, and when it’s safe to
                keep driving.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={item}>
            <GlassCard className="p-5 text-sm text-neutral-700">
              <h2 className="text-sm font-semibold text-neutral-900">
                Brakes: squeaks, pulses, and pulls
              </h2>
              <p className="mt-2 text-xs text-neutral-600">
                Common brake symptoms, what they point to, and which ones are urgent.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={item}>
            <GlassCard className="p-5 text-sm text-neutral-700">
              <h2 className="text-sm font-semibold text-neutral-900">
                Getting ready for summer & winter
              </h2>
              <p className="mt-2 text-xs text-neutral-600">
                Seasonal checks that help prevent overheating in July and dead
                batteries in January.
              </p>
            </GlassCard>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
