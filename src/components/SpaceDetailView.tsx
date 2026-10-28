import React, { useState } from 'react';
import { Space } from '../types';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Volume2,
  PhoneCall,
  Clock,
  Star,
  MapPin,
  CheckCircle2,
  Lightbulb,
  ExternalLink,
  Navigation,
  Compass,
  Zap,
  Wifi,
  Sparkles,
  Layers,
  Check,
  Calendar,
  MessageSquare,
  ShieldCheck,
  X
} from 'lucide-react';

interface SpaceDetailViewProps {
  space: Space;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (spaceId: string) => void;
  onOpenPhotoGallery: (space: Space) => void;
}

export const SpaceDetailView: React.FC<SpaceDetailViewProps> = ({
  space,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onOpenPhotoGallery,
}) => {
  const [showToast, setShowToast] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [showChatModal, setShowChatModal] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 2800);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      triggerToast('공간 상세 링크가 클립보드에 복사되었습니다.');
    } else {
      triggerToast('공유 링크가 준비되었습니다.');
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#FAF8FF] min-h-[calc(100vh-64px)] pb-16">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Top Breadcrumb & Metadata Header */}
      <div className="w-full bg-[#f2f3ff]/70 border-b border-slate-200/60 py-3 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <button
              onClick={onBack}
              className="hover:text-[#214FC7] transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>탐색 결과</span>
            </button>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600 font-medium">{space.region}</span>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-[#214FC7] truncate max-w-[280px] sm:max-w-none">
              {space.name} ({space.subtitle})
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleBookmark(space.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-2xs border border-slate-200/80 text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-all cursor-pointer"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isBookmarked ? 'text-[#214FC7] fill-[#214FC7]' : 'text-slate-500'
                }`}
              />
              <span>{isBookmarked ? '저장됨' : '저장하기'}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white shadow-2xs border border-slate-200/80 text-slate-800 text-xs font-semibold hover:bg-slate-50 transition-all cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-slate-500" />
              <span>공유</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Wrap */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
        {/* Photo Gallery Grid (3-4 Mosaic or Placeholder) */}
        <section className="w-full">
          {space.heroImage || (space.galleryImages && space.galleryImages.length > 0) ? (
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 sm:gap-3 rounded-2xl overflow-hidden shadow-2xs border border-slate-200/80 h-[320px] sm:h-[420px] md:h-[480px]">
              {/* Hero / Open Workspace (Col 1-2, Row 1-2) */}
              <div
                onClick={() => onOpenPhotoGallery(space)}
                className="relative md:col-span-2 md:row-span-2 group overflow-hidden bg-slate-100 cursor-pointer"
              >
                <img
                  src={space.galleryImages[0]?.url || space.heroImage}
                  alt={space.galleryImages[0]?.alt || space.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#214FC7] text-white text-xs font-bold w-fit shadow-sm">
                      <Volume2 className="w-3.5 h-3.5" />
                      {space.voiceTierLabel}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium shadow-sm">
                      예시 이미지 (실제 장소 사진 아님)
                    </span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-white font-heading">
                    {space.name}
                  </p>
                </div>
              </div>

              {/* Soundproof Booth (Col 3, Row 1) */}
              <div
                onClick={() => onOpenPhotoGallery(space)}
                className="relative group overflow-hidden bg-slate-100 hidden md:block cursor-pointer"
              >
                <img
                  src={
                    space.galleryImages[1]?.url ||
                    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80'
                  }
                  alt="방음 폰부스"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-semibold text-white bg-slate-900/60 backdrop-blur-xs px-2 py-0.5 rounded">
                    방음 폰부스 내부
                  </span>
                </div>
              </div>

              {/* Phone Booth Row (Col 4, Row 1) */}
              <div
                onClick={() => onOpenPhotoGallery(space)}
                className="relative group overflow-hidden bg-slate-100 hidden md:block cursor-pointer"
              >
                <img
                  src={
                    space.galleryImages[2]?.url ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuB51X2xDdlqRcr7eDNznT53NsIcFdat5QH64tmmaZB0SEZMf56mhtltyhDOXHm1Pzg-ny2e-0KLt331zYJB4vKivKCukpdQnoY44dVJJkKj4Pn3iaXqA2lu0Y1MphgzduC8fAHGrAjP1YfootTn8ICJC7x-HGfiBtWoqT5jXi1dt06wR8rRuPQVZqtdKXzA92v0SRO_i2rdMfT1J4Nwx0iOZGq77VTRWT3WAfZ0QZ0fNVmsSebV7hGC'
                  }
                  alt="독립형 방음부스"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-3">
                  <span className="text-[11px] font-semibold text-white bg-slate-900/60 backdrop-blur-xs px-2 py-0.5 rounded">
                    독립형 방음부스 전경
                  </span>
                </div>
              </div>

              {/* Refreshment Lounge (Col 3-4, Row 2) */}
              <div
                onClick={() => onOpenPhotoGallery(space)}
                className="relative md:col-span-2 group overflow-hidden bg-slate-100 hidden md:block cursor-pointer"
              >
                <img
                  src={
                    space.galleryImages[3]?.url ||
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDli3zKPMOiV3EFDgBMR8l0g25JuEw-XrVfMcR7p2KhmHK0Ub5SzieNWPGNmK6fQBOks23ue9sdc-SuE3S4xnhRvcRlj6ScduQjIRTE4MfpIGQ7QjHOicL69Ugg6_n-BCGu5GydU3gj2JYfv4IWCJObl4u0HqL6DV9wZ6JOzXmx3lKo1P5fu0OGq0VGsP25yz6LGkxW0Xd0G5KuhhYwgGpxKivg81Nw_l3xvXLOGwoK1XMLyDzrtUfY'
                  }
                  alt="리프레시 라운지"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end justify-between p-3.5">
                  <span className="text-[11px] font-semibold text-white bg-slate-900/60 backdrop-blur-xs px-2 py-0.5 rounded">
                    라운지 & 편의시설
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenPhotoGallery(space);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-slate-800 text-xs font-bold shadow hover:bg-white transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>사진 전체보기</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full rounded-2xl overflow-hidden shadow-2xs border border-slate-200/80 h-[320px] sm:h-[420px] md:h-[480px] bg-gradient-to-br from-slate-50 via-[#f8f9ff] to-slate-100 flex flex-col items-center justify-center text-center p-8 relative">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-3 text-[#214FC7]">
                <span className="material-symbols-outlined text-4xl text-slate-400">image</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">
                사진 준비 중인 공간입니다
              </h3>
              <p className="text-xs text-slate-500 max-w-md mb-4 leading-relaxed">
                외부 사이트의 사진을 무단 복제하지 않고, 공식 제휴 및 현장 실사를 거친 검증된 사진만을 제공하기 위해 준비 중입니다.
              </p>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-[#214FC7] text-xs font-semibold border border-blue-100">
                <MapPin className="w-3.5 h-3.5" />
                <span>검증된 실제 주소: {space.address}</span>
              </div>
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs text-slate-400">
                <span>공간 분류: {space.spaceType || '코워킹스페이스'}</span>
                <span>정보 확인일: {space.sourceInfo?.verificationDate || '2026-10-28'}</span>
              </div>
            </div>
          )}
        </section>

        {/* 2-Column Split Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Primary Details & Space Intelligence (Col 1-8) */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            {/* 1) Basic Information Block */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#DCE1FF] text-[#214FC7] text-xs font-bold">
                  부트캠프 인증 공간
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#EAEDFF] text-[#214FC7] text-xs font-bold">
                  실시간 카메라 · 마이크 친화형
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                  {space.operatingHours}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                  {space.name}
                  <span className="text-xl sm:text-2xl text-[#214FC7] block sm:inline sm:ml-2">
                    {space.subtitle}
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 pt-1">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{space.address}</span>
                </p>
              </div>

              {/* Quick Specs Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-[#FAF8FF] p-3 rounded-xl border border-slate-200/60 flex flex-col">
                  <span className="text-[11px] text-slate-500 font-medium">발화 가능 여부</span>
                  <span className={`text-xs sm:text-sm font-bold mt-0.5 ${
                    space.voiceVerificationStatus === 'confirmed' ? 'text-emerald-700' : 'text-slate-800'
                  }`}>
                    {space.voiceTierLabel}
                  </span>
                </div>
                <div className="bg-[#FAF8FF] p-3 rounded-xl border border-slate-200/60 flex flex-col">
                  <span className="text-[11px] text-slate-500 font-medium">장시간 발화(6h+)</span>
                  <span className="text-xs sm:text-sm font-bold text-amber-800 mt-0.5">
                    {space.longDurationVoiceLabel || '미확인'}
                  </span>
                </div>
                <div className="bg-[#FAF8FF] p-3 rounded-xl border border-slate-200/60 flex flex-col">
                  <span className="text-[11px] text-slate-500 font-medium">폰부스 수량</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">
                    {space.phoneBoothCount !== null
                      ? `총 ${space.phoneBoothCount}개소`
                      : space.phoneBoothStatus}
                  </span>
                </div>
                <div className="bg-[#FAF8FF] p-3 rounded-xl border border-slate-200/60 flex flex-col">
                  <span className="text-[11px] text-slate-500 font-medium">표준 환산가</span>
                  <span className="text-xs sm:text-sm font-extrabold text-[#214FC7] mt-0.5">
                    {space.hourlyRate !== null ? `₩${space.hourlyRate.toLocaleString()} / 1h` : '미확인'}
                  </span>
                </div>
              </div>
            </div>

            {/* 2) Intensive Learning Environment (Core PRD Requirement) */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-6 h-6 text-[#214FC7]" />
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                    발화 및 소음 규정 정밀 분석
                  </h2>
                </div>
                <span className={`text-xs px-2.5 py-0.5 rounded-md font-semibold border ${
                  space.voiceVerificationStatus === 'confirmed'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}>
                  {space.voiceVerificationStatus === 'confirmed'
                    ? '발화 정보 확인 완료'
                    : '발화 규정 확인 필요'}
                </span>
              </div>

              {/* Distinct Block 1: Basic Voice Permission */}
              <div className="bg-[#FAF8FF] rounded-xl border border-slate-200/70 p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      space.voiceVerificationStatus === 'confirmed' ? 'bg-emerald-500' : 'bg-amber-400'
                    }`} />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                      1. 발화 가능 여부 (기본 규정)
                    </h3>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold shrink-0 ${
                    space.voiceVerificationStatus === 'confirmed'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-700 text-white'
                  }`}>
                    {space.voiceTierLabel}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {space.environment.voiceRules.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {space.environment.voiceRules.features.map((feat, i) => (
                    <div
                      key={i}
                      className="bg-white p-2.5 rounded-lg border border-slate-200/60 flex items-center gap-2 text-xs text-slate-800 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#214FC7] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distinct Block 2: Long Duration (6h+) Voice Permission */}
              <div className="bg-amber-50/50 rounded-xl border border-amber-200/70 p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <h3 className="text-sm sm:text-base font-bold text-amber-950 font-heading">
                      2. 장시간 발화 허용 여부 (하루 6시간 이상 연속 발화)
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold shrink-0">
                    미확인
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                  {space.longDurationVoiceDetails ||
                    '하루 6시간 이상 장시간 연속 발화 가능 여부는 현재 공식 확인되지 않았습니다.'}
                </p>
                <div className="bg-white/80 p-3 rounded-lg border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
                  💡 <strong>부트캠프/원격 수강 시 유의사항:</strong> 독립실 또는 화상회의 가능 공간이라도 하루 6시간 이상 장시간 연속으로 수업에 참여하거나 발화할 경우, 방음 정도나 주변 소음 민원 발생 여부 및 연속 이용 시간제한 규칙을 사전에 확인하시기 바랍니다.
                </div>
              </div>

              {/* Detail Card 2: Soundproof Phone Booth Detail */}
              <div className="bg-[#FAF8FF] rounded-xl border border-slate-200/70 p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                      방음 폰부스 수량 및 이용 규칙
                    </h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold shrink-0">
                    {space.environment.phoneBooth.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {space.environment.phoneBooth.description}
                </p>
                {space.environment.phoneBooth.specs && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="bg-white p-3 rounded-lg border border-slate-200/60 flex flex-col">
                      <span className="text-[11px] text-slate-400">내부 하드웨어</span>
                      <span className="text-xs font-bold text-slate-800 mt-0.5">
                        {space.environment.phoneBooth.specs.hardware}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200/60 flex flex-col">
                      <span className="text-[11px] text-slate-400">차음 성능</span>
                      <span className="text-xs font-bold text-slate-800 mt-0.5">
                        {space.environment.phoneBooth.specs.soundproofing}
                      </span>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200/60 flex flex-col">
                      <span className="text-[11px] text-slate-400">환기 시스템</span>
                      <span className="text-xs font-bold text-slate-800 mt-0.5">
                        {space.environment.phoneBooth.specs.ventilation}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Detail Card 3: Network & Power Infrastructure */}
              {space.environment.infrastructure && (
                <div className="bg-[#FAF8FF] rounded-xl border border-slate-200/70 p-5 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                      개발자 친화 전원 · 초고속 네트워크
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    {space.environment.infrastructure.power && (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs text-[#214FC7]">
                          <Zap className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            {space.environment.infrastructure.power.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {space.environment.infrastructure.power.description}
                          </p>
                        </div>
                      </div>
                    )}

                    {space.environment.infrastructure.network && (
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs text-blue-600">
                          <Wifi className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                            {space.environment.infrastructure.network.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {space.environment.infrastructure.network.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 3) Transparent Price Table & Normalized Hourly Rate */}
            <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                    요금 체계 및 환산 안내
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    다양한 요금 옵션을 1시간 단위 표준 기준으로 투명하게 비교합니다.
                  </p>
                </div>

                <div className="self-start sm:self-center bg-[#EAEDFF] border border-[#DCE1FF] px-3.5 py-1.5 rounded-xl flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#214FC7] fill-[#214FC7]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500">표준 환산 요금</span>
                    <span className="text-xs sm:text-sm font-extrabold text-[#214FC7]">
                      {space.hourlyRate !== null ? `1시간당 ${space.hourlyRate.toLocaleString()}원` : '미확인'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Notes if present */}
              {space.pricingNotes && (
                <div className="bg-[#FAF8FF] border border-slate-200/60 rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed">
                  <strong className="text-[#214FC7]">요금 상세 안내: </strong>
                  {space.pricingNotes}
                </div>
              )}

              {/* Price Cards Grid */}
              {space.tickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
                  {space.tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`relative p-5 rounded-2xl flex flex-col justify-between gap-4 transition-all ${
                        ticket.isRecommended
                          ? 'bg-[#EAEDFF]/40 border-2 border-[#214FC7] shadow-sm'
                          : 'bg-[#FAF8FF] border border-slate-200/70 hover:border-slate-300'
                      }`}
                    >
                      {ticket.isRecommended && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#214FC7] text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                          부트캠프 수강생 추천
                        </div>
                      )}

                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#214FC7]">
                            {ticket.typeBadge}
                          </span>
                          {ticket.subBadge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                              {ticket.subBadge}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base font-bold text-slate-900 font-heading">
                          {ticket.name}
                        </h3>

                        <div className="pt-1">
                          <span className="text-xl font-extrabold text-slate-900">
                            {ticket.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-500 ml-1">{ticket.periodText}</span>
                        </div>

                        <p className="text-xs text-[#214FC7] font-semibold pt-0.5">
                          {ticket.hourlyNormalizedText}
                        </p>
                      </div>

                      <ul className="text-xs text-slate-600 flex flex-col gap-1.5 pt-2 border-t border-slate-200/60">
                        {ticket.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#214FC7] shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#FAF8FF] border border-slate-200/80 rounded-xl p-6 text-center flex flex-col items-center justify-center gap-2">
                  <p className="text-sm font-bold text-slate-800">
                    개인 1일 이용권 가격 및 상품별 이용 요금 확인 필요
                  </p>
                  <p className="text-xs text-slate-500 max-w-md">
                    {space.pricingNotes || '기업용 오피스 또는 월 멤버십 상품에 따라 가격 정책이 상이하므로, 공식 사이트 문의를 권장합니다.'}
                  </p>
                  <a
                    href={space.officialSiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#214FC7] hover:underline mt-1"
                  >
                    <span>공식 홈페이지 요금 문의</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* RIGHT COLUMN: Floating Action Sticky Sidebar (Col 9-12) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-20 flex flex-col gap-5">
            {/* Location Map Card */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-heading">
                  위치 및 대중교통
                </h3>
                <span className="text-xs text-[#214FC7] font-bold flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" />
                  {space.transit.walkTime}
                </span>
              </div>

              {/* Static Map Preview with Marker */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-200">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCxO7dKYA-EH8RcjeNH8L1abYAETOuvnakLqpBj4JGKm0x3Mu9pfoYtJjtZG0-03bhhikgRxUwAE7DMZjMoz9dARWYvYwgjvdmbCKXRPoEg0nCKHsjQgGwdBQM3NA662h0xSkxXkQ9NGHA5JxvSvKOWfdC1eGBwizi-ZrKkJcuVUC38VXV2eexHcjULbxC62Kf4rLFKvXqZTGCxPoOFhqe-GZ0_QxU24T0sBTb43ag8b924ObZIH5lf")',
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center">
                    <div className="px-2.5 py-1 rounded-md bg-slate-900 text-white text-[11px] font-bold shadow-lg mb-1 whitespace-nowrap">
                      {space.name}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[#214FC7] flex items-center justify-center text-white shadow-md">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Transit Info */}
              <div className="flex flex-col gap-1.5 bg-[#FAF8FF] p-3 rounded-xl border border-slate-200/60">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-green-600 text-white text-[10px] flex items-center justify-center font-bold">
                    2
                  </span>
                  {space.transit.subwayLines?.includes('신분당') && (
                    <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                      신
                    </span>
                  )}
                  <span className="text-xs font-bold text-slate-800">
                    {space.transit.summary}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {space.transit.details}
                </p>
              </div>

              {/* Action Buttons Group (PRD Requirement) */}
              <div className="flex flex-col gap-2 pt-1">
                {/* Primary Action: Official Site & Reservation */}
                <a
                  href={space.reservationUrl || space.officialSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 rounded-xl bg-[#214FC7] hover:bg-[#1a3fa2] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>
                    {space.reservationUrl ? '예약 페이지 바로가기' : '공식 사이트 바로가기'}
                  </span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                {/* Secondary Actions: Map Navigation Links */}
                <div className="grid grid-cols-1 gap-2">
                  <a
                    href={space.googleMapPlaceUrl || space.sourceInfo?.googleMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 rounded-xl bg-[#FAF8FF] hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#214FC7]" />
                    <span>구글 지도 길찾기</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>

              {/* Information Source & Verification Details Block */}
              {space.sourceInfo && (
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex flex-col gap-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#214FC7]" />
                      정보 출처 및 검증 내역
                    </span>
                    {space.sourceInfo.verificationDate && (
                      <span className="text-[10px] text-slate-400">
                        확인: {space.sourceInfo.verificationDate}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 text-[11px] text-slate-600 pt-1">
                    {space.sourceInfo.officialSite && (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-500 shrink-0">공식 사이트</span>
                        <a
                          href={space.sourceInfo.officialSite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#214FC7] hover:underline truncate max-w-[180px] flex items-center gap-0.5"
                        >
                          <span className="truncate">공식 지점 페이지</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>
                    )}

                    {space.sourceInfo.spaceCloudUrl && (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-slate-500 shrink-0">예약 플랫폼</span>
                        <a
                          href={space.sourceInfo.spaceCloudUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#214FC7] hover:underline truncate max-w-[180px] flex items-center gap-0.5"
                        >
                          <span>스페이스클라우드</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-slate-500 shrink-0">지도 위치</span>
                      <a
                        href={space.googleMapPlaceUrl || space.sourceInfo.googleMapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#214FC7] hover:underline truncate max-w-[180px] flex items-center gap-0.5"
                      >
                        <span>구글 지도 확인</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>

                    {space.sourceInfo.userVisitExperience && (
                      <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] leading-relaxed">
                        <strong className="block mb-0.5 font-semibold text-amber-950">
                          📌 사용자 직접 방문 정보:
                        </strong>
                        {space.sourceInfo.userVisitExperience}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Student Pro Tip Box */}
              <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-blue-900">
                  <Lightbulb className="w-4 h-4 text-blue-700" />
                  <h4 className="text-xs font-bold">수강생 실사용 꿀팁</h4>
                </div>
                <p className="text-xs text-blue-800 leading-relaxed">
                  {space.proTip}
                </p>
              </div>

              {/* Amenities Checklist */}
              <div className="pt-1 flex flex-wrap gap-1.5 text-slate-600 text-[11px]">
                {space.amenities.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 bg-slate-100 px-2 py-1 rounded"
                  >
                    <Check className="w-3 h-3 text-[#214FC7]" /> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Help Contact */}
            <div className="bg-[#FAF8FF] border border-slate-200 p-4 rounded-xl flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[11px] text-slate-400 font-medium">
                  공간 문의 및 안내 데스크
                </span>
                <span className="text-xs font-bold text-slate-800">
                  02-555-8900 (연결 1번)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowChatModal(true)}
                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[#214FC7] text-xs font-bold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                실시간 챗봇
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Floating Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md p-3 border-t border-slate-200 shadow-lg flex items-center gap-3">
        <div className="flex flex-col pl-1">
          <span className="text-[10px] text-slate-400">표준 환산 요금</span>
          <span className="text-sm font-extrabold text-[#214FC7]">
            {space.hourlyRate !== null ? `₩${space.hourlyRate.toLocaleString()} ` : '미확인 '}
            <span className="text-xs font-normal text-slate-500">/ 1h</span>
          </span>
        </div>
        <div className="flex-1 flex gap-2">
          <a
            href={space.googleMapPlaceUrl || space.sourceInfo?.googleMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-11 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5 text-[#214FC7]" />
            <span>길찾기</span>
          </a>
          <a
            href={space.reservationUrl || space.officialSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-11 rounded-xl bg-[#214FC7] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs cursor-pointer"
          >
            <span>{space.reservationUrl ? '예약하기' : '공식사이트'}</span>
          </a>
        </div>
      </div>

      {/* Booking & Official Site Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#214FC7]" />
                <h3 className="font-bold text-slate-900 font-heading text-base">
                  {space.name} 예약 / 공식 사이트
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#EAEDFF]/60 border border-[#DCE1FF] rounded-xl p-3.5 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-[#214FC7] block mb-1">
                📌 검증된 공식 채널 이용 안내
              </span>
              정확한 최신 이용 가격 및 공실 현황은 공식 웹사이트 및 정식 예약 플랫폼을 통해 안전하게 확인하세요.
            </div>

            <div className="flex flex-col gap-2">
              {space.reservationUrl && (
                <a
                  href={space.reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowBookingModal(false)}
                  className="w-full h-12 rounded-xl bg-[#214FC7] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-[#1a3fa2] transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>온라인 예약 페이지 바로가기</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <a
                href={space.officialSiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowBookingModal(false)}
                className={`w-full h-12 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors ${
                  space.reservationUrl
                    ? 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    : 'bg-[#214FC7] text-white hover:bg-[#1a3fa2]'
                }`}
              >
                <span>공식 웹사이트 바로가기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="w-full h-10 rounded-xl bg-slate-50 text-slate-500 text-xs font-semibold hover:bg-slate-100 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Realtime Desk Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#214FC7]" />
                <h3 className="font-bold text-slate-900 text-sm">실시간 데스크 문의</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowChatModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 leading-relaxed">
              "{space.name}" 매니저가 온라인 상태입니다. 당일 방문 투어 및 폰부스 잔여 현황 문의가 가능합니다.
            </div>

            <div className="flex flex-col gap-2">
              <a
                href="tel:02-555-8900"
                className="h-10 rounded-xl bg-[#214FC7] text-white text-xs font-bold flex items-center justify-center gap-1.5"
              >
                전화 바로 연결 (02-555-8900)
              </a>
              <button
                type="button"
                onClick={() => {
                  triggerToast('1:1 채팅 문의방이 개설되었습니다.');
                  setShowChatModal(false);
                }}
                className="h-10 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
              >
                카카오톡 채널로 문의하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
