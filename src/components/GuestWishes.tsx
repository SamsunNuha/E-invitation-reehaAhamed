'use client';

import React from 'react';
import { GuestWish, ThemeConfig } from '@/lib/types';
import { Dictionary } from '@/lib/dictionary';

interface GuestWishesProps {
  weddingId: string;
  wishes: GuestWish[];
  coupleNames: string;
  brideWhatsApp?: string;
  theme: ThemeConfig;
  dict: Dictionary;
}

export const GuestWishes: React.FC<GuestWishesProps> = () => {
  return null;
};
