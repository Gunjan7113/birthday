import { useState, useEffect } from 'react';
import { RomanticData, defaultRomanticData } from './romanticContent.ts';

const STORAGE_KEY = 'gunjan_dikshit_romantic_data_v1';

export function getInitialData(): RomanticData {
  if (typeof window === 'undefined') return defaultRomanticData;
  try {
    // Check if there is a URL hash containing state
    const hash = window.location.hash;
    if (hash && hash.startsWith('#data=')) {
      const encoded = hash.slice(6);
      const jsonStr = decodeURIComponent(atob(encoded));
      const parsed = JSON.parse(jsonStr);
      if (parsed && parsed.senderName && parsed.recipientName) {
        return { ...defaultRomanticData, ...parsed };
      }
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure tracks retain default audioSrc/videoSrc if present
      const mergedTracks = defaultRomanticData.tracks.map((defTrack) => {
        const userTrack = (parsed.tracks || []).find((t: any) => t.id === defTrack.id);
        return userTrack ? {
          ...userTrack,
          title: defTrack.title,
          mood: defTrack.mood,
          duration: defTrack.duration,
          lyricsSnippet: defTrack.lyricsSnippet,
          audioSrc: defTrack.audioSrc,
          videoSrc: defTrack.videoSrc
        } : defTrack;
      });

      const mergedLetter = {
        ...defaultRomanticData.letter,
        ...(parsed.letter || {}),
        secretFoldedNote: (!parsed.letter?.secretFoldedNote || parsed.letter.secretFoldedNote.includes("If you're smiling right now"))
          ? defaultRomanticData.letter.secretFoldedNote
          : parsed.letter.secretFoldedNote,
        tuckedWhisperReelText: defaultRomanticData.letter.tuckedWhisperReelText,
        tuckedWhisperVoiceSrc: defaultRomanticData.letter.tuckedWhisperVoiceSrc,
        tuckedWhisperHindiQuote: defaultRomanticData.letter.tuckedWhisperHindiQuote,
        tuckedWhisperEnglishQuote: defaultRomanticData.letter.tuckedWhisperEnglishQuote,
      };

      const updatedRecipient = (parsed.recipientName === 'Dikshit' || !parsed.recipientName)
        ? defaultRomanticData.recipientName
        : parsed.recipientName;

      return {
        ...defaultRomanticData,
        ...parsed,
        recipientName: updatedRecipient,
        heroHeadline: (parsed.heroHeadline?.includes('Dikshit') || !parsed.heroHeadline)
          ? defaultRomanticData.heroHeadline
          : parsed.heroHeadline,
        birthdayHeadline: (parsed.birthdayHeadline?.includes('Dikshit') || !parsed.birthdayHeadline)
          ? defaultRomanticData.birthdayHeadline
          : parsed.birthdayHeadline,
        letter: mergedLetter,
        tracks: mergedTracks,
        promiseSlides: parsed.promiseSlides || defaultRomanticData.promiseSlides,
        deepTruths: parsed.deepTruths || defaultRomanticData.deepTruths,
        promisesVideoSrc: defaultRomanticData.promisesVideoSrc,
        moonPhases: {
          ...defaultRomanticData.moonPhases,
          ...(parsed.moonPhases || {})
        }
      };
    }
  } catch (e) {
    console.warn('Could not restore custom romantic data:', e);
  }
  return defaultRomanticData;
}

export function useRomanticStore() {
  const [data, setData] = useState<RomanticData>(getInitialData);
  const [isCustomized, setIsCustomized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setIsCustomized(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const updateData = (updater: (prev: RomanticData) => RomanticData) => {
    setData((prev) => {
      const next = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setIsCustomized(true);
      } catch (err) {
        console.warn('Failed to save to localStorage:', err);
      }
      return next;
    });
  };

  const resetToDefault = () => {
    setData(defaultRomanticData);
    try {
      localStorage.removeItem(STORAGE_KEY);
      if (window.location.hash.startsWith('#data=')) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      setIsCustomized(false);
    } catch (err) {
      console.warn('Failed to clear storage:', err);
    }
  };

  const getShareableLink = () => {
    try {
      const jsonStr = JSON.stringify(data);
      const encoded = btoa(encodeURIComponent(jsonStr));
      const url = new URL(window.location.href);
      url.hash = `data=${encoded}`;
      return url.toString();
    } catch {
      return window.location.href;
    }
  };

  return {
    data,
    updateData,
    resetToDefault,
    isCustomized,
    getShareableLink
  };
}
