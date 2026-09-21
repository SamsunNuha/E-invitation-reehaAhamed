'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shirt, Sparkles } from 'lucide-react';
import { DressCodeConfig, ThemeConfig } from '@/lib/types';
import { Dictionary } from '@/lib/dictionary';

interface ProgramDressMenuProps {
  dressCode?: DressCodeConfig;
  theme: ThemeConfig;
  dict: Dictionary;
}

export const ProgramDressMenu: React.FC<ProgramDressMenuProps> = ({
  dressCode = {
    gentlemen: 'Well-tailored suits or tuxedos with classic dress shoes are preferred.',
    ladies: 'Formal dresses in elegant, polished styles are encouraged.',
    note: 'We kindly invite you to dress in elegant attire that reflects the style and spirit of our special day.',
  },
  theme,
  dict,
}) => {
  const colorSwatches = [
    { name: 'Emerald', hex: '#2D5A38' },
    { name: 'Burgundy', hex: '#4A2830' },
    { name: 'Soft Blush', hex: '#D3B6B0' },
    { name: 'Champagne', hex: '#E8D9C3' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-16 px-4">
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
          <span className="text-xs font-serif italic">Dress Code</span>
          <span className="h-[1px] w-8 bg-[#D4AF37]/50" />
        </div>

        <h3 className="text-3xl md:text-5xl font-cursive font-normal text-[#3E2B1E] mb-4">
          Dress Code
        </h3>

        {/* Fashion Illustration Graphic */}
        <div className="w-full max-w-md h-44 my-4 rounded-2xl overflow-hidden border border-[#D4AF37]/30 shadow-md relative bg-stone-900">
          <img
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
            alt="Dress code attire"
            className="w-full h-full object-cover filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3E2B1E]/80 via-transparent to-transparent flex items-end justify-center p-3">
            <span className="text-xs text-[#F3E5AB] font-serif italic">Elegant Formal Attire</span>
          </div>
        </div>

        {/* Note / Guidance */}
        <p className="text-xs md:text-sm text-[#5C4332] font-serif italic max-w-md leading-relaxed my-4">
          "{dressCode.note || 'We kindly invite you to dress in elegant attire that reflects the style and spirit of our special day.'}"
        </p>

        {/* Color Palette Swatches */}
        <div className="my-6">
          <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#B8860B] font-serif mb-3">
            Color Palette
          </div>
          <div className="flex items-center justify-center gap-4">
            {colorSwatches.map((swatch, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1.5 group">
                <div
                  className="w-9 h-9 rounded-full shadow-lg border-2 border-white/80 group-hover:scale-110 transition-transform cursor-pointer"
                  style={{ backgroundColor: swatch.hex }}
                />
                <span className="text-[10px] text-[#7C624E] font-serif">{swatch.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ladies & Gentlemen Requirements */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4 text-left">
          <div className="p-4 rounded-2xl bg-[#F5ECE0] border border-[#D4AF37]/30">
            <h4 className="text-base font-cursive text-[#3E2B1E] mb-1 font-bold">Ladies</h4>
            <p className="text-xs text-[#5C4332] font-serif leading-relaxed">{dressCode.ladies}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F5ECE0] border border-[#D4AF37]/30">
            <h4 className="text-base font-cursive text-[#3E2B1E] mb-1 font-bold">Gentlemen</h4>
            <p className="text-xs text-[#5C4332] font-serif leading-relaxed">{dressCode.gentlemen}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
