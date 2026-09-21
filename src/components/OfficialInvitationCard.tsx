'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Download } from 'lucide-react';

export const OfficialInvitationCard: React.FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-20 px-4">
      {/* Header Section Tag */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-600 text-xs font-semibold tracking-wider uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Official Invitation Card</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#3E2B1E] drop-shadow-sm">
          Wedding Invitation Card
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
      </div>

      {/* Royal Invitation Card Image Frame */}
      <motion.div
        className="relative rounded-3xl overflow-hidden border-4 border-[#D4AF37]/80 shadow-[0_25px_60px_rgba(0,0,0,0.3)] bg-stone-900 group flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Full Image Display of Official Invitation Card */}
        <img
          src="/invitation_card_image.png"
          alt="Official Wedding Invitation Card - Thoofa & Hizam"
          className="w-full h-auto object-contain rounded-2xl group-hover:scale-[1.01] transition-transform duration-500"
        />

        {/* Download / High Res View Action Button */}
        <div className="p-6 w-full bg-[#FAF6EE] border-t-2 border-[#D4AF37]/40 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm font-serif font-bold text-[#3E2B1E]">Official Invitation Card</p>
            <p className="text-xs text-[#7C624E]">Thoofa & Hizam • June 19, 2027</p>
          </div>
          <a
            href="/invitation_card_image.png"
            target="_blank"
            download="Thoofa_Hizam_Wedding_Invitation.png"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-[#3E2B1E] font-bold text-xs shadow-lg hover:scale-105 transition-transform"
          >
            <Download className="w-4 h-4" />
            <span>Download Card Image 📥</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};
