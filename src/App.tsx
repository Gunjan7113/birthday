/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useRomanticStore } from './data/useRomanticStore.ts';
import { romanticAudio } from './utils/audioEngine.ts';
import { NightSkyBackground } from './components/NightSkyBackground.tsx';
import { TopBar } from './components/TopBar.tsx';
import { PrologueCurtain } from './components/PrologueCurtain.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { MoonPhasesSlide } from './components/MoonPhasesSlide.tsx';
import { WaxSealLetter } from './components/WaxSealLetter.tsx';
import { ConstellationMap } from './components/ConstellationMap.tsx';
import { ObservationsCarousel } from './components/ObservationsCarousel.tsx';
import { MixtapeCassette } from './components/MixtapeCassette.tsx';
import { SecretWhispersJar } from './components/SecretWhispersJar.tsx';
import { FooterCinematic } from './components/FooterCinematic.tsx';
import { LetterEditorModal } from './components/LetterEditorModal.tsx';
import { PromisesStoryPage } from './components/PromisesStoryPage.tsx';
import { LabubuCrazyQuestion } from './components/LabubuCrazyQuestion.tsx';

export default function App() {
  const { data, updateData, resetToDefault, getShareableLink } = useRomanticStore();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [hasEnteredPrologue, setHasEnteredPrologue] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'promises'>(() => {
    return typeof window !== 'undefined' && window.location.hash === '#promises' ? 'promises' : 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#promises') {
        setCurrentPage('promises');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '' || window.location.hash === '#top' || window.location.hash === '#home') {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (page: 'home' | 'promises') => {
    setCurrentPage(page);
    if (page === 'promises') {
      window.location.hash = '#promises';
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAudio = () => {
    const isPlaying = romanticAudio.toggleAmbient();
    setIsPlayingAudio(isPlaying);
  };

  const handleEnterPrologue = () => {
    setHasEnteredPrologue(true);
    romanticAudio.startAmbient();
    setIsPlayingAudio(true);
  };

  const handleScrollToLetter = () => {
    if (currentPage !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const elem = document.getElementById('letter');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById('letter');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-[#e8ebf5] bg-[#060814] selection:bg-rose-500/30 selection:text-white">
      {/* Cinematic Prologue Gate (Shows upon first visit) */}
      {!hasEnteredPrologue && (
        <PrologueCurtain
          senderName={data.senderName}
          recipientName={data.recipientName}
          onEnter={handleEnterPrologue}
        />
      )}

      {/* Atmospheric Night Sky Canvas Background */}
      <NightSkyBackground />

      {/* Top Bar strictly following 3-Zone Contract */}
      <TopBar
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
        onOpenEditor={() => setIsEditorOpen(true)}
        senderName={data.senderName}
        recipientName={data.recipientName}
        currentPage={currentPage}
        onNavigate={navigateTo}
      />

      {/* Main Cinematic Content */}
      <main className="relative z-10">
        {currentPage === 'promises' ? (
          /* Dedicated New Page: The 8 Promises & Truth Points from Screen Recording & Images */
          <PromisesStoryPage
            senderName={data.senderName}
            recipientName={data.recipientName}
            promiseSlides={data.promiseSlides}
            deepTruths={data.deepTruths}
            videoSrc="/assets/aistudio/WhatsApp_Video_2026-10-30_at_2.51.20_PM_902ef18c.mp4"
            onBackToHome={() => navigateTo('home')}
          />
        ) : (
          /* Starlit Celestial Main Home Experience */
          <>
            {/* 1. Hero Entrance with Birthday Celebration */}
            <HeroSection
              senderName={data.senderName}
              recipientName={data.recipientName}
              heroHeadline={data.heroHeadline}
              heroSubtitle={data.heroSubtitle}
              onOpenLetterClick={handleScrollToLetter}
              onOpenPromisesPage={() => navigateTo('promises')}
            />

            {/* 2. The Moons We Were Born Under (13 Nov 2005 & 27 Aug 2007) */}
            <MoonPhasesSlide
              dikshitMoon={data.moonPhases.dikshit}
              gunjanMoon={data.moonPhases.gunjan}
              resonanceMessage={data.moonPhases.resonanceMessage}
              recipientName={data.recipientName}
            />

            {/* 3. The Handwritten Wax-Sealed Birthday Letter */}
            <WaxSealLetter
              letter={data.letter}
              senderName={data.senderName}
              recipientName={data.recipientName}
            />

            {/* 4. Interactive Constellation Celestial Map */}
            <ConstellationMap
              nodes={data.constellations}
              recipientName={data.recipientName}
            />

            {/* 5. Sincere Observations & Twilight Cozy Vignette */}
            <ObservationsCarousel
              observations={data.observations}
              recipientName={data.recipientName}
            />

            {/* 6. Midnight Frequency Mixtape Player */}
            <MixtapeCassette
              tracks={data.tracks}
              recipientName={data.recipientName}
            />

            {/* 7. A Jar of Folded Whispers & Birthday Wishes */}
            <SecretWhispersJar
              wishes={data.wishes}
              recipientName={data.recipientName}
            />

            {/* 8. The Crazy Future Vibes Labubu Question Slide */}
            <LabubuCrazyQuestion
              senderName={data.senderName}
              recipientName={data.recipientName}
            />

            {/* 9. Cinematic Moonlit Horizon Footer */}
            <FooterCinematic
              closingQuote={data.closingQuote}
              senderName={data.senderName}
              recipientName={data.recipientName}
              onOpenEditor={() => setIsEditorOpen(true)}
            />
          </>
        )}
      </main>

      {/* Customizer / Personalization Modal */}
      <LetterEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        data={data}
        onSave={(newData) => updateData(() => newData)}
        onReset={resetToDefault}
        getShareableLink={getShareableLink}
      />
    </div>
  );
}
