'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Eye, Copy, Edit, Trash2, Check, ExternalLink, Sparkles, Heart, Users, MessageSquare, QrCode } from 'lucide-react';
import { storage } from '@/lib/storage';
import { WeddingData } from '@/lib/types';
import { ShareQRCodeModal } from '@/components/ShareQRCodeModal';

export default function AdminDashboardPage() {
  const [weddings, setWeddings] = useState<WeddingData[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeQrModal, setActiveQrModal] = useState<{ url: string; names: string } | null>(null);

  useEffect(() => {
    setWeddings(storage.getWeddings());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this wedding invitation?')) {
      storage.deleteWedding(id);
      setWeddings(storage.getWeddings());
    }
  };

  const handleCopy = (slug: string, id: string) => {
    const url = `${window.location.origin}/wedding/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 md:p-8 font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-amber-400/20 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-serif font-bold text-lg">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Wedding Invitations Platform Business Suite</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold font-serif text-white mt-1">
            Client Wedding Dashboard
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Manage customer online wedding websites, themes, RSVPs, wishes, and packages
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            Platform Homepage
          </Link>
          <Link
            href="/admin/create"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-rose-500 text-stone-950 font-bold text-xs shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Wedding</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="p-5 rounded-2xl bg-stone-900/80 border border-amber-400/20">
          <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">Total Weddings</div>
          <div className="text-3xl font-extrabold font-serif text-white">{weddings.length}</div>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/80 border border-rose-400/20">
          <div className="text-xs text-rose-300 font-semibold uppercase tracking-wider mb-1">Total RSVPs Collected</div>
          <div className="text-3xl font-extrabold font-serif text-white">
            {weddings.reduce((acc, w) => acc + (w.rsvps?.length || 0), 0)}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/80 border border-amber-400/20">
          <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">Guest Wishes Received</div>
          <div className="text-3xl font-extrabold font-serif text-white">
            {weddings.reduce((acc, w) => acc + (w.guestWishes?.length || 0), 0)}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/80 border border-emerald-400/20">
          <div className="text-xs text-emerald-300 font-semibold uppercase tracking-wider mb-1">Total Hearts Sent</div>
          <div className="text-3xl font-extrabold font-serif text-white">
            {weddings.reduce((acc, w) => acc + (w.heartCount || 0), 0)}
          </div>
        </div>
      </div>

      {/* Weddings Table List */}
      <div className="max-w-7xl mx-auto bg-stone-900/70 border border-amber-400/20 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <h2 className="text-xl font-bold font-serif text-amber-100">All Client Wedding Invitations</h2>
          <span className="text-xs text-stone-400">Click preview or copy link to share with clients</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-300">
            <thead className="bg-stone-950 text-amber-300 text-xs font-semibold uppercase tracking-wider border-b border-stone-800">
              <tr>
                <th className="py-4 px-6">Wedding / Couple</th>
                <th className="py-4 px-6">Date & Venue</th>
                <th className="py-4 px-6">Theme & Tier</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">RSVPs</th>
                <th className="py-4 px-6 text-center">Wishes</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {weddings.map((w) => (
                <tr key={w.id} className="hover:bg-stone-800/40 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/30 overflow-hidden shrink-0">
                        <img src={w.couple.couplePhoto} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-amber-100">{w.couple.brideName} & {w.couple.groomName}</div>
                        <div className="text-xs text-stone-400 font-mono">/wedding/{w.slug}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-xs">
                    <div className="font-semibold text-stone-200">📅 {w.couple.weddingDate}</div>
                    <div className="text-stone-400 truncate max-w-[180px]">📍 {w.couple.locationName}</div>
                  </td>

                  <td className="py-4 px-6 text-xs">
                    <div className="font-semibold capitalize text-amber-300">{w.theme}</div>
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase mt-1 ${
                      w.packageTier === 'luxury' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40' :
                      w.packageTier === 'premium' ? 'bg-purple-400/20 text-purple-300 border border-purple-400/40' :
                      'bg-stone-800 text-stone-400'
                    }`}>
                      {w.packageTier}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      w.status === 'published' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/40' : 'bg-amber-500/20 text-amber-400 border border-amber-400/40'
                    }`}>
                      {w.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-center font-bold text-rose-400">
                    {w.rsvps?.length || 0}
                  </td>

                  <td className="py-4 px-6 text-center font-bold text-amber-400">
                    {w.guestWishes?.length || 0}
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/wedding/${w.slug}`}
                        target="_blank"
                        className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 transition-colors"
                        title="Preview Wedding Invitation"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleCopy(w.slug, w.id)}
                        className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 transition-colors"
                        title="Copy Invitation URL"
                      >
                        {copiedId === w.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>

                      <Link
                        href={`/admin/edit/${w.id}`}
                        className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 transition-colors"
                        title="Edit Wedding Details"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(w.id)}
                        className="p-2 rounded-lg bg-stone-800 hover:bg-rose-900/60 text-rose-400 transition-colors"
                        title="Delete Wedding"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
