import React, { useState } from 'react';
import { Sparkles, Moon, Volume2 } from 'lucide-react';

interface PrologueCurtainProps {
  senderName: string;
  recipientName: string;
  onEnter: () => void;
}

export const PrologueCurtain: React.FC<PrologueCurtainProps> = ({
  senderName,
  recipientName,
  onEnter,
}) => {
  const [isFading, setIsFading] = useState(false);

  const handleStart = () => {
    setIsFading(true);
    setTimeout(() => {
      onEnter();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#050711] transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background glow and subtle star dust */}
      <div className="absolute inset-0 bg-radial from-violet-950/30 via-transparent to-[#050711]" />
      
      <div className="relative z-10 max-w-lg mx-auto px-6 text-center">
        {/* Soft floating emblem */}
        <div className="w-16 h-16 mx-auto mb-8 rounded-full bg-gradient-to-tr from-amber-500/20 to-rose-500/20 border border-amber-200/30 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.15)] animate-float-slow">
          <Moon className="w-7 h-7 text-amber-200" />
        </div>

        {/* Quiet unboxed metadata */}
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 mb-3">
          <span>From {senderName}</span>
          <span aria-hidden="true">·</span>
          <span>For {recipientName}'s Birthday</span>
          <span aria-hidden="true">·</span>
          <span>13 November</span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif-dreamy font-normal text-white mb-4 leading-tight">
          A secret sky for unspoken thoughts.
        </h1>

        <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed mb-8 max-w-md mx-auto">
          Happy Birthday, {recipientName}. I wanted to create a little world that represents the quiet curiosity, warmth, and growing fondness I feel when we talk.
        </p>

        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleStart}
            className="group relative px-8 py-3.5 rounded-full text-sm font-medium tracking-wide text-slate-900 bg-gradient-to-r from-amber-200 via-rose-100 to-amber-100 hover:from-amber-100 hover:to-rose-50 transition-all duration-300 shadow-[0_0_25px_rgba(251,191,36,0.25)] hover:shadow-[0_0_35px_rgba(251,191,36,0.4)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <span>Step Inside</span>
              <Sparkles className="w-4 h-4 text-rose-600 transition-transform group-hover:rotate-12" />
            </span>
          </button>

          <p className="text-xs text-slate-400/90 flex items-center gap-1.5 mt-2">
            <Volume2 className="w-3.5 h-3.5 text-amber-300/80" />
            <span>Best experienced with sound on</span>
          </p>
        </div>
      </div>
    </div>
  );
};
