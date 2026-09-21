'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { WeddingEvent, ThemeConfig } from '@/lib/types';
import { Dictionary } from '@/lib/dictionary';

interface EventsTimelineProps {
  events: WeddingEvent[];
  theme: ThemeConfig;
  dict: Dictionary;
}

export const EventsTimeline: React.FC<EventsTimelineProps> = ({ events, theme, dict }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Track scroll progress inside this timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 60%', 'end 40%'],
  });

  // Smooth spring physics for sliding the single flower button along the line
  const smoothY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  // Map 0 -> 1 progress smoothly along the vertical line
  const travelingTop = useTransform(smoothY, [0, 1], ['5%', '90%']);

  const displayEvents: WeddingEvent[] = [
    {
      id: '1',
      title: 'Mehendi Night 🌿✨',
      date: '2026-11-29',
      time: '06:00 PM',
      venue: 'Shangri-La Garden Lawn',
      description: 'A festive evening of henna application, vibrant music, traditional songs, and joy with loved ones.',
    },
    {
      id: '2',
      title: 'Wedding Day (Nikah) 💍👰‍♀️',
      date: '2026-11-30',
      time: '04:30 PM',
      venue: 'Grand Ballroom, Shangri-La Colombo',
      description: 'The sacred wedding Nikah ceremony and solemnization of our union surrounded by our family.',
    },
    {
      id: '3',
      title: 'Waleema Reception 🎉🥂',
      date: '2026-12-01',
      time: '07:00 PM',
      venue: 'Royal Banquet Hall, Shangri-La Colombo',
      description: 'Grand wedding feast banquet, celebrations, cake cutting, and joyous evening dinner reception.',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-16 px-4">
      <div
        ref={containerRef}
        className="p-8 md:p-12 rounded-3xl bg-[#FAF6EE]/90 border border-[#D4AF37]/40 shadow-2xl backdrop-blur-md flex flex-col items-center text-center relative overflow-hidden"
      >
        {/* Title Filigree */}
        <div className="flex items-center justify-center gap-3 text-[#B8860B] mb-2">
          <span className="h-[1px] w-8 bg-[#D4AF37]/50" />
          <span className="text-xs font-serif italic">Wedding Schedule</span>
          <span className="h-[1px] w-8 bg-[#D4AF37]/50" />
        </div>

        <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#3E2B1E] mb-8">
          Event Timeline
        </h3>

        {/* Central Vertical Timeline */}
        <div className="relative w-full max-w-lg my-4">
          {/* Central Vertical Gold Line */}
          <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20 -translate-x-1/2" />

          {/* SINGLE TRAVELING FLOWER BUTTON ON SCROLL */}
          <motion.div
            className="absolute left-1/2 z-20 w-10 h-10 -ml-5 -mt-5 rounded-full bg-[#FAF6EE] border-2 border-[#D4AF37] shadow-xl flex items-center justify-center text-[#B8860B] text-sm pointer-events-none"
            style={{
              top: travelingTop,
            }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
              ❀
            </motion.span>
          </motion.div>

          {/* Timeline Event List */}
          <div className="space-y-12">
            {displayEvents.map((evt, idx) => (
              <motion.div
                key={evt.id || idx}
                className="relative flex items-center justify-between gap-4"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Time (Left side) */}
                <div className="w-5/12 text-right pr-4 font-serif font-bold text-base md:text-xl text-[#3E2B1E]">
                  {evt.time}
                </div>

                {/* Subtle Gold Dot Indicator on Line */}
                <div className="relative z-10 w-3.5 h-3.5 rounded-full bg-[#D4AF37] border-2 border-[#FAF6EE] shadow-sm shrink-0" />

                {/* Event Details (Right side) */}
                <div className="w-5/12 text-left pl-4">
                  <h4 className="font-serif font-bold text-base md:text-xl text-[#2C1D11]">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-[#7C624E] font-serif mt-1 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
