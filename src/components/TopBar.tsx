import React from 'react';
import { Volume2, VolumeX, Sparkles, Feather } from 'lucide-react';

interface TopBarProps {
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  onOpenEditor: () => void;
  senderName: string;
  recipientName: string;
  currentPage?: 'home' | 'promises';
  onNavigate?: (page: 'home' | 'promises') => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  isPlayingAudio,
  onToggleAudio,
  onOpenEditor,
  senderName,
  recipientName,
  currentPage = 'home',
  onNavigate,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#070913]/75 border-b border-white/[0.07] px-6 lg:px-12 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face) */}
        <button 
          onClick={() => onNavigate?.('home')}
          className="text-lg md:text-xl font-serif-dreamy font-semibold tracking-wide text-rose-100 hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0 text-left"
        >
          <span className="text-amber-200/90 font-light">✦</span>
          <span>{senderName} & {recipientName}</span>
        </button>

        {/* Zone 2: 4–5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {currentPage === 'home' ? (
            <>
              <a href="#moons" className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-amber-200/90">
                <span>Our Moons</span>
              </a>
              <a href="#letter" className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0">
                The Letter
              </a>
              <a href="#constellation" className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0">
                Constellation
              </a>
              <a href="#mixtape" className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0">
                Mixtape
              </a>
              <a href="#future-vibes" className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-rose-200/90 font-medium">
                <span>Future Vibes 🧸</span>
              </a>
              <button
                onClick={() => onNavigate?.('promises')}
                className="hover:text-rose-200 text-rose-300 font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
              >
                <span>Our Promises & Story</span>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-400/30">New Page</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate?.('home')}
              className="hover:text-amber-200 text-amber-200 font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              ← Back to Starlit World
            </button>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action (Audio Ambient Experience) + Discreet Personalize Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenEditor}
            title="Personalize or edit messages"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-rose-200 hover:bg-white/[0.04] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <Feather className="w-3.5 h-3.5 text-amber-300/80" />
            <span>Edit Notes</span>
          </button>

          <button
            onClick={onToggleAudio}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-2 whitespace-nowrap shrink-0 border ${
              isPlayingAudio
                ? 'bg-amber-400/15 border-amber-300/40 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                : 'bg-white/[0.05] border-white/10 text-slate-300 hover:bg-white/[0.09] hover:text-white'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span>Ambient Music: On</span>
                <span className="flex gap-0.5 items-end h-3 ml-0.5">
                  <span className="w-0.5 bg-amber-300 animate-[bounce_1.2s_infinite] h-2"></span>
                  <span className="w-0.5 bg-amber-300 animate-[bounce_0.9s_infinite] h-3"></span>
                  <span className="w-0.5 bg-amber-300 animate-[bounce_1.4s_infinite] h-1.5"></span>
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                <span>Play Soundscape</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
