'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Crown, Stars, Infinity as InfinityIcon } from 'lucide-react';
import { CoupleInfo, ThemeConfig } from '@/lib/types';
import { Dictionary } from '@/lib/dictionary';

interface CoupleSectionProps {
  couple: CoupleInfo;
  theme: ThemeConfig;
  dict: Dictionary;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ couple, theme, dict }) => {
  const brideName = couple.brideName || 'Ayesha';
  const groomName = couple.groomName || 'Riswan';

  return (
    <div className="w-full max-w-5xl mx-auto my-20 px-4">
      {/* Dark Luxury Backdrop Container */}
      <div className="bg-stone-950/90 border-2 border-[#D4AF37]/40 rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl relative overflow-hidden">
        {/* Subtle Ambient Radial Glow inside container */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-500/10 blur-[100px] pointer-events-none" />

        {/* Section Title Header */}
        <div className="text-center mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            <span>The Happy Couple</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-extrabold text-[#FCEEAC] drop-shadow-md"
          >
            {dict.coupleSectionTitle || 'The Happy Couple'}
          </motion.h2>

          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4 rounded-full" />
        </div>

        {/* Main Luxury Couple Display Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center z-10">
          
          {/* Central Interlocking Hearts Connector Badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-16 h-16 rounded-full bg-stone-950 border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.7)] flex items-center justify-center text-rose-500 backdrop-blur-md"
            >
              <Heart className="w-8 h-8 fill-rose-500 text-rose-500 animate-pulse" />
            </motion.div>
            <span className="mt-1 text-[11px] font-serif font-bold text-[#FCEEAC] bg-stone-900/95 px-3 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-lg tracking-wider">
              FOREVER & ALWAYS
            </span>
          </div>

          {/* BRIDE CARD - AYESHA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[400px] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 bg-stone-900/90 p-8 flex flex-col items-center justify-between shadow-2xl group hover:border-[#D4AF37] transition-all duration-500"
          >
            {/* Ambient Card Glow */}
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-rose-500/20 blur-2xl pointer-events-none" />

            {/* Top Badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/90 border border-rose-500/50 text-rose-200 text-xs font-bold tracking-widest uppercase shadow-md z-10 backdrop-blur-sm">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>BRIDE 👰‍♀️</span>
            </div>

            {/* Ornate Monogram Medallion */}
            <div className="relative my-6 flex flex-col items-center justify-center z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="w-36 h-36 rounded-full border-2 border-dashed border-[#D4AF37]/60 absolute inset-0 -m-2"
              />
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-stone-950 via-[#3A2416] to-stone-950 border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.5)] flex flex-col items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
                <span className="font-serif text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D0] via-[#D4AF37] to-[#AA7C11] drop-shadow-md">
                  {brideName.charAt(0)}
                </span>
                <Stars className="w-4 h-4 text-amber-400 absolute bottom-2 opacity-80" />
              </div>

              {/* Floating Heart Decor */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-rose-900/90 border border-rose-400 flex items-center justify-center shadow-lg">
                <Heart className="w-4 h-4 fill-rose-400 text-rose-400 animate-bounce" />
              </div>
            </div>

            {/* Name & Subtitle */}
            <div className="text-center z-10 space-y-2">
              <h3 className="text-4xl md:text-5xl font-serif font-extrabold text-[#FCEEAC] tracking-wide drop-shadow-md">
                {brideName}
              </h3>
              <p className="text-xs md:text-sm text-stone-300 font-sans max-w-xs italic opacity-90">
                &ldquo;Joined with love, guided by grace, embarking on a beautiful forever together.&rdquo;
              </p>
            </div>

            {/* Bottom Luxury Hearts Bar */}
            <div className="mt-6 flex items-center gap-1.5 text-rose-400 text-xs font-semibold">
              <Heart className="w-3.5 h-3.5 fill-rose-400" />
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <Heart className="w-3.5 h-3.5 fill-rose-400" />
            </div>
          </motion.div>

          {/* GROOM CARD - RISWAN */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative min-h-[400px] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 bg-stone-900/90 p-8 flex flex-col items-center justify-between shadow-2xl group hover:border-[#D4AF37] transition-all duration-500"
          >
            {/* Ambient Card Glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-amber-500/20 blur-2xl pointer-events-none" />

            {/* Top Badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/90 border border-amber-500/50 text-amber-200 text-xs font-bold tracking-widest uppercase shadow-md z-10 backdrop-blur-sm">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>GROOM 🤵‍♂️</span>
            </div>

            {/* Ornate Monogram Medallion */}
            <div className="relative my-6 flex flex-col items-center justify-center z-10">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="w-36 h-36 rounded-full border-2 border-dashed border-[#D4AF37]/60 absolute inset-0 -m-2"
              />
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-stone-950 via-[#3A2416] to-stone-950 border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.5)] flex flex-col items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
                <span className="font-serif text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D0] via-[#D4AF37] to-[#AA7C11] drop-shadow-md">
                  {groomName.charAt(0)}
                </span>
                <Stars className="w-4 h-4 text-amber-400 absolute bottom-2 opacity-80" />
              </div>

              {/* Floating Heart Decor */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-900/90 border border-amber-400 flex items-center justify-center shadow-lg">
                <Heart className="w-4 h-4 fill-amber-400 text-amber-400 animate-bounce" />
              </div>
            </div>

            {/* Name & Subtitle */}
            <div className="text-center z-10 space-y-2">
              <h3 className="text-4xl md:text-5xl font-serif font-extrabold text-[#FCEEAC] tracking-wide drop-shadow-md">
                {groomName}
              </h3>
              <p className="text-xs md:text-sm text-stone-300 font-sans max-w-xs italic opacity-90">
                &ldquo;Two hearts beat as one, looking forward to a lifetime of happiness.&rdquo;
              </p>
            </div>

            {/* Bottom Luxury Hearts Bar */}
            <div className="mt-6 flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
              <Heart className="w-3.5 h-3.5 fill-amber-400" />
              <Heart className="w-4 h-4 fill-amber-500 text-amber-500" />
              <Heart className="w-3.5 h-3.5 fill-amber-400" />
            </div>
          </motion.div>

        </div>

        {/* Combined Grand Heart Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 p-6 md:p-8 rounded-3xl border-2 border-[#D4AF37]/50 bg-stone-900/95 text-center shadow-2xl relative overflow-hidden backdrop-blur-xl z-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15),transparent)] pointer-events-none" />
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-2xl md:text-4xl font-serif font-extrabold text-[#FCEEAC]">
            <span>{brideName}</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 text-rose-400 text-xl md:text-2xl shadow-inner">
              <Heart className="w-6 h-6 fill-rose-500 text-rose-500 inline mr-1 animate-pulse" />
              &amp;
            </span>
            <span>{groomName}</span>
          </div>

          <p className="text-xs md:text-sm text-amber-200/90 font-serif tracking-widest uppercase mt-3 flex items-center justify-center gap-2">
            <InfinityIcon className="w-4 h-4 text-amber-400 inline" />
            <span>Bound Together In Eternal Happiness</span>
            <InfinityIcon className="w-4 h-4 text-amber-400 inline" />
          </p>
        </motion.div>
      </div>
    </div>
  );
};
