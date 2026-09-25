'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeartCounterProps {
  weddingId: string;
  initialCount?: number;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  emoji: string;
}

export const HeartCounter: React.FC<HeartCounterProps> = ({ weddingId, initialCount = 0 }) => {
  const [count, setCount] = useState<number>(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  // Initialize count starting from 0 and synced with localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageKey = `wedding_heart_count_${weddingId}`;
      const savedCount = localStorage.getItem(storageKey);
      if (savedCount !== null) {
        setCount(parseInt(savedCount, 10) || 0);
      } else {
        setCount(0);
        localStorage.setItem(storageKey, '0');
      }
    }
  }, [weddingId]);

  const handleSendLove = () => {
    // 1. Store incremented count in localStorage
    const newCount = count + 1;
    setCount(newCount);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`wedding_heart_count_${weddingId}`, newCount.toString());
    }

    // 2. Trigger Confetti Blast
    try {
      confetti({
        particleCount: 45,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#FF1493', '#FF69B4', '#D4AF37', '#FCEEAC', '#FF0055', '#E60026'],
      });
    } catch (e) {}

    // 3. Generate massive multi-directional floating heart splash explosion
    const heartEmojis = ['💖', '❤️', '💗', '💕', '💓', '✨', '🌹', '💝', '❣️'];
    const newSplash: FloatingHeart[] = [];

    for (let i = 0; i < 16; i++) {
      newSplash.push({
        id: Date.now() + Math.random() + i,
        x: (Math.random() - 0.5) * 240, // Wide horizontal spread (-120px to +120px)
        y: -150 - Math.random() * 140,   // High upward trajectory (-150px to -290px)
        size: 20 + Math.random() * 22,   // Dynamic size (20px to 42px)
        rotation: (Math.random() - 0.5) * 80,
        emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
      });
    }

    setHearts((prev) => [...prev.slice(-40), ...newSplash]);
  };

  return (
    <div className="w-full max-w-sm mx-auto my-6 px-2 text-center">
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#4A0A14] via-[#2E050D] to-[#1F0307] border-2 border-[#D4AF37]/70 backdrop-blur-xl shadow-[0_15px_45px_rgba(212,175,55,0.35)] flex flex-col items-center relative overflow-hidden">
        
        {/* Subtle Ambient Heart Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/15 blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex items-center gap-1.5 text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-2 z-10">
          <Sparkles className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          <span>Shower Couple With Love</span>
        </div>

        {/* Counter Display - Starts from 0 */}
        <div className="my-2 z-10">
          <motion.div
            key={count}
            initial={{ scale: 1.3, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl sm:text-5xl font-extrabold font-serif text-[#FFF8ED] drop-shadow-[0_4px_10px_rgba(212,175,55,0.5)]"
          >
            {count.toLocaleString()}
          </motion.div>
          <div className="text-xs text-[#FCEEAC] font-serif font-bold mt-1 tracking-wide">
            Hearts Received ❤️
          </div>
        </div>

        {/* Send Love Action & Floating Splash Overlay */}
        <div className="relative my-3 z-10 w-full flex flex-col items-center justify-center">
          
          {/* Splash Floating Animated Hearts */}
          <AnimatePresence>
            {hearts.map((h) => (
              <motion.div
                key={h.id}
                className="absolute pointer-events-none z-30 select-none"
                style={{
                  left: `calc(50% + ${h.x}px)`,
                  bottom: '100%',
                  fontSize: `${h.size}px`,
                }}
                initial={{ y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
                animate={{
                  y: h.y,
                  opacity: [1, 1, 0],
                  scale: [0.6, 1.3, 1],
                  rotate: h.rotation,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              >
                {h.emoji}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Interactive Button */}
          <motion.button
            onClick={handleSendLove}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FCEEAC] to-[#B8860B] text-[#1F0307] font-extrabold text-sm shadow-[0_10px_25px_rgba(212,175,55,0.4)] border border-[#FFF8ED] flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-transform"
            whileTap={{ scale: 0.88 }}
          >
            <Heart className="w-5 h-5 fill-[#1F0307] text-[#1F0307] animate-bounce" />
            <span className="tracking-wide">Send Love ❤️</span>
          </motion.button>
        </div>

        {/* Small hint label */}
        <p className="text-[10px] text-[#D4AF37]/80 font-serif italic mt-1 z-10">
          Tap repeatedly to shower Reeha &amp; Ahamed with blessings!
        </p>

      </div>
    </div>
  );
};

