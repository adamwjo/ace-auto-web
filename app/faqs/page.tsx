"use client";

import { motion } from "framer-motion";
import GlassCard from "../../src/components/GlassCard";

const faqs = [
  {
    category: "Getting started",
    items: [
      {
        q: "Do I really need to bring my car in as soon as a light comes on?",
        a: "If a light is flashing, treat it as urgent and stop driving as soon as it’s safe. A solid light is usually less urgent, but you should still schedule a visit soon so we can prevent small issues from becoming big ones.",
      },
      {
        q: "Can you give me a ballpark estimate before you see the car?",
        a: "We can often give a rough range based on your description, but a proper estimate always starts with a diagnostic so we’re not guessing or overcharging you for parts you don’t need.",
      },
    ],
  },
  {
    category: "Pricing & timing",
    items: [
      {
        q: "How do you price your work?",
        a: "Most jobs are priced using a combination of industry-standard labor times and current parts costs. We walk you through the estimate line by line before we start any work.",
      },
      {
        q: "How long will my repair take?",
        a: "Simple services can often be completed the same day. Larger repairs may take longer depending on parts availability. We’ll give you a realistic timeline up front and keep you updated.",
      },
    ],
  },
  {
    category: "Maintenance & warranty",
    items: [
      {
        q: "Will getting service here void my factory warranty?",
        a: "No. As long as you follow your manufacturer’s maintenance schedule and keep records, having service done at an independent shop will not void a valid factory warranty.",
      },
      {
        q: "How often should I really be changing my oil and filters?",
        a: "Your owner’s manual is the final word, but modern vehicles often have longer service intervals than older rules of thumb. We can review your specific schedule and set reminders that match how you drive.",
      },
    ],
  },
  {
    category: "At the shop",
    items: [
      {
        q: "Can I wait at the shop while you work on my car?",
        a: "For quick services, yes. For longer repairs, we’ll help you plan drop-off and pick-up so you’re not stuck waiting hours in the lobby.",
      },
      {
        q: "Will you show me the parts you replaced?",
        a: "Absolutely. On request, we’re happy to show old parts and explain what went wrong and how the replacement fixes it.",
      },
    ],
  },
];

export default function FaqPage() {
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
            FAQs
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            Questions drivers actually ask
          </h1>
          <p className="mt-4 text-sm text-neutral-600 sm:text-base">
            These are placeholder FAQs tuned for a modern repair shop. Replace or
            refine them with your own language, policies, and pricing.
          </p>
        </header>

        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {faqs.map((group) => (
            <motion.div key={group.category} variants={item}>
              <GlassCard className="flex flex-col gap-3 p-5 text-sm text-neutral-700">
                <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                  {group.category}
                </h2>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-xl border border-neutral-200/80 bg-white/80 p-3"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[0.8rem] font-medium text-neutral-900">
                        <span>{item.q}</span>
                        <span className="ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-[0.7rem] text-neutral-600 group-open:bg-luxury-accent group-open:text-white">
                          ?
                        </span>
                      </summary>
                      <p className="mt-2 text-[0.78rem] text-neutral-600">{item.a}</p>
                    </details>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}
