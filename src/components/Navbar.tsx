'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Guides', href: '/guides' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Service Request', href: '/service-request' },
  { name: 'Testimonials', href: '/testimonials' },
  { name: 'Info', href: '/info' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out
          ${scrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm' : 'py-6 bg-transparent'}
        `}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-8">
          {/* LOGO */}
          <Link href="/" className="relative z-[60] group">
            <Image
              src="/logo.svg"
              alt="ACE Mobile Repairs"
              width={168}
              height={60}
              className="h-14 w-auto transition-opacity group-hover:opacity-80"
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`
                  text-xs font-bold uppercase tracking-widest relative
                  hover:text-luxury-accent transition-colors
                  ${pathname === link.href ? 'text-neutral-900' : 'text-neutral-500'}
                `}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-[1px] bg-luxury-accent"
                  />
                )}
              </Link>
            ))}

            <Link
              href="/service-request"
              className={`
                px-5 py-2 border text-xs font-bold tracking-widest uppercase transition-all
                ${scrolled
                  ? 'border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white'
                  : 'border-neutral-900 bg-neutral-900 text-white hover:bg-transparent hover:text-neutral-900'}
              `}
            >
              Request
            </Link>
          </nav>

          {/* MOBILE TOGGLE */}
          <MotionConfig transition={{ duration: 0.5, ease: 'easeInOut' }}>
            <motion.button
              initial={false}
              animate={isOpen ? 'open' : 'closed'}
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-full md:hidden hover:bg-neutral-100 transition-colors"
            >
              <div className="relative h-4 w-6">
                {/* Top Line */}
                <motion.span
                  className="absolute left-0 h-[2px] w-full bg-neutral-900 origin-center"
                  variants={{
                    open: { top: '50%', rotate: 45, y: '-50%' },
                    closed: { top: '0%', rotate: 0, y: '0%' },
                  }}
                />

                {/* Middle Line */}
                <motion.span
                  className="absolute left-0 h-[2px] w-full bg-neutral-900 origin-center"
                  style={{ top: '50%', y: '-50%' }}
                  variants={{
                    open: { opacity: 0, x: -20 },
                    closed: { opacity: 1, x: 0 },
                  }}
                />

                {/* Bottom Line */}
                <motion.span
                  className="absolute left-0 h-[2px] w-full bg-neutral-900 origin-center"
                  variants={{
                    open: { top: '50%', rotate: -45, y: '-50%' },
                    closed: { top: '100%', rotate: 0, y: '0%' },
                  }}
                />
              </div>
            </motion.button>
          </MotionConfig>
        </div>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[50] flex flex-col justify-between bg-white px-8 pt-24 pb-10 overflow-y-auto md:hidden"
          >
            <div className="absolute inset-0 bg-neutral-50" />

            <div className="absolute -right-20 top-1/4 select-none text-[260px] font-black text-neutral-100 opacity-50">
              A
            </div>

            <div className="relative z-10 space-y-8">
              {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block text-4xl font-black tracking-tighter text-neutral-900 hover:text-luxury-accent transition-colors"
                    >
                      <span className="mr-4 align-top text-sm font-light text-neutral-400">
                        0{i + 1}
                      </span>
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative z-10 mt-10 space-y-6 border-t border-neutral-300 pt-8"
            >
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">
                  Phone
                </p>
                <a
                  href="tel:5550132042"
                  className="text-lg font-bold text-neutral-900"
                >
                  (555) 013-2042
                </a>
              </div>
              <div>
                <p className="mb-2 text-xs uppercase tracking-widest text-neutral-500">
                  Email
                </p>
                <a
                  href="mailto:service@aceauto.example"
                  className="text-lg font-bold text-neutral-900"
                >
                  service@aceauto.example
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
