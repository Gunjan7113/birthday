import React, { useState } from 'react';
import { ObservationItem } from '../data/romanticContent.ts';
import { Volume2, Sparkles, Compass, HeartHandshake, Eye, Quote } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine.ts';

interface ObservationsCarouselProps {
  observations: ObservationItem[];
  recipientName: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Volume2: <Volume2 className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Compass: <Compass className="w-5 h-5" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5" />,
};

export const ObservationsCarousel: React.FC<ObservationsCarouselProps> = ({
  observations,
  recipientName,
}) => {
  const [selectedId, setSelectedId] = useState<string>(observations[0]?.id || '');

  const activeObs = observations.find(o => o.id === selectedId) || observations[0];

  const handleSelect = (obs: ObservationItem, index: number) => {
    setSelectedId(obs.id);
    romanticAudio.playStarChime(index + 2);
  };

  return (
    <section id="observations" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-amber-200/80 mb-3">
            <span>The Quiet Details</span>
            <span aria-hidden="true">·</span>
            <span>Things I Notice</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif-dreamy font-normal text-white mb-3 sm:mb-4">
            Curious Observations
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed px-2">
            You probably don't even realize the little things that stand out about you, {recipientName}. Here are a few that stay with me.
          </p>
        </div>

        {/* 2-Column Split: Interactive Observation Selector + Detailed Vignette */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Observation Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5 sm:gap-3.5">
            {observations.map((item, idx) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item, idx)}
                  className={`text-left p-3.5 sm:p-5 rounded-2xl transition-all duration-300 border cursor-pointer relative overflow-hidden min-h-[44px] ${
                    isSelected
                      ? 'bg-white/[0.08] border-amber-300/40 shadow-[0_0_25px_rgba(251,191,36,0.12)]'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div
                      className={`p-2 sm:p-2.5 rounded-xl transition-colors shrink-0 ${
                        isSelected
                          ? 'bg-amber-300/20 text-amber-200'
                          : 'bg-white/[0.05] text-slate-400'
                      }`}
                    >
                      {iconMap[item.iconName] || <Eye className="w-5 h-5" />}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-amber-200/70 font-mono">
                        {item.tag}
                      </span>
                      <h4 className="text-sm sm:text-base font-medium text-white mt-0.5 truncate">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Featured Observation Card with Cozy Twilight Imagery */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/40 border border-white/[0.08] backdrop-blur-md overflow-hidden flex flex-col md:flex-row shadow-[0_15px_45px_rgba(0,0,0,0.6)]">
            {/* Visual Image Side with Resilient Fallback */}
            <div className="relative md:w-5/12 min-h-[180px] sm:min-h-[220px] md:min-h-full overflow-hidden bg-slate-950">
              <img
                src="/src/assets/images/cozy_twilight_window_1793190509409.jpg"
                alt="Cozy twilight desk overlooking city lights"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-[#080b18]/40 to-[#080b18] pointer-events-none" />
              <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[10px] sm:text-[11px] text-amber-100/70 bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded">
                A quiet evening conversation
              </div>
            </div>

            {/* Content Side */}
            <div className="p-5 sm:p-7 md:p-8 md:w-7/12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs uppercase tracking-wider text-amber-200/80 mb-2 sm:mb-3">
                  <Quote className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Observation · {activeObs.tag}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif-dreamy font-normal text-white mb-3 sm:mb-4 break-words">
                  {activeObs.title}
                </h3>

                <blockquote className="text-rose-100/90 font-serif-dreamy text-base sm:text-lg md:text-xl italic leading-relaxed mb-3 sm:mb-4 pl-3 border-l border-amber-300/40 break-words">
                  "{activeObs.quote}"
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {activeObs.detail}
                </p>
              </div>

              <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-white/[0.06] text-xs text-slate-400 flex items-center justify-between">
                <span>Gunjan's quiet notes</span>
                <span className="text-amber-200/80">Always genuine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
