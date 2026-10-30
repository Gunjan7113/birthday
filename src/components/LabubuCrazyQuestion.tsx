import React, { useState, useRef } from 'react';
import { Sparkles, Heart, Check, PartyPopper, Smile, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { romanticAudio } from '../utils/audioEngine.ts';

interface LabubuCrazyQuestionProps {
  senderName: string;
  recipientName: string;
}

// Custom SVG Component rendering the adorable Labubu monster with big ears and signature mischievous smile
const LabubuCutie: React.FC<{
  pose?: 'love' | 'mischief' | 'party' | 'shy';
  className?: string;
  isDancing?: boolean;
}> = ({ pose = 'love', className = 'w-28 h-36', isDancing = false }) => {
  return (
    <div
      className={`relative inline-block transition-transform duration-300 ${
        isDancing ? 'animate-[bounce_1.5s_infinite]' : 'hover:scale-105'
      } ${className}`}
    >
      <svg
        viewBox="0 0 160 210"
        className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
      >
        <defs>
          <linearGradient id="labubuFur" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f7d0b5" />
            <stop offset="50%" stopColor="#e8b596" />
            <stop offset="100%" stopColor="#c88e6e" />
          </linearGradient>
          <linearGradient id="earInner" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffaab8" />
            <stop offset="100%" stopColor="#f48698" />
          </linearGradient>
          <radialGradient id="cheekGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff4d6d" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ff4d6d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Tall Bunny-like Monster Ears */}
        {/* Left Ear */}
        <g className="animate-[wiggle_3s_ease-in-out_infinite] origin-bottom">
          <path
            d="M 52 85 C 38 45, 28 8, 48 4 C 64 2, 70 38, 68 85 Z"
            fill="url(#labubuFur)"
            stroke="#9d6447"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M 52 75 C 44 48, 38 20, 48 14 C 58 10, 63 38, 62 75 Z"
            fill="url(#earInner)"
          />
        </g>

        {/* Right Ear */}
        <g className="animate-[wiggle_2.6s_ease-in-out_infinite_reverse] origin-bottom">
          <path
            d="M 108 85 C 122 45, 132 8, 112 4 C 96 2, 90 38, 92 85 Z"
            fill="url(#labubuFur)"
            stroke="#9d6447"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path
            d="M 108 75 C 116 48, 122 20, 112 14 C 102 10, 97 38, 98 75 Z"
            fill="url(#earInner)"
          />
        </g>

        {/* Fluffy Body */}
        <ellipse
          cx="80"
          cy="150"
          rx="44"
          ry="40"
          fill="url(#labubuFur)"
          stroke="#9d6447"
          strokeWidth="3.5"
        />

        {/* Soft Belly Patch */}
        <ellipse
          cx="80"
          cy="152"
          rx="28"
          ry="24"
          fill="#ffeedd"
          opacity="0.9"
        />

        {/* Cute Monster Head */}
        <ellipse
          cx="80"
          cy="100"
          rx="48"
          ry="42"
          fill="url(#labubuFur)"
          stroke="#9d6447"
          strokeWidth="3.5"
        />

        {/* Big Curious Labubu Eyes */}
        <ellipse cx="60" cy="94" rx="10" ry="12" fill="#1e1b18" />
        <ellipse cx="100" cy="94" rx="10" ry="12" fill="#1e1b18" />

        {/* Eye Sparkles */}
        <circle cx="58" cy="90" r="3.5" fill="#ffffff" />
        <circle cx="63" cy="97" r="1.5" fill="#ffffff" />
        <circle cx="98" cy="90" r="3.5" fill="#ffffff" />
        <circle cx="103" cy="97" r="1.5" fill="#ffffff" />

        {/* Rosy Blushing Cheeks */}
        <circle cx="48" cy="106" r="10" fill="url(#cheekGlow)" />
        <circle cx="112" cy="106" r="10" fill="url(#cheekGlow)" />

        {/* Tiny Button Nose */}
        <ellipse cx="80" cy="100" rx="3.5" ry="2.5" fill="#6c3b28" />

        {/* Signature Labubu Monster Grin with Pointed Teeth */}
        <g>
          {/* Mouth cavity */}
          <path
            d="M 54 108 Q 80 134 106 108 Z"
            fill="#7b1123"
            stroke="#9d6447"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Characteristic Pointed Teeth */}
          <polygon points="58,108 61,115 64,108" fill="#ffffff" />
          <polygon points="65,108 68,116 71,108" fill="#ffffff" />
          <polygon points="72,108 75,117 78,108" fill="#ffffff" />
          <polygon points="79,108 82,117 85,108" fill="#ffffff" />
          <polygon points="86,108 89,116 92,108" fill="#ffffff" />
          <polygon points="93,108 96,115 99,108" fill="#ffffff" />
          <polygon points="100,108 103,114 105,108" fill="#ffffff" />

          {/* Lower Cute Teeth */}
          <polygon points="68,124 71,118 74,125" fill="#ffffff" />
          <polygon points="76,126 80,119 84,126" fill="#ffffff" />
          <polygon points="86,125 89,118 92,124" fill="#ffffff" />
        </g>

        {/* Little Paws */}
        {pose === 'love' && (
          <g>
            {/* Holding Big Sparkling Red Heart */}
            <path
              d="M 80 148 C 65 130 50 142 65 160 L 80 174 L 95 160 C 110 142 95 130 80 148 Z"
              fill="#e11d48"
              stroke="#ffe4e6"
              strokeWidth="2"
              className="animate-pulse"
            />
            {/* Left Paw */}
            <circle cx="56" cy="152" r="9" fill="url(#labubuFur)" stroke="#9d6447" strokeWidth="2.5" />
            {/* Right Paw */}
            <circle cx="104" cy="152" r="9" fill="url(#labubuFur)" stroke="#9d6447" strokeWidth="2.5" />
          </g>
        )}

        {pose === 'party' && (
          <g>
            {/* Party Hat */}
            <polygon points="80,50 68,75 92,75" fill="#f59e0b" stroke="#78350f" strokeWidth="2" />
            <circle cx="80" cy="48" r="4" fill="#ec4899" />
            {/* Cheering Paws up */}
            <ellipse cx="44" cy="120" rx="9" ry="8" fill="url(#labubuFur)" stroke="#9d6447" strokeWidth="2.5" />
            <ellipse cx="116" cy="120" rx="9" ry="8" fill="url(#labubuFur)" stroke="#9d6447" strokeWidth="2.5" />
          </g>
        )}

        {pose === 'mischief' && (
          <g>
            {/* Waving Paw */}
            <ellipse cx="42" cy="115" rx="10" ry="8" fill="url(#labubuFur)" stroke="#9d6447" strokeWidth="2.5" />
            <ellipse cx="118" cy="138" rx="8" ry="8" fill="url(#labubuFur)" stroke="#9d6447" strokeWidth="2.5" />
          </g>
        )}

        {/* Little Feet */}
        <ellipse cx="62" cy="188" rx="14" ry="9" fill="url(#labubuFur)" stroke="#9d6447" strokeWidth="3" />
        <ellipse cx="98" cy="188" rx="14" ry="9" fill="url(#labubuFur)" stroke="#9d6447" strokeWidth="3" />
      </svg>
    </div>
  );
};

export const LabubuCrazyQuestion: React.FC<LabubuCrazyQuestionProps> = ({
  senderName,
  recipientName,
}) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const [noButtonTextIndex, setNoButtonTextIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const playfulNoTexts = [
    "No 🙈",
    "Wait, no! 🏃‍♂️💨",
    "Are you crazy Cheku?! 🤪",
    "Error 404: 'No' not found! ❌",
    "Nice try Mahhhhh Chekuuuuu! 😜",
    "You love me too much! 🧸💖",
    "Button broken, only YES works! 🚨",
    "Catch me if you can! 💨",
    "Nope! You're stuck with Gunjan! 😈",
    "Cheku pleaseee, you know you want to! 🥺",
  ];

  const handleDodging = () => {
    romanticAudio.playStarChime((dodgeCount % 5) + 1);

    // Random offset inside bounded container
    const randomX = (Math.random() - 0.5) * 320;
    const randomY = (Math.random() - 0.5) * 200;

    setNoPosition({ x: randomX, y: randomY });
    setDodgeCount((prev) => prev + 1);
    setNoButtonTextIndex((prev) => (prev + 1) % playfulNoTexts.length);
  };

  const handleAcceptYes = (e: React.MouseEvent<HTMLButtonElement>, intensity: 'yes' | 'definite') => {
    setIsAccepted(true);
    romanticAudio.playHeartPulse();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    // Spectacular celebration burst!
    confetti({
      particleCount: intensity === 'definite' ? 90 : 50,
      spread: 100,
      origin: { x, y },
      colors: ['#f43f5e', '#fbbf24', '#fbcfe8', '#38bdf8', '#ffffff', '#e11d48'],
      scalar: 1.1,
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 120,
        origin: { x: 0.5, y: 0.4 },
        colors: ['#ff4d6d', '#ffd166', '#06d6a0', '#118ab2'],
      });
    }, 300);
  };

  const handleExtraConfetti = () => {
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#f43f5e', '#fbbf24', '#ffffff'],
    });
  };

  return (
    <section
      id="future-vibes"
      className="relative py-24 px-6 lg:px-12 border-t border-rose-500/20 bg-gradient-to-b from-[#090b1a] via-[#150f24] to-[#080711] overflow-hidden"
    >
      {/* Background starlight & soft romantic ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-amber-400/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Playful Floating Labubu Friends on top */}
        <div className="flex items-end justify-center gap-6 sm:gap-12 mb-6">
          <div className="hidden sm:block transform -rotate-6">
            <LabubuCutie pose="shy" className="w-20 h-28 opacity-80" />
          </div>
          <div className="transform hover:rotate-3 transition-transform">
            <LabubuCutie pose={isAccepted ? 'party' : 'love'} className="w-28 h-36" isDancing={isAccepted} />
          </div>
          <div className="hidden sm:block transform rotate-6">
            <LabubuCutie pose="mischief" className="w-20 h-28 opacity-80" />
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-rose-300 font-semibold px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 mb-4 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>Top Secret Question · Signature Required</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-dreamy font-normal text-white mb-4 leading-tight">
            {recipientName}, do you wanna spend your future & all your crazy, goofy time with me?
          </h2>

          <p className="text-sm md:text-base text-rose-200/80 font-light leading-relaxed max-w-xl mx-auto">
            Before answering, please read the fine print: signing up includes infinite laughing attacks, listening to {senderName} talk forever, stealing all your food, tight hugs, and zero returns!
          </p>
        </div>

        {/* Interactive Play Area Card */}
        <div
          ref={containerRef}
          className="relative max-w-2xl mx-auto rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.03] border-2 border-rose-400/30 p-8 md:p-12 text-center backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] min-h-[380px] flex flex-col justify-center items-center overflow-hidden"
        >
          {!isAccepted ? (
            /* Question Phase with Options */
            <div className="w-full relative">
              <div className="flex items-center justify-center gap-2 text-xs text-amber-200/90 font-mono mb-6">
                <Smile className="w-4 h-4 text-rose-400" />
                <span>Choose your answer wisely, Mahhhhh Chekuuuuu:</span>
              </div>

              {/* Dodge Counter if Cheku tried to click No */}
              {dodgeCount > 0 && (
                <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-mono animate-bounce">
                  <span>Cheku tried to say No {dodgeCount} times! 😂 (You know you love me!)</span>
                </div>
              )}

              {/* The 3 Buttons: YES, DEFINITELY YES, and RUNAWAY NO */}
              <div className="flex flex-wrap items-center justify-center gap-4 relative min-h-[140px] pt-4">
                {/* 1. YES OPTION */}
                <button
                  onClick={(e) => handleAcceptYes(e, 'yes')}
                  className="px-7 py-4 rounded-full text-sm md:text-base font-semibold bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white shadow-[0_0_25px_rgba(244,63,94,0.4)] hover:shadow-[0_0_35px_rgba(244,63,94,0.6)] transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 shrink-0 z-20"
                >
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>YES! 💖</span>
                </button>

                {/* 2. DEFINITELY YES OPTION */}
                <button
                  onClick={(e) => handleAcceptYes(e, 'definite')}
                  className="px-8 py-4 rounded-full text-sm md:text-base font-bold bg-gradient-to-r from-amber-400 via-rose-400 to-amber-300 hover:from-amber-300 hover:to-rose-300 text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)] transition-all transform hover:scale-110 active:scale-95 cursor-pointer flex items-center gap-2 shrink-0 z-20 border-2 border-white/40"
                >
                  <Sparkles className="w-5 h-5 text-slate-950 animate-spin" />
                  <span>DEFINITELY YES!! 1000% 🥰✨</span>
                </button>

                {/* 3. THE RUNAWAY NO BUTTON (Escapes on hover or touch!) */}
                <div
                  style={{
                    transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                    transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                  className="z-30"
                >
                  <button
                    onMouseEnter={handleDodging}
                    onTouchStart={handleDodging}
                    onClick={handleDodging}
                    className="px-5 py-3 rounded-full text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-600/50 shadow-md cursor-pointer transition-colors whitespace-nowrap select-none"
                  >
                    <span>{playfulNoTexts[noButtonTextIndex]}</span>
                  </button>
                </div>
              </div>

              {/* Playful footer hint */}
              <div className="mt-8 text-xs text-slate-400 font-light flex items-center justify-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400/80" />
                <span>Notice: The "No" button is experiencing extreme technical difficulties.</span>
              </div>
            </div>
          ) : (
            /* Celebration Phase! Once Cheku accepts */
            <div className="w-full text-center py-4 animate-in zoom-in-95 fade-in duration-500">
              <div className="mb-4 flex items-center justify-center gap-3">
                <PartyPopper className="w-8 h-8 text-amber-300 animate-bounce" />
                <span className="text-3xl md:text-4xl font-serif-dreamy font-bold text-amber-200">
                  I KNEW IT!! YOU'RE MINE FOREVER! 🎉🧸💖
                </span>
                <PartyPopper className="w-8 h-8 text-amber-300 animate-bounce" />
              </div>

              <p className="text-lg md:text-xl font-serif-dreamy text-rose-100 max-w-lg mx-auto mb-6 leading-relaxed">
                Contract officially sealed in the starlight for {recipientName}! You are officially stuck with {senderName} for all your future adventures, late-night chats, and pure craziness.
              </p>

              {/* Official Agreement Clauses */}
              <div className="p-5 rounded-2xl bg-black/30 border border-rose-300/30 text-left max-w-md mx-auto mb-6 space-y-2 text-xs md:text-sm text-slate-200 font-mono">
                <div className="flex items-center gap-2 text-emerald-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Unlimited laughter & goofy voice notes</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Being Gunjan's favorite person 24/7</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Safe harbor through every mood & silence</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Strict NO REFUND & NO ESCAPE policy 😈💖</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleExtraConfetti}
                  className="px-6 py-3 rounded-full text-xs font-semibold bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Pinky Promise Sealed Forever 🤙</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
