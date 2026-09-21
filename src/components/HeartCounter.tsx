'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { storage } from '@/lib/storage';

interface HeartCounterProps {
  weddingId: string;
  initialCount?: number;
}

interface FloatingHeart {
  id: number;
  x: number;
}

export const HeartCounter: React.FC<HeartCounterProps> = ({ weddingId, initialCount = 42 }) => {
  const [count, setCount] = useState(initialCount);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  const handleSendLove = () => {
    const newCount = storage.incrementHeartCount(weddingId);
    setCount(newCount || count + 1);

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 - 40,
    };

    setHearts((prev) => [...prev.slice(-10), newHeart]);
  };

  return (
    <div className="w-full max-w-sm mx-auto my-4 px-2 text-center">
      <div className="p-5 sm:p-6 rounded-3xl bg-stone-900/90 border-2 border-[#D4AF37]/50 backdrop-blur-xl shadow-[0_10px_30px_rgba(212,175,55,0.25)] flex flex-col items-center relative overflow-hidden">
        <div className="flex items-center gap-1.5 text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Shower Couple with Love</span>
        </div>

        {/* Counter Display */}
        <div className="my-2">
          <div className="text-3xl font-extrabold font-serif text-[#FCEEAC]">
            {count.toLocaleString()}
          </div>
          <div className="text-xs text-[#D4AF37] font-semibold">Hearts Received ❤️</div>
        </div>

        {/* Send Love Button */}
        <div className="relative my-2">
          {/* Floating animated hearts */}
          <AnimatePresence>
            {hearts.map((h) => (
              <motion.div
                key={h.id}
                className="absolute text-2xl pointer-events-none z-20"
                style={{ left: `calc(50% + ${h.x}px)`, bottom: '100%' }}
                initial={{ y: 0, opacity: 1, scale: 0.8 }}
                animate={{ y: -100, opacity: 0, scale: 1.4, rotate: h.x }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              >
                💖
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            onClick={handleSendLove}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#997A15] text-stone-950 font-black text-xs sm:text-sm shadow-lg shadow-[#D4AF37]/30 border border-[#FCEEAC]/60 flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform"
            whileTap={{ scale: 0.9 }}
          >
            <Heart className="w-4 h-4 fill-stone-950 text-stone-950 animate-bounce" />
            <span>Send Love ❤️</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
