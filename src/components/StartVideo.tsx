'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles, ChevronRight } from 'lucide-react';

interface StartVideoProps {
  videoUrl?: string;
  coupleNames?: string;
  onComplete?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const StartVideo: React.FC<StartVideoProps> = ({
  videoUrl = '/vdo.mp4',
  coupleNames = 'Ayesha & Rizwan',
  onComplete,
  isOpen = true,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isFlapOpening, setIsFlapOpening] = useState(false);
  const [isSealExploding, setIsSealExploding] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isClosedInternal, setIsClosedInternal] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsClosedInternal(false);
      setHasStarted(false);
      setIsFlapOpening(false);
      setIsSealExploding(false);
      setIsPlaying(false);
    }
  }, [isOpen]);

  const handleStartVideo = () => {
    if (isSealExploding || isFlapOpening) return;

    // Phase 1: Wax seal light burst
    setIsSealExploding(true);

    // Phase 2: Slow Cinematic 4-Slice 3D Flap Unfolding
    setTimeout(() => {
      setIsFlapOpening(true);
    }, 500);

    // Phase 3: Start 4K Video Playback beneath
    setTimeout(() => {
      setHasStarted(true);
      setIsVideoLoading(true);

      // Safety timeout: dismiss spinner after 2.5 seconds max
      const loadingTimeout = setTimeout(() => {
        setIsVideoLoading(false);
      }, 2500);

      // Safety timeout: if video file is missing or fails to play, complete transition smoothly
      setTimeout(() => {
        if (!videoRef.current || videoRef.current.paused) {
          setIsVideoLoading(false);
          handleFinish();
        }
      }, 4500);

      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = false;
        setIsMuted(false);
        videoRef.current
          .play()
          .then(() => {
            clearTimeout(loadingTimeout);
            setIsPlaying(true);
            setIsVideoLoading(false);
          })
          .catch(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current
                .play()
                .then(() => {
                  clearTimeout(loadingTimeout);
                  setIsPlaying(true);
                  setIsVideoLoading(false);
                })
                .catch(() => {
                  clearTimeout(loadingTimeout);
                  setIsVideoLoading(false);
                  handleFinish();
                });
            } else {
              clearTimeout(loadingTimeout);
              setIsVideoLoading(false);
              handleFinish();
            }
          });
      } else {
        clearTimeout(loadingTimeout);
        setIsVideoLoading(false);
        handleFinish();
      }
    }, 1400);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration > 0) {
      // Auto-finish threshold to avoid TikTok end card
      const endThreshold = Math.max(0, videoRef.current.duration - 1.8);
      if (videoRef.current.currentTime >= endThreshold) {
        videoRef.current.pause();
        handleFinish();
      }
    }
  };

  const handleFinish = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsClosedInternal(true);
      if (onComplete) onComplete();
      if (onClose) onClose();
      setIsFadingOut(false);
    }, 700);
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
      className={`fixed inset-0 z-50 bg-stone-950 flex items-center justify-center transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* 4K Container */}
      <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center overflow-hidden shadow-2xl bg-stone-950">
        
        {/* ---------------------------------------------------- */}
        {/* 3D 4-SLICE ENVELOPE OPENING LAYER                    */}
        {/* ---------------------------------------------------- */}
        {(!hasStarted || isFlapOpening) && (
          <div
            onClick={handleStartVideo}
            className={`absolute inset-0 z-30 flex items-center justify-center [perspective:1200px] bg-stone-950 pointer-events-auto cursor-pointer transition-opacity duration-[1500ms] ${
              isFlapOpening && hasStarted ? 'opacity-0 pointer-events-none delay-[3200ms]' : 'opacity-100'
            }`}
          >
            {/* TOP SLICE FLAP */}
            <div
              className={`absolute inset-0 transition-all duration-[3500ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
                isFlapOpening
                  ? '[transform:rotateX(-135deg)_translateZ(150px)_scale(1.12)] opacity-0'
                  : '[transform:rotateX(0deg)] opacity-100'
              }`}
              style={{ clipPath: 'polygon(0% 0%, 100% 0%, 50% 50%)' }}
            >
              <img
                src="/gold_envelope.jpg"
                alt="Top Flap Slice"
                className="w-full h-full object-contain pointer-events-none filter brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-amber-400/10 via-transparent to-black/50 pointer-events-none" />
            </div>

            {/* BOTTOM SLICE FLAP */}
            <div
              className={`absolute inset-0 transition-all duration-[3500ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom ${
                isFlapOpening
                  ? '[transform:rotateX(135deg)_translateZ(150px)_scale(1.12)] opacity-0'
                  : '[transform:rotateX(0deg)] opacity-100'
              }`}
              style={{ clipPath: 'polygon(100% 100%, 0% 100%, 50% 50%)' }}
            >
              <img
                src="/gold_envelope.jpg"
                alt="Bottom Flap Slice"
                className="w-full h-full object-contain pointer-events-none filter brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-400/10 via-transparent to-black/50 pointer-events-none" />
            </div>

            {/* LEFT SLICE FLAP */}
            <div
              className={`absolute inset-0 transition-all duration-[3500ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${
                isFlapOpening
                  ? '[transform:rotateY(-135deg)_translateZ(150px)_scale(1.12)] opacity-0'
                  : '[transform:rotateY(0deg)] opacity-100'
              }`}
              style={{ clipPath: 'polygon(0% 100%, 0% 0%, 50% 50%)' }}
            >
              <img
                src="/gold_envelope.jpg"
                alt="Left Flap Slice"
                className="w-full h-full object-contain pointer-events-none filter brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 via-transparent to-black/50 pointer-events-none" />
            </div>

            {/* RIGHT SLICE FLAP */}
            <div
              className={`absolute inset-0 transition-all duration-[3500ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-right ${
                isFlapOpening
                  ? '[transform:rotateY(135deg)_translateZ(150px)_scale(1.12)] opacity-0'
                  : '[transform:rotateY(0deg)] opacity-100'
              }`}
              style={{ clipPath: 'polygon(100% 0%, 100% 100%, 50% 50%)' }}
            >
              <img
                src="/gold_envelope.jpg"
                alt="Right Flap Slice"
                className="w-full h-full object-contain pointer-events-none filter brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-amber-400/10 via-transparent to-black/50 pointer-events-none" />
            </div>

            {/* TOP COUPLE BADGE HEADER */}
            <div className="absolute top-6 z-40 flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-amber-400/50 text-amber-200 text-xs font-serif font-bold backdrop-blur-md shadow-xl pointer-events-none">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{coupleNames}</span>
            </div>

            {/* CENTER BUTTERFLY WAX SEAL BUTTON WITH INNER LIGHT SCROLL */}
            {!isFlapOpening && (
              <div className="absolute z-40 flex flex-col items-center gap-4 text-center my-auto transition-transform duration-500">
                <button
                  onClick={handleStartVideo}
                  aria-label="Open Invitation Envelope"
                  className={`group relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-600 via-amber-300 to-amber-500 border-2 border-amber-200 text-stone-950 animate-gold-pulse overflow-hidden cursor-pointer hover:scale-110 active:scale-95 transition-all duration-300 ${
                    isSealExploding ? 'scale-150 opacity-0 transition-all duration-500' : ''
                  }`}
                >
                  {/* INNER BUTTON LIGHT SCROLL EFFECT */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-100/90 to-transparent w-full h-full animate-light-scroll pointer-events-none" />

                  {/* Gold Wax Seal Outer Crest */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-stone-950 font-serif">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-stone-950 ml-0.5 group-hover:scale-110 transition-transform drop-shadow" />
                    <span className="text-[9px] font-extrabold uppercase tracking-widest mt-0.5 text-stone-950 drop-shadow-sm">
                      OPEN
                    </span>
                  </div>
                </button>

                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-200 drop-shadow-lg tracking-wide">
                    Tap Butterfly Seal to Open 🎬
                  </h3>
                  <p className="text-xs text-amber-100/90 drop-shadow-md font-serif">
                    Experience our 3D 4K celebration opening
                  </p>
                </div>
              </div>
            )}
            {/* EXPLOSION & PARTICLE BURST TRANSITION EFFECT (Seconds 5-8) */}
            {isSealExploding && (
              <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
                {/* Outward Radial Warm Light Burst */}
                <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-rose-400 opacity-90 filter blur-3xl animate-ping" />
                <div className="absolute inset-0 bg-gradient-radial from-amber-200/40 via-transparent to-transparent animate-pulse" />

                {/* Flying 3D Hearts & Golden Sparkles Radial Burst */}
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-xl sm:text-2xl select-none animate-ping"
                    style={{
                      transform: `rotate(${i * 12}deg) translate(${Math.random() * 200 + 80}px) scale(${Math.random() * 1.5 + 0.8})`,
                      transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                      opacity: 0.9,
                    }}
                  >
                    {['✨', '💛', '💖', '❄️', '⭐', '🌸'][i % 6]}
                  </div>
                ))}
              </div>
            )}

            {/* Cover screen envelope click handler */}
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* LOADING SPINNER INDICATOR                            */}
        {/* ---------------------------------------------------- */}
        {isVideoLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/80 backdrop-blur-sm z-25 pointer-events-none gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
            <div className="flex items-center gap-2 text-amber-200 text-xs font-serif tracking-widest uppercase animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Loading 4K Video...</span>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* WATERMARK MASK BADGE (Royal Olive Emblem)            */}
        {/* ---------------------------------------------------- */}
        {hasStarted && (
          <div className="absolute left-[2%] sm:left-[5%] top-[46%] -translate-y-1/2 z-20 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl bg-[#525C45] border border-[#768564]/60 shadow-2xl backdrop-blur-md flex items-center gap-2 text-[#FCEEAC] pointer-events-none">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-serif font-bold tracking-wider whitespace-nowrap drop-shadow-md">
              Ayesha & Rizwan
            </span>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* VIDEO ELEMENT (4K Native Aspect Ratio View)          */}
        {/* ---------------------------------------------------- */}
        <video
          ref={videoRef}
          playsInline
          preload="auto"
          onCanPlay={() => setIsVideoLoading(false)}
          onPlaying={() => setIsVideoLoading(false)}
          onWaiting={() => setIsVideoLoading(true)}
          onError={() => {
            console.log('Video load error or file missing');
            setIsVideoLoading(false);
            handleFinish();
          }}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleFinish}
          onClick={togglePlay}
          className="w-full h-full object-contain bg-stone-950 transition-transform duration-500 cursor-pointer"
        >
          <source src={videoUrl} type="video/mp4" />
          <source src="/vdo.mp4" type="video/mp4" />
          <source src="/VDO.mp4" type="video/mp4" />
        </video>

        {/* Side Vignette Shadows */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10" />

        {/* Top Controls Bar */}
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none flex items-start justify-between p-6 z-10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="text-amber-200 font-serif text-sm tracking-wider font-semibold drop-shadow-md">
              {coupleNames}
            </span>
          </div>

          <button
            onClick={handleFinish}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-amber-400/40 text-amber-200 text-xs font-semibold backdrop-blur-md hover:bg-amber-400 hover:text-stone-950 transition-all shadow-lg pointer-events-auto"
          >
            <span>Skip Intro</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Controls Bar */}
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none flex items-end justify-between p-6 z-10">
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

          <button
            onClick={handleFinish}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 text-xs font-extrabold tracking-wider uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 pointer-events-auto"
          >
            <span>Enter Invitation</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
