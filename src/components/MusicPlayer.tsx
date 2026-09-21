'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

interface MusicPlayerProps {
  title?: string;
  url?: string;
  enabled?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  title = 'Wedding Serenade',
  url = 'https://assets.mixkit.co/music/preview/mixkit-romantic-wedding-piano-107.mp3',
  enabled = true,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!enabled || !url) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;
  }, [enabled, url]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Autoplay blocked', e));
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  if (!enabled || !url) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <audio ref={audioRef} src={url} loop preload="auto" />

      <motion.div
        className="flex items-center gap-2 p-2 pr-4 rounded-full bg-stone-950/80 border border-amber-400/40 text-amber-200 shadow-2xl backdrop-blur-xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-rose-500 text-stone-950 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-stone-950 text-stone-950" />
          ) : (
            <Play className="w-5 h-5 fill-stone-950 text-stone-950 ml-0.5" />
          )}
        </button>

        {/* Animated Sound Waves / Title */}
        <div className="hidden md:flex flex-col text-xs font-medium">
          <div className="flex items-center gap-1.5 font-semibold text-amber-100 max-w-[140px] truncate">
            <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce text-amber-400' : 'text-stone-400'}`} />
            <span>{title}</span>
          </div>
          <span className="text-[10px] text-stone-400">{isPlaying ? 'Playing Romantic Music' : 'Tap to Play Music'}</span>
        </div>

        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full hover:bg-stone-800 text-amber-300 transition-colors ml-1"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </motion.div>
    </div>
  );
};
