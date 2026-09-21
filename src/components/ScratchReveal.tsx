'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScratchRevealProps {
  hiddenMessage?: string;
  title?: string;
}

export const ScratchReveal: React.FC<ScratchRevealProps> = ({
  hiddenMessage = "We can't wait to celebrate with you! ❤️",
  title = "Scratch to reveal a special message ❤️",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const width = canvas.parentElement?.clientWidth || 340;
    const height = 160;
    canvas.width = width;
    canvas.height = height;

    // Fill cover pattern
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#D4AF37');
    gradient.addColorStop(0.5, '#F4E0A5');
    gradient.addColorStop(1, '#997A15');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Text on silver/gold scratch surface
    ctx.fillStyle = '#1C1917';
    ctx.font = 'bold 14px sans-serif';
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
    if (percentage > 40 && !isRevealed) {
      setIsRevealed(true);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
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

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawing.current = true;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDrawing.current = true;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing.current) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  return (
    <div className="w-full max-w-sm mx-auto my-4 px-2 text-center">
      <div className="p-5 sm:p-6 rounded-3xl bg-stone-900/90 border-2 border-[#D4AF37]/50 backdrop-blur-xl shadow-[0_10px_30px_rgba(212,175,55,0.25)] flex flex-col items-center">
        <div className="flex items-center gap-1.5 text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Interactive Surprise</span>
        </div>

        <p className="text-xs sm:text-sm text-[#FCEEAC] font-serif font-medium mb-3">{title}</p>

        <div className="relative w-full h-36 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center bg-gradient-to-br from-[#2C1D11] via-[#3E2B1E] to-[#1C120C] border border-[#D4AF37]/40 p-4">
          {/* Secret Hidden Content */}
          <div className="flex flex-col items-center text-center text-[#FCEEAC]">
            <Heart className="w-7 h-7 text-[#D4AF37] fill-[#D4AF37] animate-pulse mb-1.5" />
            <p className="font-serif text-base sm:text-lg font-bold text-white px-2 drop-shadow-md whitespace-pre-line">{hiddenMessage}</p>
          </div>

          {/* Overlay Scratch Canvas */}
          {!isRevealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 cursor-pointer touch-none z-10"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            />
          )}
        </div>
      </div>
    </div>
  );
};
