'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Heart, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { ThemeConfig } from '@/lib/types';
import { Dictionary } from '@/lib/dictionary';
import { generateGoogleCalendarUrl } from '@/lib/utils';

interface WeddingCalendarProps {
  weddingDate: string; // YYYY-MM-DD
  weddingTime: string;
  coupleNames: string;
  venueName: string;
  venueAddress: string;
  theme: ThemeConfig;
  dict: Dictionary;
}

export const WeddingCalendar: React.FC<WeddingCalendarProps> = ({
  weddingDate,
  weddingTime,
  coupleNames,
  venueName,
  venueAddress,
  theme,
  dict,
}) => {
  const targetDateObj = new Date(weddingDate);
  const targetYear = targetDateObj.getFullYear() || 2026;
  const targetMonth = targetDateObj.getMonth() || 10; // 0-based
  const targetDay = targetDateObj.getDate() || 26;

  const [currentYear, setCurrentYear] = useState(targetYear);
  const [currentMonth, setCurrentMonth] = useState(targetMonth);
  const [selectedDate, setSelectedDate] = useState<number | null>(targetDay);
  const [showDetails, setShowDetails] = useState(false);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const isWeddingMonth = currentYear === targetYear && currentMonth === targetMonth;

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const googleCalUrl = generateGoogleCalendarUrl(
    `Wedding of ${coupleNames}`,
    weddingDate,
    weddingTime,
    `${venueName}, ${venueAddress}`,
    `Celebrating the wedding of ${coupleNames}. We can't wait to see you there!`
  );

  return (
    <div className="w-full max-w-xl mx-auto my-10 px-4">
      <div className={`p-6 md:p-8 rounded-3xl border ${theme.cardBorder} ${theme.cardBg} shadow-2xl relative overflow-hidden backdrop-blur-xl`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 border-b border-amber-400/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif text-amber-100">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <p className="text-xs text-amber-200/80">{dict.saveTheDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg bg-stone-800/60 hover:bg-stone-700 text-stone-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg bg-stone-800/60 hover:bg-stone-700 text-stone-200 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days of Week */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-amber-300 mb-2 uppercase tracking-wider">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-2">{day}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10 md:h-12" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const isWeddingDay = isWeddingMonth && dayNum === targetDay;

            return (
              <motion.button
                key={`day-${dayNum}`}
                onClick={() => {
                  setSelectedDate(dayNum);
                  if (isWeddingDay) setShowDetails(true);
                }}
                className={`relative h-10 md:h-12 rounded-xl flex flex-col items-center justify-center font-medium text-sm transition-all duration-300 ${
                  isWeddingDay
                    ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-rose-500 text-stone-950 font-bold shadow-lg shadow-amber-500/40 ring-2 ring-amber-200 scale-105'
                    : selectedDate === dayNum
                    ? 'bg-amber-400/30 text-amber-200 border border-amber-400/50'
                    : 'text-stone-300 hover:bg-stone-800/50'
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{dayNum}</span>

                {isWeddingDay && (
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-4 h-4 text-rose-600 fill-rose-600 drop-shadow-md" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Wedding Event Modal / Popover */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              className="mt-6 p-4 rounded-2xl bg-amber-950/80 border border-amber-400/40 backdrop-blur-md text-amber-100 flex flex-col items-center text-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Wedding Celebration</span>
              </div>
              <h4 className="text-lg font-bold font-serif text-white">{coupleNames}</h4>
              <p className="text-xs text-amber-200">
                📅 {weddingDate} at {weddingTime}
              </p>
              <div className="flex items-center gap-1 text-xs text-amber-300/90 mt-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>{venueName}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add to Google Calendar Action Button */}
        <div className="mt-6 text-center">
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 text-stone-950 font-bold text-sm shadow-xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
          >
            <span>{dict.addToGoogleCalendar}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
