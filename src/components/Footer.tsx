'use client';

import Link from 'next/link';
import { ArrowUpRight, Instagram, Twitter, Linkedin, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-neutral-900 text-white">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

      {/* Primary CTA */}
      <div className="border-b border-neutral-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 px-6 py-16 md:flex-row md:px-8">
          <div>
            <h2 className="text-3xl font-black tracking-tighter md:text-4xl">
              Ready for clear answers about your car?
            </h2>
            <p className="mt-3 max-w-md text-sm text-neutral-400">
              Start with a detailed service request or bring your questions – we’ll
              translate the technical details into plain language.
            </p>
          </div>

          <Link
            href="/service-request"
            className="group relative overflow-hidden rounded-full border border-luxury-accent px-9 py-4 text-xs font-bold uppercase tracking-[0.22em] text-luxury-accent"
          >
            <span className="relative z-10 flex items-center gap-3">
              Request service
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 origin-left scale-x-0 rounded-full bg-luxury-accent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            <span className="absolute inset-0 z-10 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Request service
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4 md:px-8">
        {/* Brand */}
        <div className="space-y-5">
          <Link href="/" className="block">
            <span className="text-2xl font-black tracking-tighter text-white">
              ACE<span className="text-luxury-accent">.</span>
            </span>
          </Link>
          <p className="text-sm text-neutral-400">
            Ace Auto Repair combines modern diagnostics with clear communication so
            you always know what your vehicle needs and why.
          </p>
          <div className="flex gap-4 pt-3">
            {[Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-all hover:border-luxury-accent hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { label: 'Home', href: '/' },
              { label: 'Guides', href: '/guides' },
              { label: 'FAQs', href: '/faqs' },
              { label: 'Service request', href: '/service-request' },
              { label: 'Testimonials', href: '/testimonials' },
              { label: 'Info & contact', href: '/info' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-neutral-300 transition-colors hover:text-luxury-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Typical work
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-neutral-400">
            {['Diagnostics & check-engine', 'Brake service', 'Fluid & filter changes', 'Steering & suspension checks', 'Pre-trip & seasonal inspections'].map(
              (item) => (
                <li key={item} className="cursor-default transition-colors hover:text-white">
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Contact / location */}
        <div className="space-y-5 text-sm">
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
            Contact & hours
          </h3>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 shrink-0 text-luxury-accent" />
            <p className="text-neutral-300">
              123 Placeholder Ave
              <br />
              Your City, ST 00000
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
              Phone / email
            </p>
            <p className="mt-1 text-neutral-300">
              (555) 013-2042
              <br />
              service@aceauto.example
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
              Hours
            </p>
            <p className="mt-1 text-neutral-300">
              Mon–Fri: 8:00am – 6:00pm
              <br />
              Sat: 9:00am – 2:00pm
            </p>
          </div>
        </div>
      </div>

      {/* Sub-footer */}
      <div className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 py-5 text-[0.7rem] text-neutral-500 md:flex-row md:items-center md:px-8">
          <span>© {currentYear} Ace Auto Repair. All rights reserved.</span>
          <span className="space-x-4">
            <button className="underline-offset-2 hover:underline">Privacy</button>
            <button className="underline-offset-2 hover:underline">Terms</button>
          </span>
        </div>
      </div>
    </footer>
  );
}
