'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { WeddingData, ThemeConfig } from '@/lib/types';
import { Dictionary } from '@/lib/dictionary';

interface WeddingHeroProps {
  wedding: WeddingData;
  theme: ThemeConfig;
  dict: Dictionary;
}

export const WeddingHero: React.FC<WeddingHeroProps> = ({ wedding, theme, dict }) => {
  const { couple } = wedding;

  return (
    <div className="relative min-h-[95vh] flex flex-col items-center justify-center text-center p-4 overflow-hidden bg-gradient-to-b from-[#FAF6EE] via-[#F3EAD9] to-[#E8D9C3]">
      {/* Background Archway Backdrop Illustration */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
          alt="Palace Venue Arch"
          className="w-full h-full object-cover filter brightness-110 sepia-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6EE]/80 via-[#FAF6EE]/50 to-[#E8D9C3]" />
      </div>

      {/* Top Hanging Golden Crystal Chandelier Vector Overlay */}
      <motion.div
        className="relative z-10 w-48 sm:w-64 mb-6 flex flex-col items-center"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-0.5 h-16 bg-gradient-to-b from-transparent via-[#D4AF37] to-[#B8860B]" />
        <div className="relative p-4 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 shadow-xl backdrop-blur-sm">
          <Sparkles className="w-8 h-8 text-[#B8860B] animate-pulse" />
        </div>
      </motion.div>

      {/* Main Arch Invitation Card */}
      <motion.div
        className="relative z-10 w-full max-w-lg mx-auto p-8 sm:p-12 rounded-t-[10rem] rounded-b-3xl border-2 border-[#D4AF37]/60 bg-[#FAF6F0]/95 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(184,134,11,0.4)] flex flex-col items-center text-center text-[#3E2B1E]"
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Bismillah Calligraphy Emblem */}
        <div className="text-2xl font-bold font-serif text-[#B8860B] mb-3 drop-shadow-sm">
          ﷽
        </div>

        {/* Filigree Separator */}
        <div className="flex items-center gap-2 text-[#B8860B] text-xs mb-4">
          <span className="h-[1px] w-8 bg-[#D4AF37]/60" />
          <span>❀</span>
          <span className="h-[1px] w-8 bg-[#D4AF37]/60" />
        </div>

        {/* Couple Names */}
        <h1 className="text-4xl sm:text-6xl font-normal font-cursive text-[#2C1D11] tracking-wide my-2 leading-tight">
          {couple.brideName.split(' ')[0]}
          <span className="block my-1 text-[#D4AF37] font-serif text-3xl sm:text-4xl font-normal">&</span>
          {couple.groomName.split(' ')[0]}
        </h1>

        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-4" />



        {/* Message */}
        <p className="text-xs sm:text-sm text-[#5C4332] font-serif italic my-4 max-w-md leading-relaxed">
          "{couple.invitationMessage}"
        </p>

        {/* Venue Name */}
        <div className="mt-4 pt-3 border-t border-[#D4AF37]/30 flex items-center gap-1.5 text-xs font-bold text-[#B8860B] uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-[#B8860B]" />
          <span>{couple.locationName}</span>
        </div>
      </motion.div>
    </div>
  );
};
