'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({ children, className = "", delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={`
        relative backdrop-blur-md bg-white/70
        border border-white/40 shadow-lg
        hover:shadow-xl hover:bg-white/90 hover:border-neutral-300
        transition-colors duration-300
        ${className}
      `}
      style={{ borderRadius: '6px' }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neutral-400 to-transparent opacity-30" />
      {children}
    </motion.div>
  );
}
