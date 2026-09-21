'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ThemeConfig } from '@/lib/types';
import { Dictionary } from '@/lib/dictionary';

interface EnvelopeOpeningProps {
  brideName: string;
  groomName: string;
  weddingDate: string;
  locationName: string;
  invitationMessage: string;
  theme: ThemeConfig;
  dict: Dictionary;
  onOpen?: () => void;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({
  onOpen,
}) => {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'opened'>('closed');

  const handleOpen = () => {
    if (phase !== 'closed') return;
    setPhase('opening');

    try {
      confetti({
        particleCount: 200,
        spread: 130,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#F3E5AB', '#B8860B', '#FFF8DC', '#FFFFFF', '#FFB6C1'],
      });
    } catch (e) {}

    if (onOpen) onOpen();

    setTimeout(() => {
      setPhase('opened');
    }, 2500);
  };

  if (phase === 'opened') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden p-4"
        style={{ background: 'radial-gradient(ellipse at center, #2C1D11 0%, #1A1005 60%, #0D0802 100%)' }}
        exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.8, ease: 'easeInOut' } }}
      >
        {/* Ambient Bokeh Lights */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${15 + i * 12}px`,
              height: `${15 + i * 12}px`,
              background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)',
              top: `${(i * 23) % 90}%`,
              left: `${(i * 31) % 90}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Main Envelope Image — the full start screen */}
        <motion.div
          className="relative cursor-pointer select-none"
          initial={{ scale: 0.85, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          onClick={handleOpen}
        >
          {/* Glow behind envelope */}
          <div
            className="absolute -inset-8 rounded-3xl blur-2xl pointer-events-none opacity-40"
            style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }}
          />

          {/* The Envelope Image */}
          <motion.img
            src="/envelope.png?v=2"
            alt="Wedding Invitation - Thoofa & Hizam"
            className="relative z-10 w-[340px] sm:w-[440px] md:w-[500px] h-auto rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.7)] border border-[#D4AF37]/30"
            animate={
              phase === 'opening'
                ? { scale: 1.1, opacity: 0, y: -100 }
                : {}
            }
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>

        {/* OPEN INVITATION Button (below image) */}
        {phase === 'closed' && (
          <motion.button
            className="mt-8 z-50 flex flex-col items-center cursor-pointer"
            onClick={handleOpen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {/* Pulsing Gold Wax Seal */}
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Glow */}
              <div
                className="absolute -inset-4 rounded-full blur-xl pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.7) 0%, transparent 70%)' }}
              />

              {/* Seal */}
              <div
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 border-[#FFE8A3] shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                style={{
                  background: 'conic-gradient(from 30deg, #6B4F0A, #C8920A, #F3E5AB, #D4AF37, #8C6A0F, #6B4F0A)',
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: '80%',
                    height: '80%',
                    background: 'radial-gradient(circle at 35% 35%, #D4AF37, #8C6A0F, #573E05)',
                    border: '1.5px solid rgba(243,229,171,0.7)',
                    boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.4)',
                  }}
                >
                  <svg className="w-6 h-6 text-[#FFF8DC] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Button Label */}
            <div
              className="mt-3 px-7 py-2.5 rounded-full font-extrabold text-[11px] tracking-[0.2em] uppercase flex items-center gap-2 shadow-2xl border border-[#D4AF37]"
              style={{
                background: 'linear-gradient(135deg, #3E2B1E, #2C1D11)',
                color: '#FCEEAC',
                boxShadow: '0 8px 25px rgba(0,0,0,0.8)',
              }}
            >
              <span>OPEN INVITATION</span>
              <span>💌</span>
            </div>
          </motion.button>
        )}

        {/* Opening phase text */}
        {phase === 'opening' && (
          <motion.p
            className="mt-8 text-[#D4AF37] text-sm font-serif tracking-wider z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1] }}
            transition={{ duration: 1.5 }}
          >
            ✨ Opening your invitation... ✨
          </motion.p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
