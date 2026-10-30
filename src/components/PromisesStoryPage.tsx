import React, { useState, useEffect, useRef } from 'react';
import { PromiseSlide, DeepTruthPoint } from '../data/romanticContent.ts';
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles, Heart, Video, Play, Pause, Bookmark, Quote, Eye, Maximize2, X } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine.ts';
import confetti from 'canvas-confetti';

interface PromisesStoryPageProps {
  senderName: string;
  recipientName: string;
  promiseSlides: PromiseSlide[];
  deepTruths: DeepTruthPoint[];
  videoSrc?: string;
  onBackToHome: () => void;
}

export const PromisesStoryPage: React.FC<PromisesStoryPageProps> = ({
  senderName,
  recipientName,
  promiseSlides,
  deepTruths,
  videoSrc,
  onBackToHome,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showOriginalVideo, setShowOriginalVideo] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [markedPromises, setMarkedPromises] = useState<Set<string>>(new Set());

  const currentSlide = promiseSlides[currentSlideIndex] || promiseSlides[0];

  const handleNextSlide = () => {
    romanticAudio.playStarChime(currentSlideIndex + 1);
    setCurrentSlideIndex((prev) => (prev + 1) % promiseSlides.length);
  };

  const handlePrevSlide = () => {
    romanticAudio.playStarChime(currentSlideIndex);
    setCurrentSlideIndex((prev) => (prev - 1 + promiseSlides.length) % promiseSlides.length);
  };

  const handleMarkPromise = (slideId: string, e: React.MouseEvent) => {
    romanticAudio.playHeartPulse();
    setMarkedPromises((prev) => {
      const next = new Set(prev);
      if (next.has(slideId)) next.delete(slideId);
      else next.add(slideId);
      return next;
    });

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 28,
      spread: 60,
      origin: { x, y },
      colors: ['#f43f5e', '#fbbf24', '#fbcfe8', '#ffffff'],
      scalar: 0.9,
      disableForReducedMotion: true,
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNextSlide();
      } else if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      } else if (e.key === 'Escape') {
        if (selectedImage) setSelectedImage(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, selectedImage]);

  return (
    <div className="relative min-h-screen text-[#e8ebf5] bg-[#070914] z-20 pb-24 animate-in fade-in duration-500">
      {/* Top Navigation Bar of the New Page */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[#070914]/85 border-b border-white/[0.08] px-6 lg:px-12 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-xs md:text-sm font-medium text-amber-200/90 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] px-4 py-2 rounded-full transition-all border border-white/10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-amber-300" />
            <span>Return to Starlit World</span>
          </button>

          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 font-mono hidden sm:flex">
            <span>{senderName} & {recipientName}</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-200">The 8 Promises & Story</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-amber-200/70 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-300/20">
              Page 2 of 2
            </span>
          </div>
        </div>
      </nav>

      {/* Hero Intro Header */}
      <header className="relative pt-12 pb-12 px-6 lg:px-12 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-rose-300/90 mb-4 bg-rose-500/10 px-3.5 py-1.5 rounded-full border border-rose-500/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>A Dedicated Chapter for {recipientName}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif-dreamy font-normal text-white mb-4 leading-tight">
          The 8 Truths of How I Love
        </h1>

        <p className="text-sm md:text-base text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
          Not casual promises, not words that fade with time. These are the truths I carry in my heart for you, {recipientName}. Explore each slide at your own pace.
        </p>

        {/* View Switcher: Interactive Slide Deck vs Watch Video Reel */}
        {videoSrc && (
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={() => setShowOriginalVideo(false)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                !showOriginalVideo
                  ? 'bg-amber-300 text-slate-950 font-semibold shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                  : 'bg-white/[0.05] text-slate-400 hover:text-white'
              }`}
            >
              Interactive Slide Deck (8 Slides)
            </button>
            <button
              onClick={() => setShowOriginalVideo(true)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                showOriginalVideo
                  ? 'bg-rose-500 text-white font-semibold shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                  : 'bg-white/[0.05] text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Watch Original Video Reel (Iris)</span>
            </button>
          </div>
        )}
      </header>

      {/* Main Slide Deck Box */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        {!showOriginalVideo ? (
          /* Interactive Cinematic Slide Deck */
          <div className="relative rounded-3xl bg-gradient-to-b from-[#181a2e] to-[#0d0e1c] border-2 border-amber-300/20 p-8 md:p-14 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Top progress indicator bar */}
            <div className="flex items-center gap-1.5 mb-8">
              {promiseSlides.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    romanticAudio.playStarChime(idx);
                  }}
                  className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer ${
                    idx === currentSlideIndex
                      ? 'bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                      : idx < currentSlideIndex
                      ? 'bg-rose-400/60'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                  title={`${s.order}: ${s.promiseText}`}
                />
              ))}
            </div>

            {/* Slide Header & Metadata */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-8">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-mono text-amber-200 font-semibold">
                  {currentSlide.order}
                </span>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-xs text-slate-400 font-mono">
                  Promise {currentSlideIndex + 1} of {promiseSlides.length}
                </span>
              </div>

              <button
                onClick={(e) => handleMarkPromise(currentSlide.id, e)}
                className={`p-2 rounded-full transition-all cursor-pointer ${
                  markedPromises.has(currentSlide.id)
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-400/40 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.08]'
                }`}
                title="Mark this promise in your heart"
              >
                <Heart className={`w-4 h-4 ${markedPromises.has(currentSlide.id) ? 'fill-rose-400' : ''}`} />
              </button>
            </div>

            {/* Main Promise Quote (Large Display Typography) */}
            <div className="min-h-[160px] md:min-h-[190px] flex items-center justify-center my-6 text-center">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif-dreamy font-normal text-white leading-tight tracking-wide animate-in fade-in zoom-in-95"
                style={{ textWrap: 'balance' }}
              >
                “{currentSlide.promiseText}”
              </h2>
            </div>

            {/* Gunjan's Personal Reflection for Dikshit */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm mt-8 mb-8">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-amber-200/80 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                <span>Gunjan's Reflection for {recipientName}</span>
              </div>
              <p className="text-base md:text-lg text-slate-200 font-serif-dreamy italic leading-relaxed">
                "{currentSlide.reflection}"
              </p>
            </div>

            {/* Slide Navigation Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
              <button
                onClick={handlePrevSlide}
                className="px-5 py-2.5 rounded-full text-xs font-medium text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] transition-all flex items-center gap-2 cursor-pointer border border-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Truth</span>
              </button>

              <span className="text-xs font-mono text-amber-200/70 hidden sm:inline">
                Tap Next or press Arrow keys →
              </span>

              <button
                onClick={handleNextSlide}
                className="px-6 py-2.5 rounded-full text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-300 to-rose-300 hover:from-amber-200 hover:to-rose-200 transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(251,191,36,0.3)]"
              >
                <span>Next Truth</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Video Reel Preview Box */
          <div className="rounded-3xl bg-slate-950/80 border border-white/10 p-6 shadow-2xl text-center">
            <div className="max-w-md mx-auto rounded-2xl overflow-hidden border border-rose-500/30 shadow-[0_0_40px_rgba(244,63,94,0.2)] mb-4">
              <video
                src={videoSrc}
                controls
                autoPlay
                playsInline
                className="w-full h-auto max-h-[580px] object-cover mx-auto"
              />
            </div>
            <p className="text-xs text-slate-400 font-serif-dreamy italic">
              Original video recording with Goo Goo Dolls' "Iris"
            </p>
          </div>
        )}
      </section>

      {/* The Two Deep Points (From the Uploaded Screenshots) */}
      <section className="max-w-5xl mx-auto px-6 border-t border-white/[0.08] pt-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-200/80 mb-3 font-mono">
            <Quote className="w-3.5 h-3.5 text-rose-400" />
            <span>Two Deep Truths</span>
            <span aria-hidden="true">·</span>
            <span>Real Feelings</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif-dreamy font-normal text-white mb-4">
            Words That Felt Too True
          </h2>
          <p className="text-sm md:text-base text-slate-300 font-light leading-relaxed">
            These two thoughts spoke directly to what has been growing between us. I wanted them right here in our world so you know how genuine this is.
          </p>
        </div>

        {/* Two Column Visual Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {deepTruths.map((truth, idx) => (
            <div
              key={truth.id}
              className="rounded-3xl bg-slate-900/40 border border-white/[0.08] backdrop-blur-md p-8 flex flex-col justify-between shadow-[0_15px_45px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-6">
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-300/90 font-semibold">
                    {truth.badge}
                  </span>
                  <span className="text-xs text-amber-200/70 font-mono">
                    Point 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-2xl font-serif-dreamy font-normal text-white mb-6">
                  {truth.title}
                </h3>

                {/* Image preview with click to zoom */}
                <div
                  onClick={() => setSelectedImage(truth.imagePath)}
                  className="relative group rounded-2xl overflow-hidden border border-white/10 mb-6 cursor-pointer bg-black/40"
                  title="Click to view full image"
                >
                  <img
                    src={truth.imagePath}
                    alt={truth.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-56 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="px-3 py-1.5 rounded-full text-xs bg-black/70 text-white backdrop-blur-sm flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Screenshot</span>
                    </span>
                  </div>
                </div>

                {/* The Exact Quote from Image */}
                <blockquote className="p-5 rounded-2xl bg-white/[0.03] border-l-2 border-amber-300 text-sm md:text-base font-serif-dreamy text-slate-200 italic leading-relaxed mb-6">
                  {truth.quoteText}
                </blockquote>
              </div>

              {/* Gunjan's Reflection */}
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-xs text-amber-200/90 font-medium mb-2 font-mono">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Gunjan's Note to {recipientName}:</span>
                </div>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {truth.gunjanNote}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Action: Back to Home */}
        <div className="mt-16 text-center">
          <button
            onClick={onBackToHome}
            className="px-8 py-3.5 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-300 to-rose-300 text-slate-950 hover:from-amber-200 hover:to-rose-200 transition-all shadow-[0_0_25px_rgba(251,191,36,0.3)] cursor-pointer inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to the Starlit World (Home)</span>
          </button>
        </div>
      </section>

      {/* Lightbox Modal for Full Image View */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in"
        >
          <div className="relative max-w-lg max-h-[90vh] overflow-hidden rounded-2xl bg-slate-950 border border-white/20">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage}
              alt="Full screenshot"
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};
