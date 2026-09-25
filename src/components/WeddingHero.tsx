'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Stars } from 'lucide-react';
import { WeddingData, ThemeConfig } from '@/lib/types';
import { Dictionary } from '@/lib/dictionary';

interface WeddingHeroProps {
  wedding: WeddingData;
  theme: ThemeConfig;
  dict: Dictionary;
}

export const WeddingHero: React.FC<WeddingHeroProps> = ({ wedding, theme, dict }) => {
  const { couple } = wedding;
  const brideName = couple.brideName.split(' ')[0] || 'Reeha';
  const groomName = couple.groomName.split(' ')[0] || 'Ahamed';

  return (
    <div className="relative min-h-[95vh] flex flex-col items-center justify-center text-center p-4 sm:p-6 overflow-hidden bg-gradient-to-b from-[#1F0307] via-[#3D0811] to-[#190205]">
      {/* Background Archway Backdrop Illustration */}
      <div className="absolute inset-0 z-0 opacity-60">
        <img
          src="/couple_flower_back_pose.png?v=50"
          alt="Luxury Muslim Couple Floral Back Pose"
          className="w-full h-full object-cover filter brightness-90 contrast-110 scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1F0307]/80 via-[#2E050D]/50 to-[#1F0307]" />
      </div>

      {/* Top Hanging Golden Crystal Chandelier Overlay */}
      <motion.div
        className="relative z-10 w-48 sm:w-64 mb-4 flex flex-col items-center pointer-events-none"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-0.5 h-12 bg-gradient-to-b from-transparent via-[#D4AF37] to-[#B8860B]" />
        <div className="relative p-3 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 shadow-2xl backdrop-blur-sm">
          <Sparkles className="w-7 h-7 text-[#D4AF37] animate-pulse" />
        </div>
      </motion.div>

      {/* MAIN ULTRA-LUXURY ARCH INVITATION CARD */}
      <motion.div
        className="relative z-10 w-full max-w-xl mx-auto p-4 xs:p-6 sm:p-10 md:p-12 rounded-t-[7rem] xs:rounded-t-[9rem] sm:rounded-t-[11rem] rounded-b-3xl border-2 border-[#D4AF37]/80 bg-gradient-to-b from-[#3A070E]/95 via-[#2E050D]/95 to-[#1F0307]/95 backdrop-blur-xl shadow-[0_25px_80px_rgba(212,175,55,0.35)] flex flex-col items-center text-center text-[#FFF8ED] overflow-hidden"
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Inner Gold Filigree Double Border Frame */}
        <div className="absolute inset-2 xs:inset-2.5 sm:inset-3.5 rounded-t-[6.3rem] xs:rounded-t-[8.3rem] sm:rounded-t-[10.2rem] rounded-b-2xl border border-[#D4AF37]/30 pointer-events-none" />

        {/* Top Floating Golden Lanterns Flanking the Arch */}
        <div className="w-full flex items-center justify-between px-4 text-[#D4AF37]/70 text-xs mb-1">
          <span className="animate-pulse">✨ 🏮</span>
          <span className="animate-pulse">🏮 ✨</span>
        </div>

        {/* Bismillah Calligraphy Emblem */}
        <div className="relative my-1 flex flex-col items-center">
          <div className="text-3xl sm:text-4xl font-bold font-serif text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.6)] tracking-wide">
            ﷽
          </div>
          <p className="text-[10px] sm:text-xs font-serif italic text-[#FCEEAC]/80 mt-1">
            In the name of Allah, the Most Gracious, the Most Merciful
          </p>
        </div>

        {/* Filigree Separator */}
        <div className="flex items-center justify-center gap-3 text-[#D4AF37] text-xs my-3">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
          <span>✦ ❀ ✦</span>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
        </div>

        {/* Invitation Subtitle */}
        <p className="text-xs sm:text-sm font-serif text-[#FCEEAC] tracking-wider uppercase font-semibold my-1">
          Together with their families, we invite you to celebrate the wedding of
        </p>

        {/* OPULENT COUPLE NAMES DISPLAY */}
        <div className="my-4 relative py-2 px-4 w-full">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-wide drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] leading-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D0] via-[#FCEEAC] to-[#B8860B]">
            {brideName}
          </h1>

          <div className="flex items-center justify-center gap-3 my-1">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <span className="font-serif text-3xl sm:text-4xl font-normal text-[#D4AF37] italic">&amp;</span>
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-wide drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)] leading-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D0] via-[#FCEEAC] to-[#B8860B]">
            {groomName}
          </h1>
        </div>

        {/* Tagline quote */}
        <p className="text-xs sm:text-sm text-[#FCEEAC]/90 font-serif italic max-w-md leading-relaxed my-2">
          "Two hearts, one path, in the light of Allah."
        </p>

        {/* Footer Blessing Note */}
        <div className="mt-4 pt-3 border-t border-[#D4AF37]/30 w-full flex items-center justify-center gap-2 text-xs font-serif italic text-[#D4AF37]">
          <Heart className="w-3.5 h-3.5 fill-[#D4AF37] animate-pulse" />
          <span>May Allah bless this union with love, mercy, and eternal happiness.</span>
          <Heart className="w-3.5 h-3.5 fill-[#D4AF37] animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
};
