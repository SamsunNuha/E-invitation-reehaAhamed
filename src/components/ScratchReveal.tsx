'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScratchRevealProps {
  hiddenMessage?: string;
  title?: string;
}

export const ScratchReveal: React.FC<ScratchRevealProps> = ({
  hiddenMessage = "🗓️ Save the Date\nDecember 13, 2026 • 04:30 PM",
  title = "Scratch the Heart to Reveal Wedding Date ❤️",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);
  const totalFoilPixelsRef = useRef<number>(0);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Canvas Heart Path - Wide & Generous Proportions
  const drawHeart = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.beginPath();
    ctx.moveTo(w / 2, h * 0.95);
    ctx.bezierCurveTo(w / 2, h * 0.95, w * 0.98, h * 0.57, w * 0.98, h * 0.30);
    ctx.bezierCurveTo(w * 0.98, h * 0.05, w * 0.68, -h * 0.03, w / 2, h * 0.20);
    ctx.bezierCurveTo(w * 0.32, -h * 0.03, 0.02, h * 0.05, 0.02, h * 0.30);
    ctx.bezierCurveTo(0.02, h * 0.57, w / 2, h * 0.95, w / 2, h * 0.95);
    ctx.closePath();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 350;
    const height = 300;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    // Draw Gold Foil Heart Scratch Surface
    ctx.save();
    drawHeart(ctx, width, height);
    
    // Fill Heart with Rich Metallic Gold Foil Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#D4AF37');
    gradient.addColorStop(0.35, '#FFF6CE');
    gradient.addColorStop(0.7, '#D4AF37');
    gradient.addColorStop(1, '#997A15');
    ctx.fillStyle = gradient;
    ctx.fill();

    // Metallic Gold Heart Outline
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#B8860B';
    ctx.stroke();

    // Instruction text on Scratch Surface - Centered in wide upper middle
    ctx.fillStyle = '#2E050D';
    ctx.font = 'bold 16px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('🪙 SCRATCH WITH FINGER 🪙', width / 2, height * 0.44);
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#4A0E17';
    ctx.fillText('RUB HERE TO REVEAL DATE', width / 2, height * 0.54);
    ctx.restore();

    // Calculate exact count of gold foil pixels filled inside heart
    const imgData = ctx.getImageData(0, 0, width, height);
    let foilPixelCount = 0;
    for (let i = 3; i < imgData.data.length; i += 4) {
      if (imgData.data[i] > 0) {
        foilPixelCount++;
      }
    }
    totalFoilPixelsRef.current = foilPixelCount;
  }, []);

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed || totalFoilPixelsRef.current === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let remainingFoilPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] > 0) {
        remainingFoilPixels++;
      }
    }

    const erasedRatio = ((totalFoilPixelsRef.current - remainingFoilPixels) / totalFoilPixelsRef.current) * 100;
    
    // Only auto-reveal when more than 50% of the gold heart surface has been rubbed off
    if (erasedRatio > 50 && !isRevealed) {
      setIsRevealed(true);
      try {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      } catch (e) {}
    }
  };

  const scratch = (clientX: number, clientY: number, isStarting = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const currX = (clientX - rect.left) * (canvas.width / rect.width);
    const currY = (clientY - rect.top) * (canvas.height / rect.height);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 44;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isStarting || !lastPosRef.current) {
      ctx.beginPath();
      ctx.arc(currX, currY, 22, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(currX, currY);
      ctx.stroke();
    }

    lastPosRef.current = { x: currX, y: currY };
    checkScratchPercentage();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDrawing.current = true;
    lastPosRef.current = null;
    scratch(e.clientX, e.clientY, true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    lastPosRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDrawing.current = true;
    lastPosRef.current = null;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY, true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing.current) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  return (
    <div className="w-full max-w-sm mx-auto my-8 px-2 text-center flex flex-col items-center">
      {/* SVG ClipPath Definition for Responsive Heart Card */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <clipPath id="heartCardClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5,0.95 C 0.5,0.95 0.98,0.57 0.98,0.30 C 0.98,0.05 0.68,-0.03 0.5,0.20 C 0.32,-0.03 0.02,0.05 0.02,0.30 C 0.02,0.57 0.5,0.95 0.5,0.95 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Header Badge */}
      <div className="flex items-center gap-1.5 text-[#D4AF37] text-xs uppercase tracking-widest font-bold mb-2">
        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
        <span>Interactive Save The Date</span>
      </div>

      <p className="text-sm text-[#FCEEAC] font-serif font-semibold mb-6 drop-shadow-sm">{title}</p>

      {/* WIDE BIG HEART SHAPED CARD */}
      <div className="relative w-[300px] xs:w-[340px] sm:w-[350px] h-[260px] xs:h-[290px] sm:h-[300px] flex items-center justify-center filter drop-shadow-[0_15px_35px_rgba(212,175,55,0.35)]">
        
        {/* Revealed Content Container Inside Wide Heart Shape */}
        <motion.div
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-start pt-8 xs:pt-11 sm:pt-12 px-4 xs:px-6 bg-gradient-to-br from-[#4A0A14] via-[#2E050D] to-[#1F0307] border-4 border-[#D4AF37] shadow-2xl relative overflow-hidden"
          style={{ clipPath: 'url(#heartCardClip)' }}
          initial={{ scale: 0.95 }}
          animate={{ scale: isRevealed ? [1, 1.03, 1] : 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Pulsing Backlight Heart */}
          <Heart className="w-32 h-32 text-[#D4AF37]/20 fill-[#D4AF37]/20 absolute top-8 -z-0 animate-pulse" />

          <div className="relative z-10 flex flex-col items-center text-center max-w-[280px] mx-auto">
            <div className="p-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 mb-1 shadow-lg">
              <Heart className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37] animate-bounce" />
            </div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#D4AF37] mb-0.5">Save The Date</p>
            
            {/* Main Date - Positioned Dead Center in the Wide Upper Middle */}
            <h3 className="font-serif text-lg sm:text-xl font-extrabold text-[#FFF8ED] tracking-wide whitespace-nowrap drop-shadow-md my-1">
              December 13, 2026
            </h3>
            
            <p className="text-xs font-semibold text-[#FCEEAC] mt-0.5 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> 04:30 PM Onwards
            </p>
          </div>
        </motion.div>

        {/* SVG Outer Gold Border Frame for Heart Card */}
        <svg viewBox="0 0 350 300" className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <path
            d="M 175 285 C 175 285 343 171 343 90 C 343 15 238 -9 175 60 C 112 -9 7 15 7 90 C 7 171 175 285 175 285 Z"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="5"
          />
        </svg>

        {/* Gold Scratch Canvas Overlay covering Heart Card */}
        {!isRevealed && (
          <canvas
            ref={canvasRef}
            className="absolute inset-0 cursor-pointer touch-none z-20 mx-auto"
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
  );
};
