import React, { useState, useMemo } from 'react';
import { Space, FilterState, VoiceTier } from '../types';
import {
  MapPin,
  Volume2,
  PhoneCall,
  RotateCcw,
  Bookmark,
  ChevronDown,
  Navigation,
  Clock,
  Check,
  X,
  Layers,
  ZoomIn,
  ZoomOut,
  LocateFixed,
  Radio
} from 'lucide-react';

interface ExploreMapViewProps {
  spaces: Space[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  savedSpaceIds: string[];
  onToggleBookmark: (spaceId: string) => void;
  onSelectSpace: (space: Space) => void;
}

export const ExploreMapView: React.FC<ExploreMapViewProps> = ({
  spaces,
  filterState,
  setFilterState,
  savedSpaceIds,
  onToggleBookmark,
  onSelectSpace,
}) => {
  const [mobileViewMode, setMobileViewMode] = useState<'list' | 'map'>('list');
  const [activePinId, setActivePinId] = useState<string>('moa-yeoksam');
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [mapLayer, setMapLayer] = useState<'default' | 'satellite'>('default');

  // Filter logic
  const filteredSpaces = useMemo(() => {
    return spaces.filter((sp) => {
      // Region
      if (filterState.region && filterState.region !== '전체') {
        const matches =
          sp.region.includes(filterState.region) ||
          filterState.region.includes(sp.region) ||
          sp.address.includes(filterState.region);
        if (!matches) return false;
      }

      // Voice
      if (filterState.voiceTier !== 'all') {
        if (filterState.voiceTier === 'free') {
          if (sp.voiceTier !== 'free' && sp.voiceVerificationStatus !== 'confirmed') return false;
        } else if (filterState.voiceTier === 'unconfirmed') {
          if (sp.voiceVerificationStatus !== 'unconfirmed' && sp.voiceTier !== 'unconfirmed') return false;
        } else if (sp.voiceTier !== filterState.voiceTier) {
          return false;
        }
      }

      // Booth count
      if (filterState.minBooths > 0) {
        if (filterState.minBooths === 1) {
          const hasAtLeastOne =
            (sp.phoneBoothCount !== null && sp.phoneBoothCount >= 1) ||
            sp.phoneBoothInstalled === 'confirmed';
          if (!hasAtLeastOne) return false;
        } else {
          // 2 or more: strict verification rule per prompt requirements
          if (sp.phoneBoothCount === null || sp.phoneBoothCount < filterState.minBooths) {
            return false;
          }
        }
      }

      // 24h
      if (filterState.only24h && !sp.operatingHours.includes('24시간')) return false;

      // Bookmarked only
      if (filterState.onlyBookmarked && !savedSpaceIds.includes(sp.id)) return false;

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price_asc') {
        const pA = a.hourlyRate ?? 999999;
        const pB = b.hourlyRate ?? 999999;
        return pA - pB;
      } else if (filterState.sortBy === 'rating_desc') {
        return b.rating - a.rating;
      } else if (filterState.sortBy === 'booth_desc') {
        const bA = a.phoneBoothCount ?? (a.phoneBoothInstalled === 'confirmed' ? 1 : 0);
        const bB = b.phoneBoothCount ?? (b.phoneBoothInstalled === 'confirmed' ? 1 : 0);
        return bB - bA;
      }
      return 0;
    });
  }, [spaces, filterState, savedSpaceIds]);

  const activeSpaceForPin = spaces.find((s) => s.id === activePinId) || filteredSpaces[0] || spaces[0];

  const handleResetFilters = () => {
    setFilterState({
      region: '',
      voiceTier: 'all',
      minBooths: 0,
      sortBy: 'price_asc',
      only24h: false,
      hasMonitor: false,
      onlyBookmarked: false,
    });
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-64px)] bg-[#FAF8FF]">
      {/* 1. Top Filter & Control Bar */}
      <section className="sticky top-16 z-30 w-full bg-white border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-3">
          {/* Active Tags and Stats */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Region Tag */}
            {filterState.region && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAEDFF] text-[#214FC7] text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{filterState.region}</span>
                <button
                  type="button"
                  onClick={() => setFilterState((prev) => ({ ...prev, region: '' }))}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Voice Tier Tag */}
            {filterState.voiceTier !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold">
                <Volume2 className="w-3.5 h-3.5" />
                <span>
                  {filterState.voiceTier === 'free'
                    ? '자유 발화 가능'
                    : filterState.voiceTier === 'booth_only'
                    ? '폰부스 발화'
                    : '정숙 학습'}
                </span>
                <button
                  type="button"
                  onClick={() => setFilterState((prev) => ({ ...prev, voiceTier: 'all' }))}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Booth Tag */}
            {filterState.minBooths > 0 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>폰부스 {filterState.minBooths}개 이상</span>
                <button
                  type="button"
                  onClick={() => setFilterState((prev) => ({ ...prev, minBooths: 0 }))}
                  className="hover:text-red-500 cursor-pointer ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Reset Filter Button */}
            {(filterState.region || filterState.voiceTier !== 'all' || filterState.minBooths > 0 || filterState.only24h || filterState.hasMonitor || filterState.onlyBookmarked) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors text-xs font-medium cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>필터 초기화</span>
              </button>
            )}

            {/* Space Count & Mobile Mode Switch */}
            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs text-slate-500 hidden sm:inline">
                총 <strong className="text-[#214FC7] font-bold">{filteredSpaces.length}개</strong>의 적합 공간
              </span>

              {/* Mobile View Toggle */}
              <div className="lg:hidden flex items-center bg-slate-100 rounded-full p-0.5">
                <button
                  type="button"
                  onClick={() => setMobileViewMode('list')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    mobileViewMode === 'list'
                      ? 'bg-[#214FC7] text-white shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  목록
                </button>
                <button
                  type="button"
                  onClick={() => setMobileViewMode('map')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    mobileViewMode === 'map'
                      ? 'bg-[#214FC7] text-white shadow-xs'
                      : 'text-slate-600'
                  }`}
                >
                  지도
                </button>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {/* Voice Dropdown */}
            <div className="relative shrink-0">
              <select
                value={filterState.voiceTier}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    voiceTier: e.target.value as VoiceTier | 'all',
                  }))
                }
                className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-[#214FC7] cursor-pointer"
              >
                <option value="all">발화 구분: 전체 공간 (4)</option>
                <option value="free">발화 가능 (화상회의 허용) (1)</option>
                <option value="unconfirmed">발화 규정 확인 필요 (3)</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Booth Dropdown */}
            <div className="relative shrink-0">
              <select
                value={filterState.minBooths}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    minBooths: Number(e.target.value),
                  }))
                }
                className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-[#214FC7] cursor-pointer"
              >
                <option value={0}>방음 폰부스: 전체</option>
                <option value={1}>방음 폰부스: 1개 이상</option>
                <option value={2}>방음 폰부스: 2개 이상</option>
                <option value={4}>방음 폰부스: 4개 이상</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={filterState.sortBy}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    sortBy: e.target.value as any,
                  }))
                }
                className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-[#214FC7] cursor-pointer"
              >
                <option value="price_asc">정렬: 1시간 환산가 낮은 순</option>
                <option value="rating_desc">정렬: 평점 높은 순</option>
                <option value="booth_desc">정렬: 폰부스 많은 순</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* 24 Hours Toggle */}
            <button
              type="button"
              onClick={() =>
                setFilterState((prev) => ({ ...prev, only24h: !prev.only24h }))
              }
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                filterState.only24h
                  ? 'bg-[#EAEDFF] text-[#214FC7] border-[#214FC7] font-bold'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>24시간 운영</span>
            </button>

            {/* Saved Toggle */}
            <button
              type="button"
              onClick={() =>
                setFilterState((prev) => ({ ...prev, onlyBookmarked: !prev.onlyBookmarked }))
              }
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors shrink-0 cursor-pointer ${
                filterState.onlyBookmarked
                  ? 'bg-amber-50 text-amber-900 border-amber-300 font-bold'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>찜한 공간만 ({savedSpaceIds.length})</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Split Main Body (Cards List + Map) */}
      <div className="w-full flex-1 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-185px)] min-h-[640px]">
          {/* Left Panel: Space Listings */}
          <div
            className={`w-full lg:w-[540px] xl:w-[580px] shrink-0 h-full overflow-y-auto flex flex-col gap-4 pr-0 lg:pr-2 ${
              mobileViewMode === 'map' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Voice Verification Status Overview Banner */}
            <div className="flex flex-col gap-2 p-3 rounded-xl bg-[#EAEDFF]/70 border border-[#DCE1FF] text-slate-800 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#214FC7] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#214FC7]" />
                  </span>
                  <span className="font-bold text-[#214FC7]">발화 검증 현황 (온라인 수업 발화 기준)</span>
                </div>
                <span className="text-[11px] text-slate-500">총 4개 실제 장소</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-white/90 px-2.5 py-1.5 rounded-lg border border-emerald-200 flex items-center justify-between">
                  <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" /> 발화 확인 완료
                  </span>
                  <span className="font-bold text-emerald-800">1곳 (카페24)</span>
                </div>
                <div className="bg-white/90 px-2.5 py-1.5 rounded-lg border border-slate-200 flex items-center justify-between">
                  <span className="text-slate-600 font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" /> 규정 확인 필요
                  </span>
                  <span className="font-bold text-slate-700">3곳 (모아·위워크·에스랩)</span>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredSpaces.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center flex flex-col items-center justify-center my-auto">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-1">
                  선택한 조건에 맞는 공간이 없습니다
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  필터를 조금 완화하거나 초기화하여 더 많은 공간을 탐색해 보세요.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 rounded-xl bg-[#214FC7] text-white text-xs font-semibold cursor-pointer"
                >
                  필터 조건 초기화하기
                </button>
              </div>
            )}

            {/* Space Cards Stream */}
            {filteredSpaces.map((space) => {
              const isSaved = savedSpaceIds.includes(space.id);
              const isSelected = activePinId === space.id;

              return (
                <div
                  key={space.id}
                  onClick={() => {
                    setActivePinId(space.id);
                  }}
                  className={`group relative rounded-2xl bg-white p-4 border transition-all duration-300 flex flex-col sm:flex-row gap-4 cursor-pointer ${
                    isSelected
                      ? 'border-[#214FC7] ring-2 ring-[#214FC7]/15 shadow-md'
                      : 'border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full sm:w-48 h-44 shrink-0 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                    {space.heroImage ? (
                      <img
                        src={space.heroImage}
                        alt={space.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center">
                        <span className="material-symbols-outlined text-3xl text-slate-300">
                          image
                        </span>
                        <span className="text-xs font-semibold text-slate-500">사진 준비 중</span>
                      </div>
                    )}

                    {/* Example Image Tag */}
                    <div className="absolute top-2.5 right-11 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow-xs">
                      예시 이미지
                    </div>

                    {/* Voice Badge */}
                    <div className="absolute top-2.5 left-2.5">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs text-white flex items-center gap-1 ${
                          space.voiceVerificationStatus === 'confirmed'
                            ? 'bg-emerald-600'
                            : 'bg-slate-700'
                        }`}
                      >
                        <Volume2 className="w-3 h-3" />
                        {space.voiceVerificationStatus === 'confirmed'
                          ? '독립실 화상회의 가능'
                          : space.voiceTierLabel || '발화 규정 확인 필요'}
                      </span>
                    </div>

                    {/* Bookmark Heart Button */}
                    <button
                      type="button"
                      aria-label="저장하기"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(space.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-white/80 backdrop-blur-md text-slate-600 hover:text-[#214FC7] transition-colors shadow-xs cursor-pointer"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          isSaved ? 'text-[#214FC7] fill-[#214FC7]' : 'text-slate-600'
                        }`}
                      />
                    </button>

                    {/* Booth Tag Strip */}
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[11px] font-medium px-2 py-1 rounded bg-slate-900/80 backdrop-blur-xs">
                      <span className="flex items-center gap-1">
                        <PhoneCall className="w-3 h-3 text-blue-300" />
                        {space.phoneBoothCount !== null
                          ? `방음 폰부스 ${space.phoneBoothCount}실`
                          : space.phoneBoothInstalled === 'confirmed'
                          ? '방음 폰부스 설치 확인'
                          : '폰부스 미확인'}
                      </span>
                      <span className="text-blue-300 text-[10px]">
                        {space.phoneBoothStatus}
                      </span>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1 mb-1">
                        <h3 className="font-bold text-slate-900 font-heading text-base truncate group-hover:text-[#214FC7] transition-colors">
                          {space.name}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-500 mb-2 truncate">
                        {space.transit.summary}
                      </p>

                      {/* Voice Distinction: 발화 가능 여부 vs 장시간(6h+) 발화 허용 여부 */}
                      <div className="flex flex-col gap-1.5 mb-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold text-slate-500 shrink-0">발화 가능 여부</span>
                          <span className={`text-xs font-bold truncate flex items-center gap-1.5 ${
                            space.voiceVerificationStatus === 'confirmed' ? 'text-emerald-700' : 'text-slate-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              space.voiceVerificationStatus === 'confirmed' ? 'bg-emerald-500' : 'bg-amber-400'
                            }`} />
                            <span className="truncate">{space.voiceTierLabel}</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2 border-t border-slate-200/60 pt-1.5">
                          <span className="text-[11px] font-semibold text-slate-500 shrink-0">장시간 발화(6시간+)</span>
                          <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/70 truncate">
                            {space.longDurationVoiceLabel || '하루 6시간 이상 발화: 미확인'}
                          </span>
                        </div>
                      </div>

                      {/* Hourly Cost Pill (Core Value) */}
                      <div className="inline-flex items-baseline gap-1.5 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200/60 mb-2.5">
                        <span className="text-[11px] text-slate-500">1시간 환산</span>
                        <span className="text-sm font-extrabold text-[#214FC7]">
                          {space.hourlyRate !== null ? `₩${space.hourlyRate.toLocaleString()}` : '미확인'}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {space.dayPassPrice !== null
                            ? `/ 일일권 ${space.dayPassPrice.toLocaleString()}원`
                            : space.hourlyRateText
                            ? `/ ${space.hourlyRateText}`
                            : '/ 이용시간 확인 필요'}
                        </span>
                      </div>

                      {/* Highlight Chips */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        {space.highlights.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-slate-100 text-[11px] text-slate-600 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                      <span className="text-[11px] text-[#214FC7] flex items-center gap-1 font-medium">
                        <Radio className="w-3 h-3 text-[#214FC7]" />
                        현재 {space.activeUsersCount || 10}명 학습 중
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSpace(space);
                        }}
                        className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-[#214FC7] hover:bg-[#1a3fa2] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        상세보기
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Panel: Interactive Canvas Map */}
          <div
            className={`flex-1 relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm h-full ${
              mobileViewMode === 'list' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Map Surface Background */}
            <div
              className={`w-full h-full relative transition-all duration-300 ${
                mapLayer === 'satellite' ? 'brightness-90 contrast-110' : ''
              }`}
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCynnQdM7-VsWfgGbQS5RjuYzf4Rhvr7hW0PM4Xbq2atfnGN1SFUNd8fNDP-s4nsCAir4e55x8AGEG63KuYh72Cf17woKBgk0Dfg5_f4eU4vGOuLgq3cG9AlwhlitRi6aaMa744yaDNOue8Y1PIqn9sWJm0TeaRX_H3OZyQ7edgnfyEprPAxM8EtEKZPrGAeKNT8rLNsE5xsTYNVjAc6ijFZhcckNjmXxhYHNy4MZKPn80AGqMdPGd8")',
                backgroundSize: `${100 * mapZoom}%`,
                backgroundPosition: 'center',
              }}
            >
              {/* Map Overlay Gradients for Depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />

              {/* Top-Left Area Indicator Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-200 text-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#214FC7] animate-pulse" />
                <span className="font-bold text-slate-800">
                  {filterState.region || '서울 테헤란로 및 주요 권역'}
                </span>
                <span className="text-slate-500">실시간 탐색 활성</span>
              </div>

              {/* Re-search at Current Boundary Pill */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
                <button
                  type="button"
                  onClick={() => {
                    // Flash notification or refresh
                    setActivePinId(filteredSpaces[0]?.id || 'stage9-gangnam');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-800 shadow-md hover:shadow-lg hover:text-[#214FC7] transition-all text-xs font-bold border border-slate-200 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#214FC7]" />
                  <span>이 위치에서 재검색</span>
                </button>
              </div>

              {/* Dynamic Coordinate Pins */}
              {filteredSpaces.map((space) => {
                const isSelected = activePinId === space.id;

                return (
                  <div
                    key={space.id}
                    onClick={() => setActivePinId(space.id)}
                    style={{
                      top: `${space.coordinates.yPercent}%`,
                      left: `${space.coordinates.xPercent}%`,
                    }}
                    className={`absolute z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group transition-transform ${
                      isSelected ? 'z-30 scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-md transition-all ${
                          isSelected
                            ? 'bg-[#214FC7] text-white ring-4 ring-[#214FC7]/20 shadow-lg'
                            : 'bg-white text-slate-800 hover:bg-[#214FC7] hover:text-white border border-slate-200'
                        }`}
                      >
                        <Volume2 className="w-3 h-3" />
                        <span>
                          {space.hourlyRate !== null
                            ? `₩${space.hourlyRate.toLocaleString()}`
                            : space.name.length > 6
                            ? `${space.name.slice(0, 5)}…`
                            : space.name}
                        </span>
                      </div>
                      <div
                        className={`w-2 h-2 rotate-45 -mt-1 shadow-2xs ${
                          isSelected ? 'bg-[#214FC7]' : 'bg-white group-hover:bg-[#214FC7]'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Interactive Pin Popup Preview (Floating over active pin) */}
              {activeSpaceForPin && (
                <div
                  style={{
                    top: `clamp(60px, ${activeSpaceForPin.coordinates.yPercent + 7}%, 70%)`,
                    left: `clamp(160px, ${activeSpaceForPin.coordinates.xPercent}%, 80%)`,
                  }}
                  className="absolute transform -translate-x-1/2 z-40 w-72 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-200 transition-all duration-300"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                      {activeSpaceForPin.heroImage ? (
                        <img
                          src={activeSpaceForPin.heroImage}
                          alt={activeSpaceForPin.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400 text-center p-1">
                          <span className="material-symbols-outlined text-lg text-slate-300">image</span>
                          <span className="text-[9px] font-semibold text-slate-500">사진 준비 중</span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          activeSpaceForPin.voiceVerificationStatus === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {activeSpaceForPin.voiceVerificationStatus === 'confirmed'
                            ? '발화 확인 완료'
                            : '규정 확인 필요'}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePinId('');
                          }}
                          className="text-slate-400 hover:text-slate-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 truncate mt-1">
                        {activeSpaceForPin.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate">
                        {activeSpaceForPin.transit.summary}
                      </p>
                      <div className="mt-1 flex flex-col gap-0.5 text-[10px]">
                        <div className="text-slate-700 font-semibold truncate">
                          <span className="text-slate-400 font-normal">발화: </span>
                          {activeSpaceForPin.voiceTierLabel}
                        </div>
                        <div className="text-amber-800 font-medium truncate">
                          <span className="text-slate-400 font-normal">장시간(6h+): </span>
                          {activeSpaceForPin.longDurationVoiceLabel || '미확인'}
                        </div>
                      </div>
                      <p className="text-xs font-extrabold text-[#214FC7] mt-1">
                        {activeSpaceForPin.hourlyRate !== null
                          ? `1시간 환산 ${activeSpaceForPin.hourlyRate.toLocaleString()}원`
                          : '시간당 요금 미확인'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 text-[11px] flex items-center gap-1">
                      <PhoneCall className="w-3 h-3 text-[#214FC7]" />
                      {activeSpaceForPin.phoneBoothCount !== null
                        ? `폰부스 ${activeSpaceForPin.phoneBoothCount}실`
                        : activeSpaceForPin.phoneBoothInstalled === 'confirmed'
                        ? '방음 폰부스 설치 확인'
                        : '폰부스 미확인'}
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectSpace(activeSpaceForPin)}
                      className="text-[#214FC7] hover:underline font-bold text-xs flex items-center gap-0.5 cursor-pointer"
                    >
                      <span>상세보기</span>
                      <Navigation className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Map Controls: Bottom Right (Zoom, Geo, Layer) */}
              <div className="absolute bottom-6 right-6 z-20 flex flex-col items-center gap-2">
                <div className="flex flex-col bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMapZoom((prev) => Math.min(prev + 0.15, 1.6))}
                    aria-label="지도 확대"
                    className="p-2.5 text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <div className="h-px bg-slate-200 w-full" />
                  <button
                    type="button"
                    onClick={() => setMapZoom((prev) => Math.max(prev - 0.15, 0.85))}
                    aria-label="지도 축소"
                    className="p-2.5 text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActivePinId('moa-yeoksam');
                  }}
                  aria-label="내 현재 위치"
                  className="p-2.5 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200 text-slate-700 hover:text-[#214FC7] hover:bg-slate-100 transition-all flex items-center justify-center cursor-pointer"
                >
                  <LocateFixed className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setMapLayer((prev) => (prev === 'default' ? 'satellite' : 'default'))
                  }
                  aria-label="위성/지도 레이어 전환"
                  className="px-2.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all flex items-center gap-1 text-xs font-semibold cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{mapLayer === 'default' ? '위성' : '일반'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
