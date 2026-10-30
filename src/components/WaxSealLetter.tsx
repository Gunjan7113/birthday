import React, { useState, useRef, useEffect } from 'react';
import { 
  Feather, 
  CornerRightDown, 
  RotateCcw, 
  Play, 
  Pause, 
  Volume2, 
  Sparkles, 
  Heart, 
  Film, 
  Quote 
} from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine.ts';
import confetti from 'canvas-confetti';

interface LetterData {
  salutation: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  signOff: string;
  secretFoldedNote: string;
  date: string;
  tuckedWhisperReelText?: string;
  tuckedWhisperVoiceSrc?: string;
  tuckedWhisperHindiQuote?: string;
  tuckedWhisperEnglishQuote?: string;
}

interface WaxSealLetterProps {
  letter: LetterData;
  senderName: string;
  recipientName: string;
}

export const WaxSealLetter: React.FC<WaxSealLetterProps> = ({
  letter,
  senderName,
  recipientName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSecretFold, setShowSecretFold] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [showVideoReel, setShowVideoReel] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(22);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  const voiceMediaRef = useRef<HTMLVideoElement | null>(null);

  const voiceSrc =
    letter.tuckedWhisperVoiceSrc ||
    '/assets/aistudio/WhatsApp_Video_2026-10-30_at_3.52.36_PM_373f02ab.mp4';
  const reelText =
    letter.tuckedWhisperReelText ||
    "staying single until someone's son decides to describe me like this";

  const handleBreakSeal = (e: React.MouseEvent) => {
    romanticAudio.playSealBreakSound();
    setIsOpen(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 75,
      origin: { x, y },
      colors: ['#e11d48', '#f59e0b', '#fbbf24', '#f43f5e', '#fef3c7'],
      scalar: 0.9,
      disableForReducedMotion: true,
    });
  };

  const handleToggleSecretNote = () => {
    romanticAudio.playStarChime(4);
    setShowSecretFold((prev) => !prev);
  };

  const handleToggleVoicePlay = (e?: React.MouseEvent) => {
    if (!voiceMediaRef.current) return;

    if (isPlayingVoice) {
      voiceMediaRef.current.pause();
      setIsPlayingVoice(false);
    } else {
      voiceMediaRef.current
        .play()
        .then(() => {
          setIsPlayingVoice(true);
          if (!hasPlayedOnce && e) {
            setHasPlayedOnce(true);
            const rect = e.currentTarget.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;
            confetti({
              particleCount: 20,
              spread: 50,
              origin: { x, y },
              colors: ['#f43f5e', '#fbbf24', '#fbcfe8'],
              scalar: 0.8,
            });
          }
        })
        .catch((err) => {
          console.warn('Playback error:', err);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (voiceMediaRef.current) {
      setCurrentTime(voiceMediaRef.current.currentTime);
      if (voiceMediaRef.current.duration && !isNaN(voiceMediaRef.current.duration)) {
        setDuration(voiceMediaRef.current.duration);
      }
    }
  };

  const handleEnded = () => {
    setIsPlayingVoice(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (voiceMediaRef.current) {
      voiceMediaRef.current.currentTime = time;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Pause media when collapsing note or envelope
  useEffect(() => {
    if (!isOpen || !showSecretFold) {
      if (voiceMediaRef.current && isPlayingVoice) {
        voiceMediaRef.current.pause();
        setIsPlayingVoice(false);
      }
    }
  }, [isOpen, showSecretFold]);

  return (
    <section id="letter" className="relative py-24 px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 mb-3">
            <span>The Handwritten Note</span>
            <span aria-hidden="true">·</span>
            <span>Intimate & Sincere</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-dreamy font-normal text-white mb-3">
            Words I Almost Kept To Myself
          </h2>
          <p className="text-sm md:text-base text-slate-300 font-light">
            A quiet letter from {senderName} to {recipientName}, sealed until you are ready to read it.
          </p>
        </div>

        {/* Envelope Container */}
        <div className="relative mx-auto transition-all duration-700">
          {!isOpen ? (
            /* Closed Wax-Sealed Envelope */
            <div className="relative max-w-xl mx-auto rounded-3xl bg-gradient-to-b from-[#221c2c] to-[#120f1a] border border-amber-300/20 p-8 md:p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden group">
              <div className="absolute inset-0 bg-radial from-rose-900/10 via-transparent to-transparent pointer-events-none" />

              <div className="mb-6 flex justify-center">
                <span className="text-xs uppercase tracking-widest text-amber-200/70 border-b border-amber-200/20 pb-1">
                  Private Correspondence · To {recipientName}
                </span>
              </div>

              {/* Monogrammed Wax Seal Button */}
              <div className="relative my-8 flex justify-center">
                <button
                  onClick={handleBreakSeal}
                  className="relative group/seal cursor-pointer focus:outline-none transition-transform active:scale-95"
                  title="Click to break wax seal"
                >
                  <div className="absolute -inset-3 rounded-full bg-rose-600/30 blur-lg group-hover/seal:bg-rose-500/50 transition-all" />

                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#9b1c31] via-[#781223] to-[#4c0b16] border-2 border-[#d9777f]/40 shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center transform group-hover/seal:scale-105 transition-transform">
                    <div className="w-18 h-18 rounded-full border border-amber-200/30 flex flex-col items-center justify-center bg-black/15 shadow-inner">
                      <span className="text-base font-serif-dreamy font-bold tracking-widest text-amber-100 drop-shadow">
                        G & D
                      </span>
                      <span className="text-[9px] uppercase tracking-tighter text-amber-200/70 font-sans mt-0.5">
                        Break Seal
                      </span>
                    </div>
                  </div>
                </button>
              </div>

              <p className="text-sm text-slate-300 font-light max-w-sm mx-auto mb-2">
                Click the seal above to open {senderName}'s handwritten note.
              </p>
              <p className="text-xs text-amber-200/60 font-serif-dreamy italic">
                "Some thoughts are best opened in quiet moments."
              </p>
            </div>
          ) : (
            /* Unfolded Vintage Parchment Letter */
            <div className="relative max-w-2xl mx-auto rounded-3xl bg-[#fdfbf6] text-[#29221c] p-8 md:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.85)] border border-amber-900/10 overflow-hidden transform transition-all duration-700 animate-in fade-in zoom-in-95">
              {/* Delicate paper texture & border */}
              <div className="absolute inset-0 parchment-texture opacity-40 pointer-events-none" />
              <div className="absolute inset-3 border border-amber-900/10 rounded-2xl pointer-events-none" />

              {/* Letter Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-amber-900/15 pb-4 mb-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-950/70 font-serif-dreamy">
                  <Feather className="w-3.5 h-3.5 text-amber-800" />
                  <span>A Letter from {senderName}</span>
                </div>
                <div className="text-xs text-amber-900/60 font-serif-dreamy italic">
                  {letter.date}
                </div>
              </div>

              {/* Salutation */}
              <div className="relative z-10 mb-6">
                <h3 className="text-3xl md:text-4xl font-serif-dreamy font-semibold text-[#1a1410] tracking-wide">
                  {letter.salutation}
                </h3>
              </div>

              {/* Letter Body in Handwritten Style */}
              <div className="relative z-10 space-y-6 text-xl md:text-2xl font-script-handwritten text-[#2c221a] leading-relaxed">
                <p>{letter.paragraph1}</p>
                <p>{letter.paragraph2}</p>
                <p>{letter.paragraph3}</p>
              </div>

              {/* Sign Off */}
              <div className="relative z-10 mt-10 pt-6 border-t border-amber-900/15 flex flex-col items-end">
                <span className="text-xl md:text-2xl font-script-handwritten text-amber-950">
                  {letter.signOff}
                </span>
                <span className="text-2xl md:text-3xl font-serif-dreamy font-medium text-[#1c130e] mt-1 tracking-wider">
                  {senderName}
                </span>
              </div>

              {/* Secret Folded Corner Note (A Tucked Whisper) */}
              <div className="relative z-10 mt-10 pt-6 border-t border-dashed border-amber-900/20">
                {!showSecretFold ? (
                  <button
                    onClick={handleToggleSecretNote}
                    className="group/fold text-left flex items-center gap-2 text-xs uppercase tracking-wider text-amber-800 hover:text-amber-950 font-serif-dreamy font-semibold cursor-pointer"
                  >
                    <CornerRightDown className="w-3.5 h-3.5 text-rose-700 transition-transform group-hover/fold:translate-y-0.5" />
                    <span>Unfold Secret Tucked Note (P.S. & Voice Whisper)</span>
                  </button>
                ) : (
                  <div className="p-6 md:p-7 rounded-2xl bg-[#fff9ee] border border-amber-300/80 shadow-md animate-in fade-in slide-in-from-top-3 relative overflow-hidden">
                    {/* Subtle watermarked decorative rose in background */}
                    <div className="absolute top-2 right-2 text-rose-500/10 pointer-events-none">
                      <Heart className="w-32 h-32 fill-current" />
                    </div>

                    <div className="relative z-10">
                      {/* Badge Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-300/40 text-[11px] font-serif-dreamy font-semibold uppercase tracking-wider text-rose-700">
                          <Sparkles className="w-3 h-3 text-rose-500" />
                          <span>A Tucked Whisper · For {recipientName}</span>
                        </div>
                        <span className="text-[11px] text-amber-900/60 font-serif-dreamy italic">
                          Tucked under the seal
                        </span>
                      </div>

                      {/* Gunjan's Personal Note */}
                      <div className="mb-5 text-xl md:text-2xl font-script-handwritten text-[#2c2017] leading-relaxed">
                        <p>
                          "{letter.secretFoldedNote}"
                        </p>
                      </div>

                      {/* BOLD Line from the Reel (Prominently Featured) */}
                      <div className="my-5 p-5 md:p-6 rounded-2xl bg-gradient-to-r from-rose-50 via-amber-50 to-rose-50 border-2 border-rose-300/70 shadow-sm relative">
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-800/80 mb-2 font-serif-dreamy">
                          <Quote className="w-3.5 h-3.5 text-rose-600 fill-rose-600/30" />
                          <span>The Words on the Reel · Written Boldly for You</span>
                        </div>
                        
                        <p className="text-2xl sm:text-3xl md:text-4xl font-serif-dreamy font-extrabold text-[#3a0d18] tracking-tight leading-snug drop-shadow-xs">
                          “{reelText}”
                        </p>
                      </div>

                      {/* Interactive Voice Player Unit */}
                      <div className="p-4 md:p-5 rounded-2xl bg-[#241a24] text-white shadow-inner border border-rose-900/40 mt-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                          <div>
                            <div className="flex items-center gap-2 text-xs text-rose-300 font-serif-dreamy font-medium tracking-wide">
                              <Volume2 className="w-3.5 h-3.5 text-rose-400" />
                              <span>Spoken Voiceover · Listen Closely</span>
                            </div>
                            <h4 className="text-base md:text-lg font-serif-dreamy font-semibold text-rose-100">
                              How He Describes Her · The Spoken Voice
                            </h4>
                          </div>

                          {/* Play / Pause Voice Action */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={handleToggleVoicePlay}
                              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all flex items-center gap-2.5 shadow-md cursor-pointer ${
                                isPlayingVoice
                                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]'
                                  : 'bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-slate-950 font-semibold shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                              }`}
                            >
                              {isPlayingVoice ? (
                                <>
                                  <Pause className="w-4 h-4 fill-current" />
                                  <span>Pause Voice</span>
                                </>
                              ) : (
                                <>
                                  <Play className="w-4 h-4 fill-current ml-0.5" />
                                  <span>Play Voiceover</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => setShowVideoReel(!showVideoReel)}
                              className="px-3.5 py-2.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/15 text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                              title="Toggle Original Video Reel"
                            >
                              <Film className="w-3.5 h-3.5 text-rose-300" />
                              <span className="hidden sm:inline">{showVideoReel ? 'Hide Video' : 'Watch Reel'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Progress Scrubber and Time */}
                        <div className="space-y-1.5">
                          <input
                            type="range"
                            min="0"
                            max={duration || 22}
                            step="0.1"
                            value={currentTime}
                            onChange={handleSeek}
                            className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-rose-400 focus:outline-none"
                          />
                          <div className="flex justify-between text-[11px] font-mono text-rose-200/70">
                            <span>{formatTime(currentTime)}</span>
                            {/* Animated sound equalizer bars */}
                            {isPlayingVoice && (
                              <div className="flex items-end gap-1 h-3">
                                <span className="w-1 bg-rose-400 rounded-full animate-[bounce_0.8s_infinite] h-2" />
                                <span className="w-1 bg-amber-400 rounded-full animate-[bounce_1.2s_infinite] h-3.5" />
                                <span className="w-1 bg-rose-300 rounded-full animate-[bounce_0.6s_infinite] h-1.5" />
                                <span className="w-1 bg-amber-300 rounded-full animate-[bounce_1s_infinite] h-3" />
                              </div>
                            )}
                            <span>{formatTime(duration)}</span>
                          </div>
                        </div>

                        {/* Hidden/Mounted Video Element for real voice audio playback */}
                        <video
                          ref={voiceMediaRef}
                          src={voiceSrc}
                          playsInline
                          preload="auto"
                          onTimeUpdate={handleTimeUpdate}
                          onEnded={handleEnded}
                          className={showVideoReel ? 'w-full rounded-xl mt-4 aspect-[9/16] max-h-[360px] object-contain bg-black shadow-lg mx-auto' : 'hidden'}
                        />

                        {/* Transcript of the Spoken Words in Hindi + English meaning */}
                        <div className="mt-4 pt-3.5 border-t border-white/10 text-xs space-y-2">
                          <div className="text-amber-200/90 font-serif-dreamy leading-relaxed text-sm italic">
                            "{letter.tuckedWhisperHindiQuote || "उसको कैसे रुलाया किसी ने? कैसे गुस्सा कर दिया उस पर? छोटी बच्ची सी तो है वो... कैसे खुद को संभालती होगी, सब सहकर? वो बस प्यार डिज़र्व करती है... मुझे सब देना है उसको... उसे मायूस नहीं देख सकता।"}"
                          </div>
                          <div className="text-slate-300/80 font-light text-[11px] leading-relaxed">
                            {letter.tuckedWhisperEnglishQuote || "“How could anyone ever hurt her or be angry with her? She is like an innocent child... How did she manage all this time holding everything in? She only deserves pure love. I want to give her the entire world... I can never bear to see her sad.”"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Re-seal action */}
              <div className="relative z-10 mt-8 flex justify-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xs text-amber-900/50 hover:text-amber-900 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Fold and seal letter again</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
