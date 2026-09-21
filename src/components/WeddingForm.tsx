'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Plus, Trash2, Sparkles, Heart } from 'lucide-react';
import { WeddingData, ThemeId, PackageTier, LanguageCode } from '@/lib/types';
import { THEMES } from '@/lib/themes';
import { storage } from '@/lib/storage';

interface WeddingFormProps {
  initialData?: WeddingData;
  isEdit?: boolean;
}

export const WeddingForm: React.FC<WeddingFormProps> = ({ initialData, isEdit = false }) => {
  const router = useRouter();

  const [formData, setFormData] = useState<WeddingData>(
    initialData || {
      id: `w-${Date.now()}`,
      slug: `couple-${Date.now().toString().slice(-4)}`,
      status: 'published',
      createdAt: new Date().toISOString(),
      packageTier: 'luxury',
      theme: 'romantic-red',
      language: 'en',
      darkMode: true,
      couple: {
        brideName: 'Nethmi Perera',
        groomName: 'Ahan Fernando',
        bridePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
        couplePhoto: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
        brideBio: 'Loving bride biography...',
        groomBio: 'Gentle groom biography...',
        brideParents: 'Daughter of Mr. & Mrs. Perera',
        groomParents: 'Son of Mr. & Mrs. Fernando',
        weddingDate: '2026-11-26',
        weddingTime: '04:30 PM',
        locationName: 'Shangri-La Ballroom, Colombo',
        venueAddress: '1 Galle Face, Colombo',
        googleMapsUrl: 'https://maps.google.com/?q=Shangri-La+Colombo',
        invitationMessage: 'Together with their families, request the pleasure of your company...',
        brideWhatsApp: '94771234567',
        groomWhatsApp: '94777654321',
      },
      music: {
        title: 'A Thousand Years Piano',
        url: 'https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-piano-107.mp3',
        enabled: true,
      },
      effects: {
        rosePetals: true,
        cherryBlossoms: false,
        hearts: true,
        sparkles: true,
        confetti: true,
      },
      interactiveFeatures: {
        scratchCard: true,
        eraseCard: true,
        tapFlowers: true,
        surpriseGift: true,
        candle: true,
        heartCounter: true,
      },
      events: [
        {
          id: 'e-1',
          title: 'Wedding Ceremony',
          date: '2026-11-26',
          time: '04:30 PM',
          venue: 'Shangri-La Ballroom',
          description: 'Sacred wedding ceremony & traditional customs.',
        },
      ],
      loveStory: [
        { id: 's-1', year: '2020', title: 'First Meeting', description: 'Met at university final exams.' },
      ],
      family: [],
      gallery: [
        { id: 'g-1', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80', caption: 'Pre-wedding photoshoot', category: 'couple' },
      ],
      program: [],
      dressCode: { gentlemen: 'Formal Suit / Tuxedo', ladies: 'Saree / Evening Gown' },
      menu: [],
      rsvpSettings: { enabled: true, deadline: '2026-11-10', allowFoodPreference: true, foodOptions: ['Meat / Chicken', 'Vegetarian', 'Seafood'] },
      wishesEnabled: true,
      rsvps: [],
      guestWishes: [],
      heartCount: 25,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slug.trim()) return alert('Please enter a valid URL slug!');
    storage.saveWedding(formData);
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-amber-400/20 pb-6 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin')}
            className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-amber-300 hover:bg-stone-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-serif text-white">
              {isEdit ? 'Edit Wedding Invitation' : 'Create New Wedding Invitation'}
            </h1>
            <p className="text-xs text-stone-400">Configure couple details, theme, interactive features, and events</p>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 text-stone-950 font-bold text-xs shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Wedding</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Basic Information & URL */}
        <div className="p-6 rounded-3xl bg-stone-900/80 border border-amber-400/20 space-y-4">
          <h2 className="text-lg font-bold font-serif text-amber-300 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Basic Settings & URL Slug
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">URL Slug *</label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="ashan-nethmi"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-100 text-sm focus:border-amber-400"
              />
              <span className="text-[10px] text-stone-500">URL: /wedding/{formData.slug}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Package Tier</label>
              <select
                value={formData.packageTier}
                onChange={(e) => setFormData({ ...formData, packageTier: e.target.value as PackageTier })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-100 text-sm focus:border-amber-400 capitalize"
              >
                <option value="basic">Basic Tier</option>
                <option value="premium">Premium Tier</option>
                <option value="luxury">Luxury Tier</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Theme Selection</label>
              <select
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value as ThemeId })}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-100 text-sm focus:border-amber-400"
              >
                {Object.values(THEMES).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Couple & Ceremony Details */}
        <div className="p-6 rounded-3xl bg-stone-900/80 border border-rose-400/20 space-y-4">
          <h2 className="text-lg font-bold font-serif text-rose-300 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            Bride & Groom Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Bride Name *</label>
              <input
                type="text"
                required
                value={formData.couple.brideName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    couple: { ...formData.couple, brideName: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Groom Name *</label>
              <input
                type="text"
                required
                value={formData.couple.groomName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    couple: { ...formData.couple, groomName: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Wedding Date (YYYY-MM-DD) *</label>
              <input
                type="date"
                required
                value={formData.couple.weddingDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    couple: { ...formData.couple, weddingDate: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Wedding Time *</label>
              <input
                type="text"
                required
                value={formData.couple.weddingTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    couple: { ...formData.couple, weddingTime: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Venue Location Name *</label>
              <input
                type="text"
                required
                value={formData.couple.locationName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    couple: { ...formData.couple, locationName: e.target.value },
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-100 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">Bride WhatsApp Number *</label>
              <input
                type="text"
                required
                value={formData.couple.brideWhatsApp}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    couple: { ...formData.couple, brideWhatsApp: e.target.value },
                  })
                }
                placeholder="94771234567"
                className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-100 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="p-6 rounded-3xl bg-stone-900/80 border border-amber-400/20 space-y-4">
          <h2 className="text-lg font-bold font-serif text-amber-300">Interactive Feature Toggles</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            {Object.keys(formData.interactiveFeatures).map((key) => {
              const featKey = key as keyof typeof formData.interactiveFeatures;
              return (
                <label key={key} className="flex items-center gap-2 p-3 rounded-xl bg-stone-950 border border-stone-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.interactiveFeatures[featKey]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        interactiveFeatures: {
                          ...formData.interactiveFeatures,
                          [featKey]: e.target.checked,
                        },
                      })
                    }
                    className="rounded text-amber-400 focus:ring-amber-400"
                  />
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                </label>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
};
