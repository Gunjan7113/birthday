import React, { useState } from 'react';
import { Mail, Compass, Heart, Sparkles } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine.ts';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  senderName: string;
  recipientName: string;
  heroHeadline: string;
  heroSubtitle: string;
  onOpenLetterClick: () => void;
  onOpenPromisesPage?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  senderName,
  recipientName,
  heroHeadline,
  heroSubtitle,
  onOpenLetterClick,
  onOpenPromisesPage,
}) => {
  const [heartCount, setHeartCount] = useState(1);
  const [isSparkling, setIsSparkling] = useState(false);

  const handleSendHeart = (e: React.MouseEvent<HTMLButtonElement>) => {
    setHeartCount(prev => prev + 1);
    romanticAudio.playHeartPulse();
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 500);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 16,
      spread: 60,
      origin: { x, y },
      colors: ['#f43f5e', '#fbbf24', '#fda4af', '#fef08a'],
      disableForReducedMotion: true,
      scalar: 0.8,
    });
  };

  return (
    <section id="top" className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Subtle unboxed metadata */}
        <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-medium tracking-wider text-amber-200/90 mb-5">
          <span className="text-rose-400">✦ Birthday Special ✦</span>
          <span aria-hidden="true">·</span>
          <span>From {senderName} to {recipientName}</span>
          <span aria-hidden="true">·</span>
          <span>13 November</span>
        </div>

        {/* Hero headline with balanced wrap */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-dreamy font-normal tracking-tight text-white mb-6 leading-[1.12]"
          style={{ textWrap: 'balance' }}
        >
          {heroHeadline}
        </h1>

        {/* Hero lead prose */}
        <p 
          className="text-base sm:text-lg md:text-xl text-slate-300/90 font-light leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ textWrap: 'balance' }}
        >
          {heroSubtitle}
        </p>

        {/* Call to action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            onClick={onOpenLetterClick}
            className="px-7 py-3.5 rounded-full text-sm font-medium bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white shadow-[0_0_25px_rgba(244,63,94,0.35)] hover:shadow-[0_0_35px_rgba(244,63,94,0.5)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Unfold Birthday Letter</span>
          </button>

          <a
            href="#moons"
            className="px-6 py-3.5 rounded-full text-sm font-medium bg-amber-400/15 hover:bg-amber-400/25 text-amber-200 border border-amber-300/30 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Our Birthday Moons</span>
          </a>

          {onOpenPromisesPage && (
            <button
              onClick={onOpenPromisesPage}
              className="px-6 py-3.5 rounded-full text-sm font-medium bg-rose-500/15 hover:bg-rose-500/25 text-rose-200 border border-rose-400/30 transition-all flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer shadow-[0_0_20px_rgba(244,63,94,0.15)]"
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400/30" />
              <span>Our Promises & Story</span>
              <span className="text-[10px] bg-rose-500/20 px-1.5 py-0.5 rounded text-rose-200 font-mono">8 Slides</span>
            </button>
          )}

          <a
            href="#constellation"
            className="px-6 py-3.5 rounded-full text-sm font-medium bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/10 transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Compass className="w-4 h-4 text-slate-400" />
            <span>The Constellation</span>
          </a>
        </div>

        {/* Interactive Playful Touch: Send Warmth / Heartbeat */}
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
          <span className="text-xs text-slate-400 font-light">
            {recipientName}, tap here to send a heartbeat:
          </span>
          <button
            onClick={handleSendHeart}
            className={`p-1.5 rounded-full bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 hover:scale-110 active:scale-95 transition-all cursor-pointer ${
              isSparkling ? 'animate-ping' : ''
            }`}
            title="Send warmth"
          >
            <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
          </button>
          <span className="text-xs font-mono tabular-nums text-amber-200/90 font-medium">
            {heartCount} {heartCount === 1 ? 'warm thought' : 'warm thoughts'}
          </span>
        </div>
      </div>
    </section>
  );
};
