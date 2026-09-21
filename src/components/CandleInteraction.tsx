'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles } from 'lucide-react';

export const CandleInteraction: React.FC = () => {
  const [isLit, setIsLit] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto my-8 px-4 text-center">
      <div className="p-6 rounded-3xl bg-stone-900/80 border border-amber-400/30 backdrop-blur-xl shadow-2xl flex flex-col items-center">
        <div className="flex items-center gap-2 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-2">
          <Flame className="w-4 h-4 text-amber-400" />
          <span>Light a Blessing Candle 🕯️</span>
        </div>

        <p className="text-xs text-stone-300 mb-6">
          Light a candle for our new beginning & eternal happiness
        </p>

        {/* Candle Graphic Container */}
        <div
          onClick={() => setIsLit(!isLit)}
          className="relative cursor-pointer flex flex-col items-center group py-4"
        >
          {/* Flame & Aura Glow */}
          <div className="h-14 flex items-end justify-center relative">
            {isLit && (
              <>
                <motion.div
                  className="absolute w-20 h-20 rounded-full bg-amber-400/30 blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div
                  className="relative text-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.9)]"
                  animate={{ y: [0, -2, 0], scale: [1, 1.08, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Flame className="w-10 h-10 fill-amber-400 text-yellow-200" />
                </motion.div>
              </>
            )}
          </div>

          {/* Candle Body */}
          <div className="w-14 h-28 rounded-t-lg bg-gradient-to-b from-amber-100 via-amber-200 to-amber-300 border border-amber-300/80 shadow-xl relative overflow-hidden flex flex-col items-center pt-2">
            <div className="w-1 h-3 bg-stone-800 rounded-full mb-1" />
            <div className="w-full h-1 bg-amber-400/40" />
          </div>

          {/* Stand */}
          <div className="w-24 h-4 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 border border-amber-400/60 shadow-lg -mt-1" />

          {/* Status Badge */}
          <div className="mt-4">
            <span
              className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-300 ${
                isLit
                  ? 'bg-amber-400/20 text-amber-200 border-amber-400/50 shadow-md'
                  : 'bg-stone-800 text-stone-400 border-stone-700'
              }`}
            >
              {isLit ? '🕯️ Candle Lit with Blessings!' : 'Tap Candle to Light'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
