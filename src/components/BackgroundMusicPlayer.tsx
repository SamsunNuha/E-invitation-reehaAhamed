'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

interface BackgroundMusicPlayerProps {
  audioUrl?: string;
  musicTitle?: string;
}

export const BackgroundMusicPlayer: React.FC<BackgroundMusicPlayerProps> = ({
  audioUrl = '/vdo.mp4',
  musicTitle = 'Wedding Background Nasheed & Melodic Theme',
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.7;

    const playAudio = () => {
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log('Autoplay blocked by browser until user gesture:', err);
          });
      }
    };

    // Try playing immediately
    playAudio();

    // Play audio as soon as ANY user gesture occurs anywhere on page
    const handleUserGesture = () => {
      playAudio();
    };

    const events = ['click', 'touchstart', 'pointerdown', 'mousedown', 'keydown'];
    events.forEach((evt) => {
      window.addEventListener(evt, handleUserGesture, { capture: true });
    });

    // Custom event listener for external components (like StartVideo)
    const handleCustomPlay = () => {
      playAudio();
    };
    window.addEventListener('play-wedding-music', handleCustomPlay);

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleUserGesture, { capture: true });
      });
      window.removeEventListener('play-wedding-music', handleCustomPlay);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => console.log('Audio playback error:', e));
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2">
      {/* Background Audio Element */}
      <audio ref={audioRef} src={audioUrl} preload="auto" />

      {/* Floating Gold Vinyl Disk Music Player Button */}
      <motion.div
        onClick={togglePlay}
        className="group relative flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#2E050D]/95 border-2 border-[#D4AF37]/70 text-[#FCEEAC] shadow-[0_10px_30px_rgba(212,175,55,0.4)] backdrop-blur-xl cursor-pointer hover:scale-105 active:scale-95 transition-all"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {/* Rotating Music Disc Icon */}
        <div className="relative flex items-center justify-center">
          <div
            className={`w-9 h-9 rounded-full bg-gradient-to-tr from-[#B8860B] via-[#FCEEAC] to-[#D4AF37] border border-[#FCEEAC] flex items-center justify-center text-[#1F0307] shadow-md ${
              isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
            }`}
          >
            <Music className="w-4 h-4 text-[#1F0307]" />
          </div>

          {isPlaying && (
            <motion.div
              className="absolute -top-1 -right-1 text-xs"
              animate={{ y: [-2, -8, -2], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            >
              🎵
            </motion.div>
          )}
        </div>

        {/* Music Title & Play/Pause Label */}
        <div className="flex flex-col text-left pr-1">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
            <span>Background Music</span>
          </div>
          <span className="text-xs font-serif font-bold text-[#FFF8ED] whitespace-nowrap">
            {isPlaying ? 'Playing Music 🎶' : 'Tap to Play Music 🎼'}
          </span>
        </div>

        {/* Mute/Unmute Toggle Button */}
        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 text-[#FCEEAC] transition-colors ml-1"
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#D4AF37]" />
          )}
        </button>
      </motion.div>
    </div>
  );
};
