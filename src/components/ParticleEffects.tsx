'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EffectsConfig } from '@/lib/types';

interface ParticleEffectsProps {
  effects: EffectsConfig;
  particleColor?: string;
}

interface FloatingItem {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  icon: string;
}

export const ParticleEffects: React.FC<ParticleEffectsProps> = ({ effects, particleColor = '#F43F5E' }) => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const newItems: FloatingItem[] = [];
    const count = 25;

    const icons: string[] = [];
    if (effects.rosePetals) icons.push('🌸', '🌹');
    if (effects.cherryBlossoms) icons.push('🌸', '🌺');
    if (effects.sparkles) icons.push('✨', '⭐');

    if (icons.length === 0) return;

    for (let i = 0; i < count; i++) {
      newItems.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 1.2 + 0.8,
        duration: Math.random() * 10 + 8,
        delay: Math.random() * 10,
        icon: icons[Math.floor(Math.random() * icons.length)],
      });
    }

    setItems(newItems);
  }, [effects]);

  if (items.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-xl md:text-2xl select-none"
          style={{ left: `${item.x}%` }}
          initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '110vh',
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 180, 360],
            x: [`${item.x}%`, `${item.x + (Math.sin(item.id) * 8)}%`],
          }}
          transition={{
            duration: item.duration,
            repeat: 0,
            delay: item.delay,
            ease: 'linear',
          }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
};
