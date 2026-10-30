import React from 'react';
import { ArrowUp, Heart, Sparkles, Feather } from 'lucide-react';

interface FooterCinematicProps {
  closingQuote: string;
  senderName: string;
  recipientName: string;
  onOpenEditor: () => void;
}

export const FooterCinematic: React.FC<FooterCinematicProps> = ({
  closingQuote,
  senderName,
  recipientName,
  onOpenEditor,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-white/[0.08] overflow-hidden">
      {/* Background moonlit horizon panorama */}
      <div className="relative min-h-[380px] flex items-center justify-center p-8 md:p-16">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen scale-105"
          style={{
            backgroundImage: `url('/src/assets/images/moonlit_water_horizon_1793190508091.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060814] via-[#060814]/75 to-transparent pointer-events-none" />

        {/* Poetic Centerpiece */}
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 mb-5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Under The Starlit Horizon</span>
          </div>

          <p 
            className="text-2xl md:text-3xl lg:text-4xl font-serif-dreamy font-normal text-white italic leading-snug mb-8"
            style={{ textWrap: 'balance' }}
          >
            "{closingQuote}"
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-rose-200/90 font-serif-dreamy mb-10">
            <span>Made with quiet affection by {senderName}</span>
            <span aria-hidden="true">·</span>
            <span>Dedicated to {recipientName}</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={scrollToTop}
              className="px-5 py-2.5 rounded-full text-xs font-medium bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to the Sky</span>
            </button>

            <button
              onClick={onOpenEditor}
              className="px-5 py-2.5 rounded-full text-xs font-medium bg-amber-400/10 hover:bg-amber-400/20 text-amber-200 border border-amber-300/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Feather className="w-3.5 h-3.5" />
              <span>Personalize Messages</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quiet copyright / unboxed metadata bar */}
      <div className="px-6 py-4 border-t border-white/[0.04] bg-[#04060d] text-center text-xs text-slate-500 font-light flex items-center justify-center gap-2">
        <span>A Little World</span>
        <span aria-hidden="true">·</span>
        <span>{senderName} & {recipientName}</span>
        <span aria-hidden="true">·</span>
        <span className="flex items-center gap-1">
          Forever a quiet memory <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500 inline" />
        </span>
      </div>
    </footer>
  );
};
