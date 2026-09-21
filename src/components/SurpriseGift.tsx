'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurpriseGiftProps {
  customMessage?: string;
}

export const SurpriseGift: React.FC<SurpriseGiftProps> = ({
  customMessage = "A lifetime of love, laughter, and endless happiness awaits! 🎁✨",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    try {
      confetti({ particleCount: 75, spread: 80, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="w-full max-w-md mx-auto my-8 px-4 text-center">
      <div className="p-6 rounded-3xl bg-stone-900/80 border border-amber-400/30 backdrop-blur-xl shadow-2xl flex flex-col items-center">
        <div className="flex items-center gap-2 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-2">
          <Gift className="w-4 h-4 text-rose-400" />
          <span>A Little Surprise 🎁</span>
        </div>

        <p className="text-xs text-stone-300 mb-4">Tap the gift box to unwrap your special note!</p>

        <div className="relative w-full min-h-[170px] rounded-2xl bg-gradient-to-br from-stone-950 via-rose-950 to-stone-950 border border-amber-400/40 p-6 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              <motion.button
                key="box"
                onClick={handleOpen}
                className="flex flex-col items-center gap-2 group cursor-pointer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 border border-amber-300 shadow-xl flex items-center justify-center relative shadow-rose-900/50">
                  <Gift className="w-10 h-10 text-amber-100 group-hover:rotate-12 transition-transform duration-300" />
                  <div className="absolute inset-x-0 top-1/2 h-2 bg-amber-300/80 -translate-y-1/2" />
                  <div className="absolute inset-y-0 left-1/2 w-2 bg-amber-300/80 -translate-x-1/2" />
                </div>
                <span className="text-xs font-semibold text-amber-200 mt-2 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                  Tap to Open
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="message"
                className="text-center"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
              >
                <Sparkles className="w-8 h-8 text-amber-300 mx-auto mb-2 animate-bounce" />
                <p className="font-serif text-base font-bold text-amber-100 mb-2">{customMessage}</p>
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500 mx-auto" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
