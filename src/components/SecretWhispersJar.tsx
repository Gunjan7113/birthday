import React, { useState } from 'react';
import { WishNote } from '../data/romanticContent.ts';
import { Sparkles, Heart, Shuffle, Gift, Check } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine.ts';
import confetti from 'canvas-confetti';

interface SecretWhispersJarProps {
  wishes: WishNote[];
  recipientName: string;
}

export const SecretWhispersJar: React.FC<SecretWhispersJarProps> = ({ wishes, recipientName }) => {
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number | null>(null);
  const [unfoldedCount, setUnfoldedCount] = useState(0);
  const [heartbeatSent, setHeartbeatSent] = useState(false);

  const currentWish = currentNoteIndex !== null ? wishes[currentNoteIndex] : null;

  const handleDrawNote = (e: React.MouseEvent) => {
    romanticAudio.playStarChime(Math.floor(Math.random() * 6));
    const nextIdx = Math.floor(Math.random() * wishes.length);
    setCurrentNoteIndex(nextIdx);
    setUnfoldedCount(prev => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 22,
      spread: 55,
      origin: { x, y },
      colors: ['#f43f5e', '#fbbf24', '#fbcfe8'],
      scalar: 0.8,
      disableForReducedMotion: true,
    });
  };

  const handleSendHeartbeat = () => {
    romanticAudio.playHeartPulse();
    setHeartbeatSent(true);
    setTimeout(() => setHeartbeatSent(false), 2400);

    confetti({
      particleCount: 40,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#e11d48', '#fda4af', '#fef08a'],
      scalar: 1,
      disableForReducedMotion: true,
    });
  };

  return (
    <section id="whispers" className="relative py-24 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 mb-3">
            <span>Playful Discoveries</span>
            <span aria-hidden="true">·</span>
            <span>Unfold a Thought</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-dreamy font-normal text-white mb-4">
            A Jar of Folded Whispers
          </h2>
          <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
            Little confessions, shy truths, and fond thoughts waiting to be opened. Draw a note from the jar whenever you're curious.
          </p>
        </div>

        {/* Jar and Card Display */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Luminous Glowing Jar */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-56 h-72 rounded-t-[50px] rounded-b-3xl bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-amber-500/[0.08] border-2 border-amber-200/30 p-6 flex flex-col justify-between items-center shadow-[0_0_50px_rgba(251,191,36,0.15)] backdrop-blur-sm group">
              {/* Wooden Jar Lid */}
              <div className="w-32 h-6 -mt-9 rounded-t-lg bg-amber-900 border border-amber-700 shadow-md flex items-center justify-center">
                <div className="w-16 h-1 bg-amber-700/60 rounded" />
              </div>

              {/* Little folded origami notes inside the jar */}
              <div className="relative w-full h-full flex flex-wrap items-center justify-center gap-2 p-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-7 rounded bg-amber-100/80 border border-amber-300/60 shadow-xs transform rotate-6 hover:rotate-12 transition-transform duration-300 flex items-center justify-center text-[9px] font-serif-dreamy text-amber-950 font-bold"
                  >
                    ✦
                  </div>
                ))}
              </div>

              {/* Jar Label */}
              <div className="w-full text-center py-2 px-3 rounded-lg bg-slate-900/80 border border-amber-200/20">
                <span className="text-[11px] font-serif-dreamy text-amber-200 tracking-wider">
                  {recipientName}'s Jar · Gunjan
                </span>
              </div>
            </div>

            <button
              onClick={handleDrawNote}
              className="mt-6 px-6 py-3 rounded-full text-xs font-semibold bg-amber-200 hover:bg-amber-100 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Draw a Secret Note</span>
            </button>
          </div>

          {/* Unfolded Note Viewer */}
          <div className="md:col-span-7">
            {currentWish ? (
              <div className="p-8 rounded-3xl bg-[#fefcf8] text-slate-900 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-amber-900/10 relative overflow-hidden animate-in fade-in zoom-in-95">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-200/50 to-transparent pointer-events-none" />

                <div className="flex items-center justify-between border-b border-amber-900/15 pb-3 mb-6">
                  <span className="text-xs uppercase tracking-wider font-mono text-rose-800 font-semibold">
                    {currentWish.tag}
                  </span>
                  <span className="text-xs text-amber-900/60 font-serif-dreamy">
                    Note #{unfoldedCount}
                  </span>
                </div>

                <p className="text-2xl md:text-3xl font-script-handwritten text-[#211a14] leading-relaxed mb-6">
                  "{currentWish.message}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-amber-900/15 text-xs text-amber-950/70 font-serif-dreamy">
                  <span>From Gunjan with a quiet smile</span>
                  <span className="text-rose-600 font-bold">♥</span>
                </div>
              </div>
            ) : (
              <div className="p-10 rounded-3xl bg-slate-900/30 border border-dashed border-white/10 text-center">
                <Gift className="w-8 h-8 text-amber-300/60 mx-auto mb-3" />
                <h4 className="text-lg font-serif-dreamy text-white mb-2">
                  No note drawn yet
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Click "Draw a Secret Note" to reveal one of Gunjan's thoughts folded inside the glass jar.
                </p>
              </div>
            )}

            {/* Send a Heartbeat Across the Stars */}
            <div className="mt-6 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-xs font-medium text-white mb-0.5">
                  Send a Heartbeat
                </div>
                <div className="text-[11px] text-slate-400">
                  Let Gunjan know you're exploring this little world right now.
                </div>
              </div>

              <button
                onClick={handleSendHeartbeat}
                className="px-4 py-2.5 rounded-full text-xs font-medium bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {heartbeatSent ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Heartbeat Sent!</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
                    <span>Send Heartbeat</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
