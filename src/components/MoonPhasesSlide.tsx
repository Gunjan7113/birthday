import React, { useState } from 'react';
import { MoonProfile } from '../data/romanticContent.ts';
import { Sparkles, Moon, Calendar, Eye, Heart, Layers, ArrowRightLeft } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine.ts';
import confetti from 'canvas-confetti';

interface MoonPhasesSlideProps {
  dikshitMoon: MoonProfile;
  gunjanMoon: MoonProfile;
  resonanceMessage: string;
  recipientName: string;
}

export const MoonPhasesSlide: React.FC<MoonPhasesSlideProps> = ({
  dikshitMoon,
  gunjanMoon,
  resonanceMessage,
  recipientName,
}) => {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'merged'>('side-by-side');
  const [activeMoon, setActiveMoon] = useState<'dikshit' | 'gunjan'>('dikshit');
  const [blendValue, setBlendValue] = useState(50); // for merged overlay

  const handleMoonClick = (type: 'dikshit' | 'gunjan', e: React.MouseEvent) => {
    setActiveMoon(type);
    romanticAudio.playStarChime(type === 'dikshit' ? 3 : 5);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 24,
      spread: 60,
      origin: { x, y },
      colors: ['#fef08a', '#ffffff', '#cbd5e1', '#fbcfe8'],
      scalar: 0.85,
      disableForReducedMotion: true,
    });
  };

  const handleMakeWish = (e: React.MouseEvent) => {
    romanticAudio.playHeartPulse();
    romanticAudio.playStarChime(4);

    confetti({
      particleCount: 45,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#fbbf24', '#f43f5e', '#ffffff', '#e2e8f0'],
      scalar: 1,
      disableForReducedMotion: true,
    });
  };

  return (
    <section id="moons" className="relative py-24 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 mb-3">
            <Moon className="w-3.5 h-3.5 text-amber-300" />
            <span>Celestial Birthright</span>
            <span aria-hidden="true">·</span>
            <span>Two Birthdays, One Moon</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-dreamy font-normal text-white mb-4">
            The Moons We Were Born Under
          </h2>
          <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
            On the night you arrived in this world (13 November 2005) and the night I did (27 August 2007), the moon watched over both of us. Here are the exact celestial phases of our skies.
          </p>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8 p-1.5 bg-slate-900/60 rounded-full border border-white/10 max-w-xs mx-auto">
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`flex-1 py-1.5 px-4 text-xs font-medium rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'side-by-side'
                  ? 'bg-amber-300/20 text-amber-200 border border-amber-300/40 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Side by Side
            </button>
            <button
              onClick={() => setViewMode('merged')}
              className={`flex-1 py-1.5 px-4 text-xs font-medium rounded-full transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'merged'
                  ? 'bg-amber-300/20 text-amber-200 border border-amber-300/40 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Align Our Moons
            </button>
          </div>
        </div>

        {viewMode === 'side-by-side' ? (
          /* Side by Side Moon Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Dikshit's Birthday Moon */}
            <div
              onClick={(e) => handleMoonClick('dikshit', e)}
              className="relative rounded-3xl bg-gradient-to-b from-slate-900/80 via-slate-950/70 to-slate-950/90 border border-amber-300/30 p-8 flex flex-col justify-between shadow-[0_15px_50px_rgba(0,0,0,0.7)] backdrop-blur-md group cursor-pointer transition-all hover:border-amber-300/60 hover:shadow-[0_0_35px_rgba(251,191,36,0.18)]"
            >
              <div className="absolute top-5 right-5 text-amber-300/70 text-[11px] font-mono flex items-center gap-1.5 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-300/20">
                <Calendar className="w-3 h-3" />
                <span>His Birthday</span>
              </div>

              {/* Moon Visual with High Resolution Real Phase Texture */}
              <div className="relative my-6 flex justify-center">
                {/* Luminous Glow Halo */}
                <div className="absolute inset-0 rounded-full bg-slate-300/10 blur-2xl group-hover:bg-amber-300/20 transition-all duration-500 scale-90" />

                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)] bg-black">
                  <img
                    src={dikshitMoon.imagePath}
                    alt="Moon phase on 13 November 2005"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 pointer-events-none" />
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <div>
                    <h3 className="text-2xl font-serif-dreamy font-normal text-white">
                      {dikshitMoon.name}
                    </h3>
                    <div className="text-xs text-amber-200/90 font-medium mt-0.5">
                      {dikshitMoon.birthdate}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-mono block">
                      {dikshitMoon.phaseName}
                    </span>
                    <span className="text-[11px] text-amber-200/70 font-mono">
                      {dikshitMoon.illumination}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 font-light leading-relaxed mb-4">
                  {dikshitMoon.poeticDescription}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/[0.04]">
                  <span>Click moon to illuminate</span>
                  <span className="text-amber-300/80 font-medium">Tap to celebrate {recipientName}</span>
                </div>
              </div>
            </div>

            {/* Gunjan's Birthday Moon */}
            <div
              onClick={(e) => handleMoonClick('gunjan', e)}
              className="relative rounded-3xl bg-gradient-to-b from-slate-900/80 via-slate-950/70 to-slate-950/90 border border-rose-300/30 p-8 flex flex-col justify-between shadow-[0_15px_50px_rgba(0,0,0,0.7)] backdrop-blur-md group cursor-pointer transition-all hover:border-rose-300/60 hover:shadow-[0_0_35px_rgba(244,63,94,0.18)]"
            >
              <div className="absolute top-5 right-5 text-rose-300/70 text-[11px] font-mono flex items-center gap-1.5 bg-rose-400/10 px-2.5 py-1 rounded-full border border-rose-300/20">
                <Calendar className="w-3 h-3" />
                <span>Her Birthday</span>
              </div>

              {/* Moon Visual with High Resolution Real Phase Texture */}
              <div className="relative my-6 flex justify-center">
                {/* Luminous Glow Halo */}
                <div className="absolute inset-0 rounded-full bg-slate-300/10 blur-2xl group-hover:bg-rose-300/20 transition-all duration-500 scale-90" />

                <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.15)] bg-black">
                  <img
                    src={gunjanMoon.imagePath}
                    alt="Moon phase on 27 August 2007"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/40 pointer-events-none" />
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between border-b border-white/[0.08] pb-3 mb-4">
                  <div>
                    <h3 className="text-2xl font-serif-dreamy font-normal text-white">
                      {gunjanMoon.name}
                    </h3>
                    <div className="text-xs text-rose-200/90 font-medium mt-0.5">
                      {gunjanMoon.birthdate}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-mono block">
                      {gunjanMoon.phaseName}
                    </span>
                    <span className="text-[11px] text-rose-200/70 font-mono">
                      {gunjanMoon.illumination}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 font-light leading-relaxed mb-4">
                  {gunjanMoon.poeticDescription}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-white/[0.04]">
                  <span>Click moon to illuminate</span>
                  <span className="text-rose-300/80 font-medium">Under the same sky</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Merged Celestial Alignment View */
          <div className="p-8 md:p-12 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-center animate-in fade-in">
            <div className="relative max-w-sm mx-auto h-72 md:h-80 flex items-center justify-center mb-8">
              {/* Dikshit's Moon layer */}
              <div 
                className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-amber-300/40 shadow-[0_0_50px_rgba(251,191,36,0.3)] bg-black transition-all duration-300"
                style={{
                  transform: `translateX(-${(100 - blendValue) * 0.4}px)`,
                  opacity: blendValue < 50 ? 1 : (100 - (blendValue - 50) * 1.5) / 100
                }}
              >
                <img
                  src={dikshitMoon.imagePath}
                  alt={dikshitMoon.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gunjan's Moon layer */}
              <div 
                className="absolute w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-rose-300/40 shadow-[0_0_50px_rgba(244,63,94,0.3)] bg-black mix-blend-screen transition-all duration-300"
                style={{
                  transform: `translateX(${(blendValue) * 0.4 - 20}px)`,
                  opacity: blendValue > 50 ? 1 : (blendValue * 2) / 100
                }}
              >
                <img
                  src={gunjanMoon.imagePath}
                  alt="Gunjan's Moon"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Slider to interactively blend */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="text-amber-200">13 Nov 2005 ({recipientName})</span>
                <span className="text-white font-medium">Celestial Eclipse</span>
                <span className="text-rose-200">27 Aug 2007 (Gunjan)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={blendValue}
                onChange={(e) => setBlendValue(Number(e.target.value))}
                className="w-full accent-amber-300 cursor-pointer"
              />
            </div>

            <p className="text-base md:text-lg text-slate-200 font-serif-dreamy italic max-w-xl mx-auto leading-relaxed mb-6">
              "Two distinct nights separated by time, yet woven together by the quiet pull of the same celestial orbit."
            </p>

            <button
              onClick={handleMakeWish}
              className="px-6 py-3 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-300 to-rose-300 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-rose-700" />
              <span>Make a Birthday Wish on Our Moon</span>
            </button>
          </div>
        )}

        {/* Poetic Resonance Callout Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-amber-950/20 via-slate-900/40 to-rose-950/20 border border-white/[0.08] backdrop-blur-sm text-center">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-200/90 mb-3 font-mono">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>Gunjan's Birthday Reflection for {recipientName}</span>
          </div>
          <p className="text-lg md:text-xl font-serif-dreamy text-slate-200 italic max-w-3xl mx-auto leading-relaxed">
            "{resonanceMessage}"
          </p>
        </div>
      </div>
    </section>
  );
};
