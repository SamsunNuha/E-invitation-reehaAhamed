'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GalleryItem, ThemeConfig } from '@/lib/types';
import { Dictionary } from '@/lib/dictionary';

interface PhotoGalleryProps {
  gallery: GalleryItem[];
  theme: ThemeConfig;
  dict: Dictionary;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ gallery, theme, dict }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!gallery || gallery.length === 0) return null;

  const categories = ['all', 'couple', 'prewedding', 'engagement', 'family', 'childhood'];

  const filteredItems =
    activeCategory === 'all'
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-20 px-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs font-semibold tracking-wider uppercase mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Gallery</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold font-serif text-amber-100">{dict.photoGallery}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4" />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 capitalize ${
              activeCategory === cat
                ? 'bg-amber-400 text-stone-950 font-bold shadow-lg shadow-amber-500/30 scale-105'
                : 'bg-stone-900/80 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id || idx}
            onClick={() => setLightboxIndex(idx)}
            className="group relative aspect-[4/3] rounded-3xl overflow-hidden border border-amber-400/20 shadow-xl cursor-pointer bg-stone-900"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ y: -6 }}
          >
            <img
              src={item.url}
              alt={item.caption}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
              <p className="text-amber-100 font-serif font-bold text-sm">{item.caption}</p>
              <span className="text-[10px] text-amber-400 uppercase tracking-widest mt-1">
                {item.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white z-50 border border-stone-700"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white z-50 border border-stone-700"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white z-50 border border-stone-700"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div
              className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredItems[lightboxIndex].url}
                alt={filteredItems[lightboxIndex].caption}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-amber-400/30"
              />
              <p className="text-amber-100 font-serif font-bold text-lg mt-4 text-center">
                {filteredItems[lightboxIndex].caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
