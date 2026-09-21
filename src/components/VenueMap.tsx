'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Navigation } from 'lucide-react';
import { ThemeConfig } from '@/lib/types';
import { Dictionary } from '@/lib/dictionary';

interface VenueMapProps {
  locationName: string;
  venueAddress: string;
  googleMapsUrl: string;
  theme: ThemeConfig;
  dict: Dictionary;
}

export const VenueMap: React.FC<VenueMapProps> = ({
  locationName = 'Shangri-La Ballroom',
  venueAddress = '1 Galle Face, Colombo, Sri Lanka',
  googleMapsUrl = 'https://maps.google.com/?q=Shangri-La+Colombo',
  theme,
  dict,
}) => {
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    `${locationName} ${venueAddress}`
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="w-full max-w-2xl mx-auto my-16 px-4 space-y-12">
      {/* Venue Section (Lieu) */}
      <motion.div
        className="p-8 md:p-12 rounded-3xl bg-[#FAF6EE]/90 border border-[#D4AF37]/40 shadow-2xl backdrop-blur-md flex flex-col items-center text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Title Filigree */}
        <div className="flex items-center justify-center gap-3 text-[#B8860B] mb-2">
          <span className="h-[1px] w-8 bg-[#D4AF37]/50" />
          <span className="text-xs font-serif italic">Location</span>
          <span className="h-[1px] w-8 bg-[#D4AF37]/50" />
        </div>

        <h3 className="text-3xl md:text-5xl font-cursive font-normal text-[#3E2B1E] mb-4">
          Lieu
        </h3>

        {/* Golden Heart Map Pin */}
        <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center text-xl mb-3">
          🤎
        </div>

        <h4 className="text-xl md:text-2xl font-serif font-bold text-[#2C1D11] mb-1">{locationName}</h4>
        <p className="text-xs md:text-sm font-serif text-[#7C624E] mb-6">{venueAddress}</p>

        {/* Palace Illustration Photo */}
        <div className="w-full h-56 rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-md relative bg-stone-900">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"
            alt={locationName}
            className="w-full h-full object-cover filter brightness-95 sepia-[0.2]"
          />
        </div>
      </motion.div>

      {/* Google Maps Section (Itinéraire Google Maps) */}
      <motion.div
        className="p-8 md:p-12 rounded-3xl bg-[#FAF6EE]/90 border border-[#D4AF37]/40 shadow-2xl backdrop-blur-md flex flex-col items-center text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-center gap-3 text-[#B8860B] mb-2">
          <span className="h-[1px] w-8 bg-[#D4AF37]/50" />
          <span className="text-xs font-serif italic">Directions</span>
          <span className="h-[1px] w-8 bg-[#D4AF37]/50" />
        </div>

        <h3 className="text-2xl md:text-4xl font-cursive font-normal text-[#3E2B1E] mb-6">
          Itinéraire Google Maps
        </h3>

        {/* Map Container */}
        <div className="w-full h-64 md:h-72 rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-inner relative bg-[#FAF6EE]">
          <iframe
            title="Venue Map"
            src={embedUrl}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] text-[#3E2B1E] font-bold text-xs shadow-lg hover:scale-105 transition-transform"
          >
            <span>Open in Maps ↗</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};
