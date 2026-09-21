import { ThemeConfig } from './themes';
export type { ThemeConfig };

export type PackageTier = 'basic' | 'premium' | 'luxury';

export type ThemeId =
  | 'romantic-red'
  | 'elegant-pink'
  | 'royal-purple'
  | 'royal-blue'
  | 'luxury-gold'
  | 'elegant-white'
  | 'black-luxury'
  | 'floral'
  | 'green-garden'
  | 'traditional';

export type LanguageCode = 'en' | 'si' | 'ta';

export interface CoupleInfo {
  brideName: string;
  groomName: string;
  bridePhoto: string;
  groomPhoto: string;
  couplePhoto: string;
  brideBio: string;
  groomBio: string;
  brideParents: string;
  groomParents: string;
  weddingDate: string; // YYYY-MM-DD
  weddingTime: string; // e.g. "04:30 PM"
  locationName: string;
  venueAddress: string;
  googleMapsUrl: string;
  invitationMessage: string;
  brideWhatsApp: string;
  groomWhatsApp: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  mapUrl?: string;
  image?: string;
}

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface FamilyMember {
  id: string;
  title: string;
  names: string;
  relation: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'couple' | 'engagement' | 'prewedding' | 'family' | 'childhood';
}

export interface ProgramItem {
  id: string;
  time: string;
  event: string;
}

export interface DressCodeConfig {
  gentlemen: string;
  ladies: string;
  note?: string;
}

export interface MenuItem {
  category: string;
  items: string[];
}

export interface RSVPResponse {
  id: string;
  guestName: string;
  count: number;
  attending: boolean;
  foodPreference?: string;
  message?: string;
  date: string;
}

export interface GuestWish {
  id: string;
  guestName: string;
  message: string;
  reaction?: string;
  approved: boolean;
  createdAt: string;
}

export interface EffectsConfig {
  rosePetals: boolean;
  cherryBlossoms: boolean;
  hearts: boolean;
  sparkles: boolean;
  confetti: boolean;
}

export interface InteractiveFeaturesConfig {
  scratchCard: boolean;
  eraseCard: boolean;
  tapFlowers: boolean;
  surpriseGift: boolean;
  candle: boolean;
  heartCounter: boolean;
}

export interface WeddingData {
  id: string;
  slug: string;
  status: 'published' | 'draft';
  createdAt: string;
  packageTier: PackageTier;
  couple: CoupleInfo;
  theme: ThemeId;
  language: LanguageCode;
  darkMode: boolean;
  music: {
    title: string;
    url: string;
    enabled: boolean;
  };
  effects: EffectsConfig;
  interactiveFeatures: InteractiveFeaturesConfig;
  events: WeddingEvent[];
  loveStory: StoryMilestone[];
  family: FamilyMember[];
  gallery: GalleryItem[];
  program: ProgramItem[];
  dressCode: DressCodeConfig;
  menu: MenuItem[];
  rsvpSettings: {
    enabled: boolean;
    deadline: string;
    allowFoodPreference: boolean;
    foodOptions: string[];
  };
  wishesEnabled: boolean;
  rsvps: RSVPResponse[];
  guestWishes: GuestWish[];
  heartCount: number;
}
