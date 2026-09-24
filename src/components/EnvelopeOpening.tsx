'use client';

import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface EnvelopeOpeningProps {
  isOpen?: boolean;
  onClose?: () => void;
  coupleNames?: string;
}

export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({
  isOpen = true,
  onClose,
  coupleNames = 'Ayesha & Rizwan',
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isClosedInternal, setIsClosedInternal] = useState(false);

  if (!isOpen || isClosedInternal) return null;

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    setTimeout(() => {
      setIsClosedInternal(true);
      if (onClose) onClose();
    }, 1400);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-stone-950 flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        isOpening ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center overflow-hidden shadow-2xl [perspective:1200px]">
        
        {/* LEFT HALF ENVELOPE DOOR - SLIDES TO LEFT */}
        <div
          onClick={handleOpen}
          className={`absolute inset-0 w-full h-full cursor-pointer transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-left z-20 ${
            isOpening
              ? '[transform:translateX(-100%)] opacity-0'
              : '[transform:translateX(0)] opacity-100'
          }`}
          style={{ clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)' }}
        >
          <img
            src="/gold_envelope.jpg"
            alt="Gold Envelope Left Door"
            className="w-full h-full object-cover filter brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-transparent to-black/40 pointer-events-none" />
        </div>

        {/* RIGHT HALF ENVELOPE DOOR - SLIDES TO RIGHT */}
        <div
          onClick={handleOpen}
          className={`absolute inset-0 w-full h-full cursor-pointer transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-right z-20 ${
            isOpening
              ? '[transform:translateX(100%)] opacity-0'
              : '[transform:translateX(0)] opacity-100'
          }`}
          style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}
        >
          <img
            src="/gold_envelope.jpg"
            alt="Gold Envelope Right Door"
            className="w-full h-full object-cover filter brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-amber-400/10 via-transparent to-black/40 pointer-events-none" />
        </div>

        {/* TOP COUPLE BADGE HEADER */}
        <div className="absolute top-5 sm:top-6 z-40 flex items-center gap-1.5 sm:gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-stone-900/90 border border-amber-400/50 text-amber-200 text-[11px] sm:text-xs font-serif font-bold backdrop-blur-md shadow-xl pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 animate-pulse" />
          <span>{coupleNames}</span>
        </div>

        {/* CENTER BUTTERFLY WAX SEAL BUTTON WITH LIGHT SCROLL */}
        <div
          onClick={handleOpen}
          className={`absolute z-40 flex flex-col items-center gap-3 sm:gap-4 text-center my-auto transition-all duration-700 cursor-pointer px-4 ${
            isOpening ? 'scale-150 opacity-0 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <button
            aria-label="Open Wedding Invitation"
            className="group relative flex items-center justify-center w-22 h-22 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-500 border-2 border-amber-200 text-stone-950 animate-gold-pulse overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.8)]"
          >
            {/* INNER BUTTON LIGHT SCROLL EFFECT */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/90 to-transparent w-full h-full animate-light-scroll pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center justify-center text-stone-950 font-serif">
              <Heart className="w-7 h-7 sm:w-10 sm:h-10 fill-stone-950 text-stone-950 group-hover:scale-110 transition-transform drop-shadow" />
              <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest mt-0.5 text-stone-950 drop-shadow-sm">
                OPEN
              </span>
            </div>
          </button>

          <div className="space-y-1 pointer-events-none">
            <h3 className="text-lg sm:text-2xl font-serif font-bold text-amber-200 drop-shadow-lg tracking-wide">
              Tap Envelope to Open 💌
            </h3>
            <p className="text-[11px] sm:text-xs text-amber-100/90 drop-shadow-md font-serif">
              Reveal {coupleNames}&apos;s Official Invitation
            </p>
          </div>
        </div>

        {/* GOLD LIGHT BURST EFFECT ON CLICK */}
        {isOpening && (
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-hidden">
            <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-rose-400 opacity-90 filter blur-3xl animate-ping" />
          </div>
        )}

      </div>
    </div>
  );
};
