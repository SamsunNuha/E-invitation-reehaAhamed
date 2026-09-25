'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles, X } from 'lucide-react';

interface StartVideoProps {
  videoUrl?: string;
  coupleNames?: string;
  onComplete?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const StartVideo: React.FC<StartVideoProps> = ({
  videoUrl = '/vdo.mp4',
  coupleNames = 'Reeha & Ahamed',
  onComplete,
  isOpen = true,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isClosedInternal, setIsClosedInternal] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [showTapToPlay, setShowTapToPlay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsClosedInternal(false);
      setIsFadingOut(false);
      setIsVideoLoading(true);
      setShowTapToPlay(false);

      // Attempt immediate video playback
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.muted = false;
          setIsMuted(false);
          videoRef.current
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsVideoLoading(false);
              setShowTapToPlay(false);
            })
            .catch(() => {
              // Fallback to muted playback or show tap button
              if (videoRef.current) {
                videoRef.current.muted = true;
                setIsMuted(true);
                videoRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                    setIsVideoLoading(false);
                    setShowTapToPlay(false);
                  })
                  .catch(() => {
                    setIsVideoLoading(false);
                    setShowTapToPlay(true);
                  });
              } else {
                setIsVideoLoading(false);
                setShowTapToPlay(true);
              }
            });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration > 0) {
      // Auto-finish threshold to avoid end card
      const endThreshold = Math.max(0, videoRef.current.duration - 1.8);
      if (videoRef.current.currentTime >= endThreshold) {
        videoRef.current.pause();
        handleFinish();
      }
    }
  };

  const handleFinish = () => {
    setIsFadingOut(true);
    // Dispatch background music play event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('play-wedding-music'));
    }
    setTimeout(() => {
      setIsClosedInternal(true);
      if (onComplete) onComplete();
      if (onClose) onClose();
      setIsFadingOut(false);
    }, 500);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowTapToPlay(false);
        })
        .catch((err) => console.log('Play error:', err));
    }
  };

  const toggleSound = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);

    if (!isPlaying) {
      videoRef.current.play().then(() => setIsPlaying(true));
    }
  };

  if (!isOpen || isClosedInternal) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-stone-950 flex items-center justify-center transition-all duration-500 ${
        isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* 4K Container */}
      <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center overflow-hidden shadow-2xl bg-stone-950">
        
        {/* ---------------------------------------------------- */}
        {/* LOADING SPINNER                                     */}
        {/* ---------------------------------------------------- */}
        {isVideoLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950 z-25 pointer-events-none gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
            <div className="flex items-center gap-2 text-amber-200 text-xs font-serif tracking-widest uppercase animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Loading Video...</span>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TAP TO PLAY OVERLAY (IF AUTOPLAY BLOCKED)            */}
        {/* ---------------------------------------------------- */}
        {showTapToPlay && (
          <div 
            onClick={togglePlay}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-stone-950/70 backdrop-blur-xs cursor-pointer gap-4 text-center p-6"
          >
            <button className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-500 border-2 border-amber-200 text-stone-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform">
              <Play className="w-10 h-10 fill-stone-950 ml-1" />
            </button>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-200 drop-shadow-md">
              Tap to Watch Opening Video 🎬
            </h3>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* DIRECT VIDEO PLAYER (vdo.mp4)                        */}
        {/* ---------------------------------------------------- */}
        <video
          ref={videoRef}
          playsInline
          preload="auto"
          autoPlay
          onCanPlay={() => setIsVideoLoading(false)}
          onPlaying={() => {
            setIsVideoLoading(false);
            setShowTapToPlay(false);
            setIsPlaying(true);
          }}
          onWaiting={() => setIsVideoLoading(true)}
          onError={() => {
            console.log('Video load error or file missing');
            setIsVideoLoading(false);
            handleFinish();
          }}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleFinish}
          onClick={togglePlay}
          className="w-full h-full object-cover bg-stone-950 transition-transform duration-500 cursor-pointer"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src="/vdo.mp4" type="video/mp4" />
          <source src="/VDO.mp4" type="video/mp4" />
        </video>

        {/* Side Vignette Shadows */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/70 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/70 to-transparent pointer-events-none z-10" />

        {/* Top Controls Bar */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none flex items-start justify-start p-6 z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="text-amber-200 font-serif text-sm tracking-wider font-semibold drop-shadow-md">
              {coupleNames}
            </span>
          </div>
        </div>

        {/* Bottom Controls Bar */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none flex items-end justify-start p-6 z-10">
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-stone-900/80 border border-amber-400/30 text-amber-300 backdrop-blur-md hover:bg-amber-400 hover:text-stone-950 transition-all shadow-md"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={toggleSound}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-900/80 border border-amber-400/30 text-amber-300 backdrop-blur-md hover:bg-amber-400 hover:text-stone-950 transition-all text-xs font-semibold shadow-md"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-rose-400" />
                  <span>Unmute</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Sound: On</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
