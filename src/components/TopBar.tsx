import React, { useState } from 'react';
import { Volume2, VolumeX, Feather, Menu, X, Moon, Mail, Compass, Disc, Heart, Sparkles } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#070913]/85 border-b border-white/[0.07] px-3 sm:px-6 lg:px-12 py-2.5 sm:py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button 
          onClick={() => {
            onNavigate?.('home');
            setMobileMenuOpen(false);
          }}
          className="text-base sm:text-lg md:text-xl font-serif-dreamy font-semibold tracking-wide text-rose-100 hover:text-white transition-colors shrink min-w-0 flex items-center gap-1.5 sm:gap-2 cursor-pointer bg-transparent border-0 p-0 text-left"
          title={`${senderName} & ${recipientName}`}
        >
          <span className="text-amber-200/90 font-light shrink-0">✦</span>
          <span className="truncate max-w-[150px] xs:max-w-[210px] sm:max-w-none">
            {senderName} & {recipientName}
          </span>
        </button>

        {/* Zone 2: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {currentPage === 'home' ? (
            <>
              <a href="#moons" className="hover:text-amber-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-amber-200/90">
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
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded border border-rose-400/30">8 Truths</span>
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

        {/* Zone 3: Actions + Mobile Hamburger */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <button
            onClick={onOpenEditor}
            title="Personalize or edit messages"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-rose-200 hover:bg-white/[0.04] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Feather className="w-3.5 h-3.5 text-amber-300/80" />
            <span>Edit Notes</span>
          </button>

          {/* Soundscape toggle with responsive label */}
          <button
            onClick={onToggleAudio}
            className={`px-2.5 sm:px-3.5 py-1.5 text-xs font-medium rounded-full transition-all flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0 border cursor-pointer ${
              isPlayingAudio
                ? 'bg-amber-400/15 border-amber-300/40 text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.2)]'
                : 'bg-white/[0.05] border-white/10 text-slate-300 hover:bg-white/[0.09] hover:text-white'
            }`}
            title={isPlayingAudio ? "Mute ambient music" : "Play ambient music"}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse shrink-0" />
                <span className="hidden xs:inline">Music: On</span>
                <span className="xs:hidden">On</span>
                <span className="flex gap-0.5 items-end h-3 ml-0.5">
                  <span className="w-0.5 bg-amber-300 animate-[bounce_1.2s_infinite] h-2"></span>
                  <span className="w-0.5 bg-amber-300 animate-[bounce_0.9s_infinite] h-3"></span>
                  <span className="w-0.5 bg-amber-300 animate-[bounce_1.4s_infinite] h-1.5"></span>
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="hidden xs:inline">Soundscape</span>
                <span className="xs:hidden">Sound</span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/10 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-rose-300" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-white/10 pb-2 space-y-1 animate-in fade-in slide-in-from-top-2">
          {currentPage === 'home' ? (
            <>
              <a
                href="#moons"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-white/[0.06] hover:text-amber-200 transition-colors"
              >
                <Moon className="w-4 h-4 text-amber-300" />
                <span>Our Moons</span>
              </a>
              <a
                href="#letter"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-white/[0.06] hover:text-amber-200 transition-colors"
              >
                <Mail className="w-4 h-4 text-rose-400" />
                <span>The Letter</span>
              </a>
              <a
                href="#constellation"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-white/[0.06] hover:text-amber-200 transition-colors"
              >
                <Compass className="w-4 h-4 text-sky-400" />
                <span>Constellation</span>
              </a>
              <a
                href="#mixtape"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-200 hover:bg-white/[0.06] hover:text-amber-200 transition-colors"
              >
                <Disc className="w-4 h-4 text-amber-400" />
                <span>Mixtape (Songs)</span>
              </a>
              <a
                href="#future-vibes"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-rose-200 font-medium hover:bg-white/[0.06] transition-colors"
              >
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span>Future Vibes 🧸 (Labubu Question)</span>
              </a>
              <button
                onClick={() => handleMobileNav(() => onNavigate?.('promises'))}
                className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-amber-200 font-medium hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400/40" />
                  <span>Our Promises & Story</span>
                </span>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-400/30">
                  New Page
                </span>
              </button>
            </>
          ) : (
            <button
              onClick={() => handleMobileNav(() => onNavigate?.('home'))}
              className="w-full text-left flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-amber-200 font-medium hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              <span>← Back to Starlit World (Home)</span>
            </button>
          )}

          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between px-3">
            <button
              onClick={() => handleMobileNav(onOpenEditor)}
              className="flex items-center gap-2 py-1.5 text-xs text-slate-300 hover:text-white cursor-pointer"
            >
              <Feather className="w-3.5 h-3.5 text-amber-300" />
              <span>Personalize Notes & Messages</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
