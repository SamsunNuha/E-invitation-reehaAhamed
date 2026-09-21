'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TapFlowersProps {
  hiddenMessage?: string;
}

export const TapFlowers: React.FC<TapFlowersProps> = ({
  hiddenMessage = "Every blossom brings us closer to our forever! 🌸✨",
}) => {
  const [flowers, setFlowers] = useState([
    { id: 1, icon: '🌸' },
    { id: 2, icon: '🌺' },
    { id: 3, icon: '🌹' },
    { id: 4, icon: '🌷' },
    { id: 5, icon: '🌻' },
    { id: 6, icon: '🌸' },
  ]);

  const [isRevealed, setIsRevealed] = useState(false);

  const handlePop = (id: number) => {
    const next = flowers.filter((f) => f.id !== id);
    setFlowers(next);
    if (next.length === 0) {
      setIsRevealed(true);
      try {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-8 px-4 text-center">
      <div className="p-6 rounded-3xl bg-stone-900/80 border border-emerald-400/30 backdrop-blur-xl shadow-2xl flex flex-col items-center">
        <div className="flex items-center gap-2 text-emerald-300 text-xs uppercase tracking-widest font-semibold mb-2">
          <Flower2 className="w-4 h-4 text-emerald-400" />
          <span>Interactive Flower Garden</span>
        </div>

        <p className="text-xs text-stone-300 mb-4">
          Tap all the flowers to clear the garden and reveal our note! 🌸
        </p>

        <div className="relative w-full min-h-[160px] rounded-2xl bg-gradient-to-br from-emerald-950 via-teal-950 to-stone-950 border border-emerald-400/40 p-6 flex items-center justify-center shadow-inner">
          {/* Revealed Secret Message */}
          <motion.div
            className="text-center px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isRevealed ? 1 : 0.3, scale: isRevealed ? 1 : 0.95 }}
          >
            <Sparkles className="w-8 h-8 text-amber-300 mx-auto mb-2 animate-bounce" />
            <p className="font-serif text-base font-bold text-amber-100">{hiddenMessage}</p>
          </motion.div>

          {/* Overlay Floating Flowers */}
          <div className="absolute inset-0 p-4 grid grid-cols-3 gap-3 items-center justify-center">
            <AnimatePresence>
              {flowers.map((flower) => (
                <motion.button
                  key={flower.id}
                  onClick={() => handlePop(flower.id)}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-stone-800/90 border border-emerald-300/40 text-2xl flex items-center justify-center shadow-lg hover:bg-emerald-800/60 mx-auto"
                  initial={{ scale: 1 }}
                  exit={{ scale: 0, rotate: 180, opacity: 0 }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                >
                  {flower.icon}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
