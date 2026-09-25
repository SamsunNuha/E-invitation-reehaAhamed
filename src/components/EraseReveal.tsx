'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gem } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EraseRevealProps {
  hiddenText?: string;
}

export const EraseReveal: React.FC<EraseRevealProps> = ({ hiddenText = 'WE ARE GETTING MARRIED! 💍' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const isErasing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.parentElement?.clientWidth || 340;
    const height = 160;
    canvas.width = width;
    canvas.height = height;

    // Soft silk fog overlay
    ctx.fillStyle = '#292524';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#F59E0B';
    ctx.font = '14px serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Wipe here to erase veil ✨', width / 2, height / 2 + 4);
  }, []);

  const erase = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    checkErase();
  };

  const checkErase = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }

    if (transparent / (imageData.data.length / 4) > 0.45) {
      setRevealed(true);
      try {
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto my-4 px-2 text-center">
      <div className="p-5 sm:p-6 rounded-3xl bg-[#2E050D]/90 border-2 border-[#D4AF37]/60 backdrop-blur-xl shadow-[0_10px_35px_rgba(212,175,55,0.3)] flex flex-col items-center">
        <div className="flex items-center gap-1.5 text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-2">
          <Gem className="w-4 h-4 text-[#D4AF37] animate-spin" />
          <span>Mystery Announcement</span>
        </div>

        <p className="text-xs text-[#FCEEAC] font-serif mb-3">Wipe screen below to reveal</p>

        <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#997A15] border border-[#FCEEAC]/60 p-4 flex items-center justify-center shadow-inner">
          <div className="text-stone-950 text-center">
            <h3 className="text-lg font-black font-serif tracking-wide text-stone-950 drop-shadow-sm uppercase">
              {hiddenText}
            </h3>
          </div>

          {!revealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 cursor-pointer touch-none z-10"
              onMouseDown={(e) => {
                isErasing.current = true;
                erase(e.clientX, e.clientY);
              }}
              onMouseMove={(e) => {
                if (isErasing.current) erase(e.clientX, e.clientY);
              }}
              onMouseUp={() => (isErasing.current = false)}
              onMouseLeave={() => (isErasing.current = false)}
              onTouchStart={(e) => {
                isErasing.current = true;
                erase(e.touches[0].clientX, e.touches[0].clientY);
              }}
              onTouchMove={(e) => {
                if (isErasing.current) erase(e.touches[0].clientX, e.touches[0].clientY);
              }}
              onTouchEnd={() => (isErasing.current = false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
