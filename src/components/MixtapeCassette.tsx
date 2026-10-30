import React, { useState, useEffect, useRef } from 'react';
import { MixtapeTrack } from '../data/romanticContent.ts';
import { Play, Pause, SkipForward, SkipBack, Disc, Sparkles, Volume2, VolumeX, Video, Music2 } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine.ts';

interface MixtapeCassetteProps {
  tracks: MixtapeTrack[];
  recipientName: string;
}

export const MixtapeCassette: React.FC<MixtapeCassetteProps> = ({ tracks, recipientName }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(164); // 02:44 for Khat 2.0
  const [showVideoStage, setShowVideoStage] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const mediaRef = useRef<HTMLVideoElement | null>(null);
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Switch track handler
  const loadTrack = (index: number, autoPlay = true) => {
    romanticAudio.playTapeClick();
    setCurrentTrackIndex(index);
    const nextTrack = tracks[index];
    setCurrentTime(0);

    // If there is recorded audio (like Tere Liye Mandir or Akhiyan De Saamne)
    if (nextTrack?.audioSrc || nextTrack?.videoSrc) {
      romanticAudio.stopMixtapeMelody();
      // Temporarily duck or pause ambient audio so song is pristine
      if (romanticAudio.getIsPlaying()) {
        romanticAudio.stopAmbient();
      }

      if (mediaRef.current) {
        mediaRef.current.src = nextTrack.audioSrc || nextTrack.videoSrc || '';
        mediaRef.current.currentTime = 0;
        mediaRef.current.load();
        if (autoPlay) {
          mediaRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch((err) => {
            console.warn('Playback error:', err);
            setIsPlaying(false);
          });
        } else {
          setIsPlaying(false);
        }
      }
    } else {
      // Procedural fallback track
      if (mediaRef.current) {
        mediaRef.current.pause();
      }
      if (autoPlay) {
        romanticAudio.playMixtapeMelody(index);
        setIsPlaying(true);
      } else {
        romanticAudio.stopMixtapeMelody();
        setIsPlaying(false);
      }
    }
  };

  const handleTogglePlay = () => {
    romanticAudio.playTapeClick();

    if (currentTrack.audioSrc || currentTrack.videoSrc) {
      if (!mediaRef.current) return;

      if (isPlaying) {
        mediaRef.current.pause();
        setIsPlaying(false);
      } else {
        // Stop any background synth
        romanticAudio.stopMixtapeMelody();
        if (romanticAudio.getIsPlaying()) {
          romanticAudio.stopAmbient();
        }

        mediaRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn('Error starting playback:', err);
          setIsPlaying(false);
        });
      }
    } else {
      if (isPlaying) {
        romanticAudio.stopMixtapeMelody();
        setIsPlaying(false);
      } else {
        romanticAudio.playMixtapeMelody(currentTrackIndex);
        setIsPlaying(true);
      }
    }
  };

  const handleNextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    loadTrack(nextIdx, isPlaying);
  };

  const handlePrevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(prevIdx, isPlaying);
  };

  const handleSelectTrack = (idx: number) => {
    loadTrack(idx, true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (mediaRef.current && (currentTrack.audioSrc || currentTrack.videoSrc)) {
      mediaRef.current.currentTime = targetTime;
    }
  };

  const toggleMute = () => {
    if (mediaRef.current) {
      mediaRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    const onTimeUpdate = () => {
      setCurrentTime(media.currentTime);
    };

    const onLoadedMetadata = () => {
      if (media.duration && !isNaN(media.duration)) {
        setDuration(media.duration);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      // Auto-advance to next track
      handleNextTrack();
    };

    media.addEventListener('timeupdate', onTimeUpdate);
    media.addEventListener('loadedmetadata', onLoadedMetadata);
    media.addEventListener('ended', onEnded);

    return () => {
      media.removeEventListener('timeupdate', onTimeUpdate);
      media.removeEventListener('loadedmetadata', onLoadedMetadata);
      media.removeEventListener('ended', onEnded);
      media.pause();
      romanticAudio.stopMixtapeMelody();
    };
  }, [currentTrackIndex]);

  return (
    <section id="mixtape" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-amber-200/80 mb-3">
            <span>Audio Cassette Mixtape</span>
            <span aria-hidden="true">·</span>
            <span>Dedicated For {recipientName}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif-dreamy font-normal text-white mb-3 sm:mb-4">
            Midnight Frequency
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed px-2">
            A real cassette tape with music dedicated straight to you. Press play to listen to your dedicated playlist — from acoustic songs to sweet birthday melodies.
          </p>
        </div>

        {/* Cassette Deck Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          {/* Physical Vintage Cassette Graphic */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-gradient-to-b from-[#1c1d29] to-[#0e1019] border-2 border-white/10 p-4 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden">
              {/* Media element for real audio/video playback */}
              {currentTrack.audioSrc && (
                <video
                  key={currentTrack.id}
                  ref={mediaRef}
                  src={currentTrack.audioSrc}
                  playsInline
                  preload="auto"
                  className={showVideoStage ? "w-full h-44 sm:h-52 rounded-2xl object-cover mb-4 border border-rose-500/30 shadow-lg" : "hidden"}
                />
              )}

              {/* Cassette Screw Details */}
              <div className="flex flex-wrap justify-between items-center gap-1.5 mb-3 sm:mb-4 text-slate-500">
                <span className="w-2.5 h-2.5 rounded-full border border-slate-600 flex items-center justify-center text-[7px] shrink-0">✕</span>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 justify-center">
                  <span className="text-[9px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest text-amber-200/80 uppercase truncate max-w-[200px] sm:max-w-none">
                    GUNJAN · SIDE A · FOR {recipientName.toUpperCase()}
                  </span>
                  {currentTrack.videoSrc && (
                    <button
                      onClick={() => setShowVideoStage(!showVideoStage)}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition-colors flex items-center gap-1 cursor-pointer border border-rose-400/30"
                      title="Toggle stage video preview"
                    >
                      <Video className="w-2.5 h-2.5" />
                      <span>{showVideoStage ? 'Hide Video' : 'Stage Video'}</span>
                    </button>
                  )}
                </div>
                <span className="w-2.5 h-2.5 rounded-full border border-slate-600 flex items-center justify-center text-[7px] shrink-0">✕</span>
              </div>

              {/* Tape Label Area */}
              <div className="rounded-xl bg-[#ede8d8] text-slate-900 p-3 sm:p-4 border border-amber-900/20 shadow-inner mb-4 sm:mb-6 relative">
                <div className="flex items-center justify-between border-b border-amber-900/20 pb-2 mb-2 sm:mb-3">
                  <div className="flex items-center gap-1.5">
                    <Music2 className="w-3.5 h-3.5 text-rose-800 shrink-0" />
                    <span className="text-[11px] sm:text-xs font-serif-dreamy font-bold tracking-wider sm:tracking-widest text-rose-900">
                      A TAPE OF UNSAID WORDS
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-700 font-semibold">
                    {currentTrack.audioSrc ? formatTime(duration) : currentTrack.duration}
                  </span>
                </div>

                <div className="text-base sm:text-lg md:text-xl font-script-handwritten font-bold text-slate-900 break-words">
                  {currentTrack.title}
                </div>
                <div className="text-[11px] sm:text-xs text-slate-600 font-mono mt-0.5 flex flex-wrap items-center justify-between gap-1">
                  <span>Mood: {currentTrack.mood}</span>
                  {currentTrack.audioSrc && (
                    <span className="text-rose-700 font-semibold text-[10px] sm:text-[11px]">
                      Live Recorded Audio
                    </span>
                  )}
                </div>

                {/* Spool Windows */}
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-amber-900/15 flex items-center justify-around bg-slate-900/95 rounded-lg p-2 sm:p-3">
                  {/* Left Spool */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-amber-300/60 bg-slate-950 flex items-center justify-center transition-transform shrink-0 ${
                      isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                    }`}
                  >
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-400/80" />
                  </div>

                  {/* Tape connecting window with seek progress */}
                  <div className="flex-1 max-w-[90px] sm:max-w-[140px] mx-2 sm:mx-3">
                    <div className="h-2 w-full bg-amber-950/80 rounded-full flex items-center overflow-hidden border border-amber-800/40">
                      <div
                        className={`h-full bg-gradient-to-r from-amber-500 to-rose-400 transition-all ${
                          isPlaying ? 'opacity-100' : 'opacity-70'
                        }`}
                        style={{
                          width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Right Spool */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-dashed border-amber-300/60 bg-slate-950 flex items-center justify-center transition-transform shrink-0 ${
                      isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
                    }`}
                  >
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-amber-400/80" />
                  </div>
                </div>

                {/* Scrubber slider for audio track */}
                {currentTrack.audioSrc && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-600 shrink-0">
                      {formatTime(currentTime)}
                    </span>
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      step={0.5}
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-1 h-1.5 bg-amber-900/20 rounded-lg appearance-none cursor-pointer accent-rose-600"
                    />
                    <span className="text-[10px] font-mono text-slate-600 shrink-0">
                      {formatTime(duration)}
                    </span>
                  </div>
                )}
              </div>

              {/* Tape Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 sm:pt-2">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={handlePrevTrack}
                    className="p-2.5 sm:p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Previous track"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleTogglePlay}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-amber-300 hover:bg-amber-200 text-slate-950 font-medium transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] flex items-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-slate-950" />
                        <span className="text-xs font-semibold">Pause Audio</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-slate-950" />
                        <span className="text-xs font-semibold">Play {currentTrack.audioSrc ? 'Song' : 'Melody'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleNextTrack}
                    className="p-2.5 sm:p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Next track"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>

                  {currentTrack.audioSrc && (
                    <button
                      onClick={toggleMute}
                      className="p-2.5 sm:p-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white transition-colors cursor-pointer ml-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                {/* Animated Waveform Visualizer */}
                <div className="hidden xs:flex items-end gap-1 h-6">
                  {[40, 75, 100, 60, 90, 45, 80, 50].map((h, i) => (
                    <span
                      key={i}
                      className={`w-1 bg-amber-300/80 rounded-full transition-all duration-300 ${
                        isPlaying ? 'animate-pulse' : 'opacity-30'
                      }`}
                      style={{ height: isPlaying ? `${h}%` : '20%' }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Liner Notes & Track Selector */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Gunjan's Liner Note for Current Track */}
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/[0.08] backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-rose-300/90 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Gunjan's Note on This Track</span>
              </div>
              <p className="text-base text-slate-200 font-serif-dreamy italic leading-relaxed">
                "{currentTrack.gunjanNote}"
              </p>

              {currentTrack.lyricsSnippet && (
                <div className="mt-4 pt-3 border-t border-white/[0.06] text-xs text-amber-200/80 font-mono italic">
                  ♪ {currentTrack.lyricsSnippet}
                </div>
              )}
            </div>

            {/* Tracklist selection */}
            <div className="p-4 rounded-3xl bg-slate-900/30 border border-white/[0.06] flex flex-col gap-1.5">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 px-3 py-1 font-mono">
                Select Track
              </span>
              {tracks.map((t, idx) => {
                const isSelected = idx === currentTrackIndex;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTrack(idx)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-300/15 text-amber-200 font-medium border border-amber-300/30'
                        : 'text-slate-300 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Disc className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300 animate-spin' : 'text-slate-500'}`} />
                      <span>{t.title}</span>
                    </span>
                    <span className="font-mono text-slate-400">
                      {t.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
