'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Calendar, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScratchCardProps {
  categoryTitle: string;
  badgeLabel: string;
  hiddenValue: string;
  icon?: 'month' | 'day' | 'year' | 'time';
}

const SingleScratchCard: React.FC<ScratchCardProps> = ({
  categoryTitle,
  badgeLabel,
  hiddenValue,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.parentElement?.clientWidth || 320;
    const height = 130;
    canvas.width = width;
    canvas.height = height;

    // Gold gradient surface
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#D4AF37');
    gradient.addColorStop(0.5, '#FCEEAC');
    gradient.addColorStop(1, '#997A15');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Text on scratch surface
    ctx.fillStyle = '#1C120C';
    ctx.font = 'bold 13px serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH HERE ✨', width / 2, height / 2 + 5);
  }, []);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentCount++;
    }

    const percentage = (transparentCount / (pixels.length / 4)) * 100;
    if (percentage > 35 && !isRevealed) {
      setIsRevealed(true);
      try {
        confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
      } catch (e) {}
    }
  };

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  return (
    <div className="w-full max-w-sm mx-auto p-5 rounded-3xl bg-stone-900/90 border-2 border-[#D4AF37]/60 backdrop-blur-xl shadow-[0_10px_30px_rgba(212,175,55,0.25)] flex flex-col items-center text-center">
      {/* Badge Header */}
      <div className="flex items-center gap-1.5 text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-1.5">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span>{badgeLabel}</span>
      </div>

      {/* Category Heading */}
      <h3 className="text-sm sm:text-base font-serif font-bold text-[#FCEEAC] mb-3">
        {categoryTitle}
      </h3>

      {/* Scratch Box with Heart Button motif */}
      <div className="relative w-full h-32 rounded-2xl overflow-hidden shadow-inner flex flex-col items-center justify-center bg-gradient-to-br from-[#2C1D11] via-[#3E2B1E] to-[#1C120C] border border-[#D4AF37]/50 p-3">
        {/* Secret Hidden Reveal Content */}
        <div className="flex flex-col items-center justify-center text-[#FCEEAC]">
          <Heart className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37] animate-bounce mb-1" />
          <span className="text-xl sm:text-2xl font-black font-serif text-white tracking-wide drop-shadow-md">
            {hiddenValue}
          </span>
        </div>

        {/* Overlay Scratch Canvas */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-pointer touch-none z-10"
            onMouseDown={(e) => scratch(e.clientX, e.clientY)}
            onMouseMove={(e) => {
              if (e.buttons === 1) scratch(e.clientX, e.clientY);
            }}
            onTouchStart={(e) => scratch(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={(e) => scratch(e.touches[0].clientX, e.touches[0].clientY)}
          />
        )}
      </div>
    </div>
  );
};

interface DateScratchCardsProps {
  weddingDate: string; // YYYY-MM-DD
  weddingTime: string;
}

export const DateScratchCards: React.FC<DateScratchCardsProps> = ({ weddingDate, weddingTime }) => {
  // Parse date into Year, Month Name, Day Date
  const dateObj = new Date(weddingDate);
  const year = dateObj.getFullYear() || 2026;
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[dateObj.getMonth()] || 'December';
  const day = dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : `${dateObj.getDate()}`;

  return (
    <div className="w-full my-12 px-4">
      {/* Header Box */}
      <div className="text-center mb-8 max-w-md mx-auto bg-stone-900/90 border border-[#D4AF37]/40 p-6 rounded-3xl backdrop-blur-md shadow-lg">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-wider uppercase mb-3">
          <Calendar className="w-4 h-4 text-[#D4AF37]" />
          <span>Save the Date Reveal</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#FCEEAC] drop-shadow-md">
          Find Wedding Date ❤️
        </h2>
        <p className="text-xs text-[#EAD8B1] mt-2 font-serif">
          Scratch the 3 heart cards below to discover our Year, Month & Date!
        </p>
      </div>

      {/* 3 Vertical Stacked Cards */}
      <div className="flex flex-col gap-6 max-w-md mx-auto">
        <SingleScratchCard
          badgeLabel="Step 1 • Year"
          categoryTitle="Scratch to Find Wedding Year 📅"
          hiddenValue={`${year}`}
        />

        <SingleScratchCard
          badgeLabel="Step 2 • Month"
          categoryTitle="Scratch to Find Wedding Month 🌹"
          hiddenValue={month}
        />

        <SingleScratchCard
          badgeLabel="Step 3 • Date & Time"
          categoryTitle="Scratch to Find Wedding Date ⏰"
          hiddenValue={`Date: ${day}  |  ${weddingTime}`}
        />
      </div>
    </div>
  );
};
