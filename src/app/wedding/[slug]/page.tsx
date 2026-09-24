'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { THEMES } from '@/lib/themes';
import { DICTIONARIES } from '@/lib/dictionary';
import { LanguageCode, ThemeId, WeddingData } from '@/lib/types';
import { storage } from '@/lib/storage';
import { DEMO_WEDDINGS } from '@/lib/demo-data';


import { LoadingScreen } from '@/components/LoadingScreen';
import { EnvelopeOpening } from '@/components/EnvelopeOpening';
import { ParticleEffects } from '@/components/ParticleEffects';
import { WeddingHero } from '@/components/WeddingHero';
import { Countdown } from '@/components/Countdown';
import { WeddingCalendar } from '@/components/WeddingCalendar';
import { ScratchReveal } from '@/components/ScratchReveal';
import { EraseReveal } from '@/components/EraseReveal';
import { TapFlowers } from '@/components/TapFlowers';
import { SurpriseGift } from '@/components/SurpriseGift';
import { CandleInteraction } from '@/components/CandleInteraction';
import { HeartCounter } from '@/components/HeartCounter';
import { CoupleSection } from '@/components/CoupleSection';
import { FamilySection } from '@/components/FamilySection';
import { VenueMap } from '@/components/VenueMap';
import { RSVPSection } from '@/components/RSVPSection';
import { GuestWishes } from '@/components/GuestWishes';
import { ShareQRCodeModal } from '@/components/ShareQRCodeModal';

import { Globe, Palette, Heart, Sparkles, Film } from 'lucide-react';

export default function WeddingPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'ayesha-riswan';

  const initialData = DEMO_WEDDINGS[0];
  const [wedding, setWedding] = useState<WeddingData>(initialData);
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(initialData.theme || 'romantic-red');
  const [currentLang, setCurrentLang] = useState<LanguageCode>(initialData.language || 'en');
  const [showEnvelope, setShowEnvelope] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = storage.getWeddingBySlug(slug) || storage.getWeddings()[0] || DEMO_WEDDINGS[0];
      if (data) {
        setWedding(data);
        setCurrentThemeId(data.theme || 'romantic-red');
        setCurrentLang(data.language || 'en');
      }
    }
  }, [slug]);

  const theme = THEMES[currentThemeId] || THEMES['romantic-red'];
  const dict = DICTIONARIES[currentLang] || DICTIONARIES['en'];
  const fullUrl = typeof window !== 'undefined' ? window.location.href : `https://wedding-invitations.com/wedding/${slug}`;

  return (
    <div className={`min-h-screen bg-gradient-to-b ${theme.bgGradient} font-serif text-stone-100 selection:bg-rose-500 selection:text-white relative`}>
      {/* Gold Envelope Left & Right Door Opening Overlay */}
      <EnvelopeOpening
        isOpen={showEnvelope}
        coupleNames={`${wedding.couple.brideName} & ${wedding.couple.groomName}`}
        onClose={() => setShowEnvelope(false)}
      />
      {/* Floating Particles Engine */}
      <ParticleEffects effects={wedding.effects} particleColor={theme.particleColor} />

      {/* Floating Share & QR Code Modal Button */}
      <ShareQRCodeModal weddingUrl={fullUrl} coupleNames={`${wedding.couple.brideName} & ${wedding.couple.groomName}`} />

      {/* Top Floating Controls Bar */}
      <div className="sticky top-0 z-30 bg-stone-950/75 backdrop-blur-md border-b border-amber-400/20 py-2.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-xs tracking-wider">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span className="hidden sm:inline">
            {wedding.couple.brideName.split(' ')[0]} & {wedding.couple.groomName.split(' ')[0]}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="flex items-center gap-1 bg-stone-900 border border-amber-400/30 rounded-full px-2 py-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            {(['en', 'si', 'ta'] as LanguageCode[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setCurrentLang(lang)}
                className={`px-2 py-0.5 rounded-full uppercase font-bold text-[10px] transition-colors ${
                  currentLang === lang ? 'bg-amber-400 text-stone-950' : 'text-stone-300 hover:text-white'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Theme Quick Switcher dropdown */}
          <div className="flex items-center gap-1 bg-stone-900 border border-amber-400/30 rounded-full px-2 py-1 text-xs">
            <Palette className="w-3.5 h-3.5 text-rose-400" />
            <select
              value={currentThemeId}
              onChange={(e) => setCurrentThemeId(e.target.value as ThemeId)}
              className="bg-transparent text-amber-200 text-xs font-semibold focus:outline-none cursor-pointer"
            >
              {Object.values(THEMES).map((t) => (
                <option key={t.id} value={t.id} className="bg-stone-900 text-stone-100">
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Hero Invitation Screen */}
      <WeddingHero wedding={wedding} theme={theme} dict={dict} />

      {/* Countdown Section */}
      <Countdown targetDate={wedding.couple.weddingDate} targetTime={wedding.couple.weddingTime} theme={theme} dict={dict} />



      {/* Interactive Secret Experiences & Mini-Games */}
      <div className="my-16 px-4">
        <div className="text-center mb-8 max-w-md mx-auto bg-stone-900/90 border border-[#D4AF37]/40 p-6 rounded-3xl backdrop-blur-md shadow-lg">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Interactive Surprises</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#FCEEAC] drop-shadow-md">Unlock Secret Messages</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 max-w-md mx-auto">
          {wedding.interactiveFeatures.scratchCard && (
            <ScratchReveal
              title="Scratch to Reveal Save the Date 🗓️"
              hiddenMessage={`🗓️ December 13, 2026\n⏰ 04:30 PM`}
            />
          )}
          {wedding.interactiveFeatures.eraseCard && <EraseReveal />}
          {wedding.interactiveFeatures.heartCounter && <HeartCounter weddingId={wedding.id} initialCount={wedding.heartCount} />}
        </div>
      </div>


      {/* Couple Bios & Family */}
      <CoupleSection couple={wedding.couple} theme={theme} dict={dict} />
      <FamilySection family={wedding.family} theme={theme} dict={dict} />

      {/* Venue Google Maps */}
      <VenueMap
        locationName={wedding.couple.locationName}
        venueAddress={wedding.couple.venueAddress}
        googleMapsUrl={wedding.couple.googleMapsUrl}
        theme={theme}
        dict={dict}
      />

      {/* RSVP Section */}
      {wedding.rsvpSettings.enabled && (
        <RSVPSection
          weddingId={wedding.id}
          coupleNames={`${wedding.couple.brideName} & ${wedding.couple.groomName}`}
          brideWhatsApp={wedding.couple.brideWhatsApp}
          foodOptions={wedding.rsvpSettings.foodOptions}
          deadline={wedding.rsvpSettings.deadline}
          theme={theme}
          dict={dict}
        />
      )}

      {/* Guest Wishes Wall */}
      {wedding.wishesEnabled && (
        <GuestWishes
          weddingId={wedding.id}
          wishes={wedding.guestWishes}
          coupleNames={`${wedding.couple.brideName} & ${wedding.couple.groomName}`}
          brideWhatsApp={wedding.couple.brideWhatsApp}
          theme={theme}
          dict={dict}
        />
      )}

      {/* Footer */}
      <footer className="mt-20 py-16 border-t border-[#D4AF37]/30 text-center text-[#5C4332] bg-[#F5ECE0]/90 backdrop-blur-md flex flex-col items-center">
        <div className="w-40 mb-4 opacity-80 flex flex-col items-center">
          <div className="w-0.5 h-10 bg-gradient-to-b from-transparent to-[#D4AF37]" />
          <div className="p-3 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 shadow-md">
            <Sparkles className="w-6 h-6 text-[#B8860B] animate-pulse" />
          </div>
        </div>

        <p className="font-cursive text-3xl md:text-5xl text-[#3E2B1E] mb-2 font-normal">
          We Look Forward to Seeing You
        </p>

        <p className="font-serif text-sm font-bold text-[#B8860B] my-2">
          {wedding.couple.brideName} & {wedding.couple.groomName}
        </p>

        <p className="text-[11px] font-serif text-[#7C624E] mt-4">
          © 2026 Made with ❤️ for a beautiful wedding.
        </p>
      </footer>
    </div>
  );
}
