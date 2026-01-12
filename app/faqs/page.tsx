"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  HelpCircle,
  WalletCards,
  ShieldCheck,
  Wrench,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

const featuredFaqs = faqs
  .flatMap((group) =>
    group.items.map((item) => ({
      ...item,
      category: group.category,
    })),
  )
  .slice(0, 5);

const cardContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 40 : -40,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 40 : -40,
    opacity: 0,
  }),
};

function renderCategoryIcon(category: string, className: string) {
  switch (category) {
    case "Getting started":
      return <HelpCircle className={className} />;
    case "Pricing & timing":
      return <WalletCards className={className} />;
    case "Maintenance & warranty":
      return <ShieldCheck className={className} />;
    case "At the shop":
      return <Wrench className={className} />;
    default:
      return <HelpCircle className={className} />;
  }
}

interface FaqItemProps {
  q: string;
  a: string;
}

function FaqItem({ q, a }: FaqItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      className="group rounded-xl border border-neutral-200/80 bg-white/80 p-3 shadow-sm transition-colors hover:border-neutral-300 hover:bg-white"
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 text-[0.8rem] font-medium text-neutral-900"
        aria-expanded={open}
      >
        <span className="text-left">{q}</span>
        <span className="ml-3 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-[0.7rem] text-neutral-600 group-hover:bg-luxury-accent/10">
          <motion.span
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <ChevronRight className="h-3 w-3" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 6, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <p className="mt-2 text-[0.78rem] text-neutral-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const totalSlides = featuredFaqs.length;

  const paginate = (delta: number) => {
    setDirection(delta);
    setActiveIndex((prev) => {
      const next = (prev + delta + totalSlides) % totalSlides;
      return next;
    });
  };

  const active = featuredFaqs[activeIndex];

  return (
    <main className="min-h-screen bg-neutral-50">
      <section className="section-shell">
        <header className="mb-10 max-w-3xl border-b border-neutral-300 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">
            FAQs
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-neutral-900 sm:text-4xl">
            Richmond mobile mechanic FAQs
          </h1>
          <p className="mt-4 text-sm text-neutral-600 sm:text-base">
            Common questions Richmond, VA drivers ask about mobile auto repair,
            pricing, and what to expect when a mechanic comes to you instead of
            you waiting at a shop.
          </p>
        </header>

        {/* Featured FAQs carousel */}
        <section className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center">
          <div className="space-y-3">
            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.25em] text-neutral-500">
              Quick answers
            </p>
            <h2 className="text-xl font-semibold tracking-tight text-neutral-900">
              Slide through a few of the most common questions before you dive
              into the full list.
            </h2>
            <p className="text-sm text-neutral-600">
              Use the arrows to move through real-world questions drivers ask
              us about timing, pricing, and what to expect on your visit.
            </p>

            <div className="flex items-center gap-3 text-[0.75rem] text-neutral-500">
              <div className="h-[1px] w-10 bg-neutral-300" />
              <span>
                {String(activeIndex + 1).padStart(2, "0")} / {" "}
                {String(totalSlides).padStart(2, "0")}
              </span>
            </div>
          </div>

          <GlassCard className="relative overflow-hidden p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-white">
                  {renderCategoryIcon(active.category, "h-4 w-4")}
                </span>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  {active.category}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 bg-white/80 text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
                  aria-label="Previous question"
                >
                  <ChevronLeft className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-neutral-300 bg-white/80 text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50"
                  aria-label="Next question"
                >
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            <div className="relative min-h-[120px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={carouselVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <h3 className="mb-2 text-sm font-semibold text-neutral-900">
                    {active.q}
                  </h3>
                  <p className="text-[0.78rem] text-neutral-600">{active.a}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-between text-[0.75rem] text-neutral-500">
              <div className="flex items-center gap-2">
                <Clock3 className="h-3.5 w-3.5" />
                <span>Most people skim this in under a minute.</span>
              </div>
              <span className="hidden text-[0.7rem] uppercase tracking-[0.18em] text-neutral-400 sm:inline">
                Carousel view
              </span>
            </div>
          </GlassCard>
        </section>

        {/* Full FAQ grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {faqs.map((group) => (
            <motion.div
              key={group.category}
              variants={cardItem}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <GlassCard className="flex flex-col gap-4 p-5 text-sm text-neutral-700">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white">
                    {renderCategoryIcon(group.category, "h-4 w-4")}
                  </span>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    {group.category}
                  </h2>
                </div>

                <div className="space-y-3">
                  {group.items.map((item) => (
                    <FaqItem key={item.q} q={item.q} a={item.a} />
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
