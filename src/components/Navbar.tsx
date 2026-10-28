import React from 'react';
import { Bookmark, Sparkles, MapPin, Compass } from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'match-survey' | 'explore-and-map' | 'space-detail';
  setCurrentTab: (tab: 'home' | 'match-survey' | 'explore-and-map' | 'space-detail') => void;
  savedCount: number;
  onOpenSavedModal: () => void;
  onOpenPrdReviewModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  savedCount,
  onOpenSavedModal,
  onOpenPrdReviewModal,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8FF]/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-[1440px] mx-auto px-6 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2 cursor-pointer focus:outline-none"
          >
            <img
              alt="Space Finder"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs_5TH4FnboXVAuING_Dx6QvmoJq8VtLwOTg4f6TNQ7MsfZDyP0K58ulRSNR_Xp6-sf34rM2gaxNJF_4QhkRrGipZWRG6dj3p8zFLS4hDEYKie0B3hBbyAkGvVO-lqA_ccQhfXAhrNWbemSgnNRbPfyb6vyRIH08IPT5GApidHdxFmD8xnZ_3vdPqZFK920FDIHe4oU8uH7p0-6J2XtRgvhDNaIVfhKwqBZcgSPYE9NRJlKroj1plL2GGFC8XE5wTMyw"
            />
          </button>

          {/* Nav Links */}
          <nav className="flex items-center gap-6 h-16" id="gnb-nav">
            <button
              onClick={() => setCurrentTab('home')}
              className={`h-full inline-flex items-center px-1 text-sm transition-all border-b-2 cursor-pointer ${
                currentTab === 'home'
                  ? 'text-[#4169E1] font-semibold border-[#4169E1]'
                  : 'text-[#475569] hover:text-[#4169E1] border-transparent font-medium'
              }`}
            >
              홈
            </button>
            <button
              onClick={() => setCurrentTab('match-survey')}
              className={`h-full inline-flex items-center px-1 text-sm transition-all border-b-2 cursor-pointer ${
                currentTab === 'match-survey'
                  ? 'text-[#4169E1] font-semibold border-[#4169E1]'
                  : 'text-[#475569] hover:text-[#4169E1] border-transparent font-medium'
              }`}
            >
              추천 공간 찾기
            </button>
            <button
              onClick={() => setCurrentTab('explore-and-map')}
              className={`h-full inline-flex items-center px-1 text-sm transition-all border-b-2 cursor-pointer ${
                currentTab === 'explore-and-map' || currentTab === 'space-detail'
                  ? 'text-[#4169E1] font-semibold border-[#4169E1]'
                  : 'text-[#475569] hover:text-[#4169E1] border-transparent font-medium'
              }`}
            >
              공간 탐색 및 지도
            </button>
          </nav>
        </div>

        {/* Saved Count subtle button */}
        {savedCount > 0 && (
          <button
            onClick={onOpenSavedModal}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#4169E1] hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <span>저장된 공간</span>
            <span className="w-4 h-4 rounded-full bg-[#4169E1] text-white text-[10px] flex items-center justify-center font-bold">
              {savedCount}
            </span>
          </button>
        )}
      </div>
    </header>
  );
};
