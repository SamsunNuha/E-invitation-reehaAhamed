'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ThemeConfig } from '@/lib/types';
import { Dictionary } from '@/lib/dictionary';

interface RSVPSectionProps {
  weddingId: string;
  coupleNames: string;
  brideWhatsApp?: string;
  groomWhatsApp?: string;
  foodOptions?: string[];
  deadline?: string;
  theme: ThemeConfig;
  dict: Dictionary;
}

const DEFAULT_MESSAGE = `💐 Assalamu Alaikum Reeha & Ahamed!

Wishing you both a lifetime filled with love, laughter, and endless happiness on your beautiful journey together! 

May Allah bless your union and fill your home with joy, peace, and prosperity. 

Congratulations! 🌹✨`;

export const RSVPSection: React.FC<RSVPSectionProps> = ({
  coupleNames,
  brideWhatsApp = '94771234567',
}) => {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;

    try {
      confetti({
        particleCount: 140,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F3E5AB', '#B8860B', '#FFF8DC', '#FFFFFF', '#FFB6C1'],
      });
    } catch {}

    const cleanNumber = brideWhatsApp.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="w-full max-w-xl mx-auto my-20 px-4">
      <motion.div
        className="relative rounded-3xl overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{
          background: 'linear-gradient(145deg, #4A0A14 0%, #2E050D 60%, #1F0307 100%)',
          border: '2px solid rgba(212,175,55,0.6)',
          boxShadow: '0 30px 70px rgba(0,0,0,0.6), 0 8px 20px rgba(212,175,55,0.2)',
        }}
      >
        {/* Decorative top gold line */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, #F3E5AB, #D4AF37, transparent)' }}
        />

        {/* Glowing ambient orbs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #B8860B 0%, transparent 70%)' }} />

        <div className="relative p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            {/* Floating heart icon */}
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #8C6A0F)' }}
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-8 h-8 fill-white text-white" />
            </motion.div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-[#FCEEAC] text-[11px] font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Send Warm Wishes</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#FCEEAC] mb-1 drop-shadow-md">
              Send a Greeting 💌
            </h3>
            <p className="text-xs text-[#D4AF37] font-serif mt-1">
              Your message will be sent directly to the bride on WhatsApp
            </p>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 mb-7">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span className="text-[#D4AF37] text-lg">✦</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </div>

          {/* Message Box */}
          <div className="relative mb-6">
            <label className="block text-[10px] font-bold text-[#FCEEAC] uppercase tracking-widest mb-2 ml-1">
              Your Greeting Message
            </label>
            <div className="relative">
              <textarea
                rows={8}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl text-[#FFF8ED] text-sm leading-relaxed resize-none focus:outline-none transition-all"
                style={{
                  background: 'rgba(31,3,7,0.85)',
                  border: '1.5px solid rgba(212,175,55,0.5)',
                  boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
                  fontFamily: 'Georgia, serif',
                }}
                onFocus={(e) => {
                  e.target.style.border = '1.5px solid rgba(212,175,55,0.9)';
                  e.target.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.3), 0 0 0 3px rgba(212,175,55,0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1.5px solid rgba(212,175,55,0.5)';
                  e.target.style.boxShadow = 'inset 0 2px 8px rgba(0,0,0,0.3)';
                }}
              />
              {/* Character hint */}
              <div className="absolute bottom-3 right-4 text-[10px] text-[#D4AF37]/80">
                {message.length} chars
              </div>
            </div>
          </div>

          {/* WhatsApp Send Button */}
          <motion.button
            onClick={handleSend}
            disabled={!message.trim()}
            className="w-full py-4 rounded-2xl font-bold text-sm text-white shadow-xl flex items-center justify-center gap-3 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: sent
                ? 'linear-gradient(135deg, #16a34a, #15803d)'
                : 'linear-gradient(135deg, #25D366, #128C7E)',
              boxShadow: '0 8px 25px rgba(37,211,102,0.35)',
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 12px 35px rgba(37,211,102,0.45)' }}
            whileTap={{ scale: 0.98 }}
          >
            {/* WhatsApp shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
            />

            {sent ? (
              <>
                <Heart className="w-5 h-5 fill-white text-white" />
                <span>Message Sent! Opening WhatsApp... 💚</span>
              </>
            ) : (
              <>
                {/* WhatsApp SVG Icon */}
                <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>Send Greeting on WhatsApp 💬</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>

          {/* Footer note */}
          <p className="text-center text-[10px] text-[#A08978] mt-4 font-serif">
            Clicking will open WhatsApp with your message ready to send 🕊️
          </p>

          {/* Bottom decorative line */}
          <div className="flex items-center gap-3 mt-6">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
            <span className="text-[#D4AF37] text-sm">💍</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
          </div>
        </div>

        {/* Decorative bottom gold line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, #F3E5AB, #D4AF37, transparent)' }}
        />
      </motion.div>
    </div>
  );
};
