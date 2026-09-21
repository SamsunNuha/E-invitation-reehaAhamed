'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, MapPin } from 'lucide-react';

export const LoveStoryTimeline: React.FC = () => {
  const events = [
    {
      id: '1',
      title: 'Mehendi Night 🌿✨',
      date: 'May 18, 2027',
      time: '06:00 PM',
      venue: 'Shangri-La Garden Lawn, Colombo',
      description: 'An evening filled with henna art, traditional music, dancing, and joyous celebrations with family and friends.',
      image: '/mehendi.png',
    },
    {
      id: '2',
      title: 'Wedding Day (Nikah) 💍👰‍♀️',
      date: 'june 19, 2027',
      time: '04:30 PM',
      venue: 'Lee Meredian Banquet Hall (Main Hall), Colombo',
      description: 'The sacred wedding ceremony and Nikah solemnization of our union surrounded by our beloved family.',
      image: '/nikah.png',
    },
    {
      id: '3',
      title: 'Waleema Reception 🎉🥂',
      date: 'june 20, 2027',
      time: '07:00 PM',
      venue: 'Grand Ballroom, Shangri-La Colombo',
      description: 'A grand banquet dinner feast, wedding toast, cake cutting, and evening dinner celebration.',
      image: '/waleema.png',
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-20 px-4">
      {/* Header Tag */}
      <div className="text-center mb-16 max-w-md mx-auto bg-stone-900/90 border border-[#D4AF37]/40 p-6 rounded-3xl backdrop-blur-md shadow-lg">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-wider uppercase mb-3">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>Wedding Events</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-[#FCEEAC] drop-shadow-md">
          Event Celebrations
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4" />
      </div>

      {/* 3 Event Cards with Distinct Custom Photos */}
      <div className="space-y-12">
        {events.map((evt, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={evt.id}
              className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              {/* Event Cover Photo */}
              <div className="w-full md:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl relative group bg-stone-900">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              </div>

              {/* Event Details Card */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/50 bg-stone-900/90 text-[#FCEEAC] shadow-2xl backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#FCEEAC] mb-3 drop-shadow-sm">
                    {evt.title}
                  </h3>
                  <p className="text-stone-300 leading-relaxed text-sm sm:text-base font-sans mb-6">
                    {evt.description}
                  </p>
                </div>

                {/* Event Metadata (Date, Time, Venue) */}
                <div className="pt-4 border-t border-[#D4AF37]/30 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#D4AF37]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>{evt.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>{evt.time}</span>
                  </div>

                  <div className="flex items-center gap-2 sm:col-span-2 text-stone-300">
                    <MapPin className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>{evt.venue}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
