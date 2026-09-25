'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ThemeConfig } from '@/lib/types';
import { Dictionary } from '@/lib/dictionary';

interface CountdownProps {
  targetDate: string;
  targetTime?: string;
  theme: ThemeConfig;
  dict: Dictionary;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, targetTime = '00:00', theme, dict }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Parse YYYY-MM-DD format strictly as local date time
      const [year, month, day] = targetDate.split('-').map(Number);
      let targetDateTime = new Date(year, month - 1, day, 16, 30, 0);

      const difference = +targetDateTime - +new Date();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isFinished: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isFinished: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate, targetTime]);

  if (timeLeft.isFinished) {
    return (
      <div className="w-full max-w-xl mx-auto my-8 p-6 rounded-2xl bg-[#FAF6EE] text-[#3E2B1E] text-center shadow-xl border border-[#D4AF37]/60">
        <motion.div
          className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-serif font-bold"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Heart className="w-8 h-8 fill-[#B8860B] text-[#B8860B] animate-pulse" />
          <span>{dict.bigDayArrived}</span>
          <Heart className="w-8 h-8 fill-[#B8860B] text-[#B8860B] animate-pulse" />
        </motion.div>
      </div>
    );
  }

  const units = [
    { label: dict.days, value: timeLeft.days },
    { label: dict.hours, value: timeLeft.hours },
    { label: dict.minutes, value: timeLeft.minutes },
    { label: dict.seconds, value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-14 px-4 text-center">
      <div className="p-8 md:p-10 rounded-3xl bg-[#2E050D]/90 border-2 border-[#D4AF37]/60 shadow-2xl backdrop-blur-md">
        {/* Title Filigree */}
        <div className="flex items-center justify-center gap-3 text-[#D4AF37] mb-2">
          <span className="h-[1px] w-8 bg-[#D4AF37]/60" />
          <span className="text-xs font-serif italic">Save the Date</span>
          <span className="h-[1px] w-8 bg-[#D4AF37]/60" />
        </div>

        <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#FCEEAC] mb-6 drop-shadow-md">
          Counting Down to Our Wedding Day
        </h3>

        {/* Minimalist Countdown Display */}
        <div className="flex items-center justify-center gap-1.5 xs:gap-3 md:gap-6 my-4">
          {units.map((unit, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <span className="text-2xl xs:text-3xl md:text-5xl font-serif font-bold text-[#FFF8ED] tracking-tight drop-shadow-md">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] xs:text-[10px] md:text-xs font-serif text-[#D4AF37] uppercase tracking-widest mt-1">
                  {unit.label}
                </span>
              </div>
              {index < units.length - 1 && (
                <span className="text-xl xs:text-2xl md:text-4xl font-serif text-[#D4AF37] mb-4 font-bold">:</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
