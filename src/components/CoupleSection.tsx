'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { CoupleInfo, ThemeConfig } from '@/lib/types';
import { Dictionary } from '@/lib/dictionary';

interface CoupleSectionProps {
  couple: CoupleInfo;
  theme: ThemeConfig;
  dict: Dictionary;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ couple, theme, dict }) => {
  return (
    <div className="w-full max-w-5xl mx-auto my-20 px-4">
      {/* Section Title Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-600 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Happy Couple</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3E2B1E] drop-shadow-sm">
          {dict.coupleSectionTitle || 'The Happy Couple'}
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch">
        {/* Bride Card - Full Size Image */}
        <motion.div
          className="relative h-[450px] md:h-[520px] rounded-3xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Full Cover Background Photo */}
          <img
            src={couple.bridePhoto}
            alt={couple.brideName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Elegant Dark Gradient Overlay for Name visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A0E]/90 via-[#2A1A0E]/30 to-transparent flex flex-col justify-end p-8 text-center items-center">
            <span className="px-4 py-1 rounded-full bg-rose-600/90 text-white text-xs font-bold font-serif tracking-widest uppercase mb-2 shadow-lg backdrop-blur-sm border border-white/20">
              Bride 👰‍♀️
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#FAF6EE] drop-shadow-md">
              {couple.brideName}
            </h3>
          </div>
        </motion.div>

        {/* Groom Card - Full Size Image */}
        <motion.div
          className="relative h-[450px] md:h-[520px] rounded-3xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {/* Full Cover Background Photo */}
          <img
            src={couple.groomPhoto}
            alt={couple.groomName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Elegant Dark Gradient Overlay for Name visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A0E]/90 via-[#2A1A0E]/30 to-transparent flex flex-col justify-end p-8 text-center items-center">
            <span className="px-4 py-1 rounded-full bg-[#B8860B]/90 text-white text-xs font-bold font-serif tracking-widest uppercase mb-2 shadow-lg backdrop-blur-sm border border-white/20">
              Groom 🤵‍♂️
            </span>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#FAF6EE] drop-shadow-md">
              {couple.groomName}
            </h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
