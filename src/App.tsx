import React, { useState, useEffect } from 'react';
import { Space, FilterState, VoiceTier } from './types';
import { SPACES_DATA } from './data/spacesData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { MatchSurveyView } from './components/MatchSurveyView';
import { ExploreMapView } from './components/ExploreMapView';
import { SpaceDetailView } from './components/SpaceDetailView';
import { PhotoModal } from './components/PhotoModal';
import { SavedSpacesModal } from './components/SavedSpacesModal';
import { PrdReviewModal } from './components/PrdReviewModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'match-survey' | 'explore-and-map' | 'space-detail'>('home');
  const [selectedSpace, setSelectedSpace] = useState<Space>(SPACES_DATA[0]);

  // Saved spaces (bookmarks) with localStorage persistence
  const [savedSpaceIds, setSavedSpaceIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('sf_saved_spaces');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      // ignore
    }
    return ['moa-yeoksam']; // Default pre-saved example
  });

  useEffect(() => {
    try {
      localStorage.setItem('sf_saved_spaces', JSON.stringify(savedSpaceIds));
    } catch (e) {
      // ignore
    }
  }, [savedSpaceIds]);

  const handleToggleBookmark = (spaceId: string) => {
    setSavedSpaceIds((prev) =>
      prev.includes(spaceId) ? prev.filter((id) => id !== spaceId) : [...prev, spaceId]
    );
  };

  // Filter state for search & map
  const [filterState, setFilterState] = useState<FilterState>({
    region: '강남/역삼',
    voiceTier: 'free',
    minBooths: 1,
    sortBy: 'price_asc',
    only24h: false,
    hasMonitor: false,
    onlyBookmarked: false,
  });

  // Modals state
  const [photoGallerySpace, setPhotoGallerySpace] = useState<Space | null>(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState<boolean>(false);
  const [isPrdReviewModalOpen, setIsPrdReviewModalOpen] = useState<boolean>(false);

  // Survey completion flow
  const handleCompleteSurvey = (criteria: {
    region: string;
    voiceTier: VoiceTier;
    boothRequired: boolean;
  }) => {
    setFilterState({
      region: criteria.region,
      voiceTier: criteria.voiceTier,
      minBooths: criteria.boothRequired ? 1 : 0,
      sortBy: 'price_asc',
      only24h: false,
      hasMonitor: false,
      onlyBookmarked: false,
    });
    setCurrentTab('explore-and-map');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSpace = (space: Space) => {
    setSelectedSpace(space);
    setCurrentTab('space-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedSpaces = SPACES_DATA.filter((s) => savedSpaceIds.includes(s.id));

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF] text-[#131B2E]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedSpaceIds.length}
        onOpenSavedModal={() => setIsSavedModalOpen(true)}
        onOpenPrdReviewModal={() => setIsPrdReviewModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full pt-16">
        {currentTab === 'home' && (
          <HomeView
            spaces={SPACES_DATA}
            onStartSurvey={() => {
              setCurrentTab('match-survey');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToMap={(initialRegion) => {
              if (initialRegion) {
                setFilterState((prev) => ({ ...prev, region: initialRegion }));
              }
              setCurrentTab('explore-and-map');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectSpace={handleSelectSpace}
          />
        )}

        {currentTab === 'match-survey' && (
          <MatchSurveyView
            spaces={SPACES_DATA}
            onCompleteSurvey={handleCompleteSurvey}
          />
        )}

        {currentTab === 'explore-and-map' && (
          <ExploreMapView
            spaces={SPACES_DATA}
            filterState={filterState}
            setFilterState={setFilterState}
            savedSpaceIds={savedSpaceIds}
            onToggleBookmark={handleToggleBookmark}
            onSelectSpace={handleSelectSpace}
          />
        )}

        {currentTab === 'space-detail' && (
          <SpaceDetailView
            space={selectedSpace}
            onBack={() => setCurrentTab('explore-and-map')}
            isBookmarked={savedSpaceIds.includes(selectedSpace.id)}
            onToggleBookmark={handleToggleBookmark}
            onOpenPhotoGallery={(sp) => setPhotoGallerySpace(sp)}
          />
        )}
      </main>

      {/* Global Modals */}
      {photoGallerySpace && (
        <PhotoModal
          space={photoGallerySpace}
          onClose={() => setPhotoGallerySpace(null)}
        />
      )}

      {isSavedModalOpen && (
        <SavedSpacesModal
          savedSpaces={savedSpaces}
          onClose={() => setIsSavedModalOpen(false)}
          onSelectSpace={handleSelectSpace}
          onRemoveBookmark={handleToggleBookmark}
          onOpenPrdReview={() => {
            setIsSavedModalOpen(false);
            setIsPrdReviewModalOpen(true);
          }}
        />
      )}

      {isPrdReviewModalOpen && (
        <PrdReviewModal onClose={() => setIsPrdReviewModalOpen(false)} />
      )}

      {/* Global Footer */}
      <Footer onOpenPrdReviewModal={() => setIsPrdReviewModalOpen(true)} />
    </div>
  );
}
