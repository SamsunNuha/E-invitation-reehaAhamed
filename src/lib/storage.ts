import { WeddingData, RSVPResponse, GuestWish } from './types';
import { DEMO_WEDDINGS } from './demo-data';

const STORAGE_KEY = 'wedding_platform_weddings_v3';

export const storage = {
  getWeddings: (): WeddingData[] => {
    if (typeof window === 'undefined') {
      return DEMO_WEDDINGS;
    }
    try {
      // Always use fresh demo data to reflect any name/data changes
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_WEDDINGS));
      return DEMO_WEDDINGS;
    } catch (e) {
      console.error('Failed to read from storage:', e);
      return DEMO_WEDDINGS;
    }
  },

  getWeddingBySlug: (slug: string): WeddingData | undefined => {
    const weddings = storage.getWeddings();
    return weddings.find((w) => w.slug.toLowerCase() === slug.toLowerCase());
  },

  getWeddingById: (id: string): WeddingData | undefined => {
    const weddings = storage.getWeddings();
    return weddings.find((w) => w.id === id);
  },

  saveWedding: (wedding: WeddingData): void => {
    if (typeof window === 'undefined') return;
    const weddings = storage.getWeddings();
    const index = weddings.findIndex((w) => w.id === wedding.id);
    if (index >= 0) {
      weddings[index] = wedding;
    } else {
      weddings.push(wedding);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weddings));
  },

  deleteWedding: (id: string): void => {
    if (typeof window === 'undefined') return;
    const weddings = storage.getWeddings().filter((w) => w.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(weddings));
  },

  addRSVP: (weddingId: string, rsvp: Omit<RSVPResponse, 'id' | 'date'>): RSVPResponse => {
    const wedding = storage.getWeddingById(weddingId);
    if (!wedding) throw new Error('Wedding not found');

    const newRsvp: RSVPResponse = {
      ...rsvp,
      id: `r-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };

    wedding.rsvps.push(newRsvp);
    storage.saveWedding(wedding);
    return newRsvp;
  },

  addGuestWish: (weddingId: string, wish: Omit<GuestWish, 'id' | 'approved' | 'createdAt'>): GuestWish => {
    const wedding = storage.getWeddingById(weddingId);
    if (!wedding) throw new Error('Wedding not found');

    const newWish: GuestWish = {
      ...wish,
      id: `w-${Date.now()}`,
      approved: true, // auto approve for demo
      createdAt: new Date().toISOString().split('T')[0],
    };

    wedding.guestWishes.push(newWish);
    storage.saveWedding(wedding);
    return newWish;
  },

  incrementHeartCount: (weddingId: string): number => {
    const wedding = storage.getWeddingById(weddingId);
    if (!wedding) return 0;
    wedding.heartCount = (wedding.heartCount || 0) + 1;
    storage.saveWedding(wedding);
    return wedding.heartCount;
  },
};
