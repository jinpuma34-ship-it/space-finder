import React, { useState } from 'react';
import { Space } from '../types';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import ponderingFaceImg from '../assets/images/pondering_face_1793186855718.jpg';

interface HomeViewProps {
  spaces: Space[];
  onStartSurvey: () => void;
  onGoToMap: (initialRegion?: string) => void;
  onSelectSpace: (space: Space) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  spaces,
  onStartSurvey,
  onGoToMap,
  onSelectSpace,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 4 registered spaces
  const popularSpaces = spaces;

  const filteredSpaces = popularSpaces.filter((sp) => {
    if (selectedCategory === 'gangnam') return sp.region.includes('강남');
    if (selectedCategory === 'seongsu') return sp.region.includes('성수');
    if (selectedCategory === 'hongdae') return sp.region.includes('홍대');
    if (selectedCategory === 'pangyo') return sp.region.includes('판교');
    return true;
  });

  return (
    <div className="flex flex-col w-full bg-white text-[#131B2E]">
      {/* 1. Hero Scattered Workspace Photo Collage Section */}
      <section className="relative w-full pt-6 pb-16 px-4 sm:px-8 overflow-hidden bg-gradient-to-b from-[#FAF8FF] via-white to-white">
        <div className="max-w-[1240px] mx-auto relative flex flex-col items-center">
          {/* Scattered Layout Container */}
          <div className="w-full relative min-h-[480px] sm:min-h-[520px] flex items-center justify-center">
            {/* Top-Left Image: Coworking Lounge */}
            <div className="absolute -top-4 sm:-top-6 left-2 sm:left-4 lg:left-6 w-[136px] sm:w-44 h-[172px] sm:h-52 rounded-2xl overflow-hidden shadow-sm border border-slate-100/80 bg-slate-100 z-10 transition-transform hover:scale-102">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZaJjhjDGxLBxyMmxFxSlsgPbyvgnOIeUDTNvcZbLncRVDVDKp_C2ba5jq2EWbH0FMf3yLQNBKmQuTodabILaPfkSAuqPwefYj2h_bHBqxHN9gAWf2fNlQU_W38I55qNUIIx-sUO6Ltu0y7SlehiAK5fQ6kv2chzyCSYoAVnTZDbUVg2-gD8YSvYtgVQlM_9rah3tUuo88dw6DJQK41qjytz-iUxkcn1PrXjRKKA2YvIx4q4zdQ2kz"
                alt="코워킹 라운지"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                코워킹 라운지
              </div>
            </div>

            {/* Top Mid-Left Image: Discussion */}
            <div className="absolute top-20 sm:top-24 left-[26%] sm:left-[24%] hidden md:block w-28 h-32 rounded-2xl overflow-hidden shadow-sm border border-slate-100/80 bg-slate-100 z-0">
              <img
                src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=1200&auto=format&fit=crop&q=80"
                alt="학습 라운지"
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Top Mid-Right Image: Office */}
            <div className="absolute top-[54px] right-[26%] sm:right-[24%] hidden md:block w-28 h-32 rounded-2xl overflow-hidden shadow-sm border border-slate-100/80 bg-slate-100 z-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxeA7lB5JUSzXHUNHlNNjoFT2VOtO--QeBnWgtekYBswuGiJeYHXeDMnQN2As9-C03MfxqJQKxOzZZWHwiUUhgigsnHT3ucOWvXxUqqs4EG2gY4XMqJEpJsZoZFLACLu4XT4Pi1kNDM8CrHre4rEVrq-pIGVSztK5-6IcdKO_D-MwcW12yaHtIv_1XhdlLnoUx77ryYZXA2plF-j6v1_0C3uWCGI2bSKl_gC2oRrxhmR_7cy1l-yIm"
                alt="오피스"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                오피스
              </div>
            </div>

            {/* Top-Right Image: Phone Booths */}
            <div className="absolute top-0 right-12 sm:right-20 lg:right-28 w-32 sm:w-40 h-40 sm:h-48 rounded-2xl overflow-hidden shadow-sm border border-slate-100/80 bg-slate-100 z-10 transition-transform hover:scale-102">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB51X2xDdlqRcr7eDNznT53NsIcFdat5QH64tmmaZB0SEZMf56mhtltyhDOXHm1Pzg-ny2e-0KLt331zYJB4vKivKCukpdQnoY44dVJJkKj4Pn3iaXqA2lu0Y1MphgzduC8fAHGrAjP1YfootTn8ICJC7x-HGfiBtWoqT5jXi1dt06wR8rRuPQVZqtdKXzA92v0SRO_i2rdMfT1J4Nwx0iOZGq77VTRWT3WAfZ0QZ0fNVmsSebV7hGC"
                alt="방음 폰부스"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                방음 폰부스
              </div>
            </div>

            {/* Bottom-Left Image: Open Desk */}
            <div className="absolute bottom-2 left-6 sm:left-12 w-36 sm:w-44 h-44 sm:h-52 rounded-2xl overflow-hidden shadow-sm border border-slate-100/80 bg-slate-100 z-10 transition-transform hover:scale-102">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC29YU1wA6rvhup14BQsgEdkx5R-OTxOOeSWEbzY0HIClgDNHkBc2rvJGw2cyoFQC9WG-m5FGoe_anUI6J-kXFLuyoh5Y-18ivcM97M1chtoELNaL2XzPxqYpGG1nYt13nK1r72mnib5o8EhSaakqFdRif8OF7WjZwZp8wVXd5BvDlNlXalWPlRnmYSNs5WD63AdqV_FSwpaKza84nFybPAmADZSA6rclr933VwFHBeDOkILpTJgYCe"
                alt="오픈 데스크"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium">
                오픈 데스크
              </div>
            </div>

            {/* Bottom-Right Compound Cluster: Study Room + Interview Booth */}
            <div className="absolute bottom-2 right-4 sm:right-10 flex items-end gap-2 z-10">
              {/* Study Room */}
              <div className="w-24 sm:w-28 h-32 sm:h-36 rounded-2xl overflow-hidden shadow-sm border border-slate-100/80 bg-slate-100 relative translate-y-[14px]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMCduu9kkUZMtjNJc8rzAjBJqME4m9eMJVMIaOi2PFRpKLmB7yN79P1E4LEqFCFr2Os1Z1MC3Ez-ZgaI0T-J8IkU5z4raZ7VYdzho9WFU17m2LU6-O43dwViX_UFjE-yzgrfmR03XvW5GXiB1s7Lp7O2rz-3bIAQWi4aEJJ3t1k4D_HaUx5mDZY1u_EwuDa6uNmlHE-Qg5Ey5U4qNWUxc7JerlP2KaL7Xe2yk7LbCzDCNz8zCI4j4q"
                  alt="팀 스터디룸"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-2 left-1.5 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium whitespace-nowrap">
                  팀 스터디룸
                </div>
              </div>

              {/* 1-Person Interview Booth */}
              <div className="w-32 sm:w-40 h-40 sm:h-48 rounded-2xl overflow-hidden shadow-sm border border-slate-100/80 bg-slate-100 relative">
                <img
                  src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80"
                  alt="1인 고정석"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium whitespace-nowrap">
                  1인 고정석
                </div>
              </div>
            </div>

            {/* Central Hero Content */}
            <div className="relative z-20 flex flex-col items-center text-center max-w-xl px-4 py-8">
              <span className="text-base sm:text-lg font-medium text-slate-700 tracking-tight mb-2">
                Space Finder
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#131B2E] font-heading mb-6 leading-tight whitespace-nowrap [text-shadow:_0_1px_12px_rgba(255,255,255,0.95),_0_2px_6px_rgba(255,255,255,0.9),_0_0_20px_rgba(255,255,255,0.85)] drop-shadow-[0_2px_8px_rgba(255,255,255,0.9)]">
                나만의 공부 공간을 찾아보세요
              </h1>

              <button
                type="button"
                onClick={onStartSurvey}
                className="px-8 py-3.5 rounded-2xl bg-[#2D62ED] hover:bg-[#1E4FD9] text-white font-bold text-base shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                맞춤 공부 장소 찾기
              </button>

              <p className="text-xs sm:text-sm text-slate-500 mt-4">
                스페이스 파인더는 내가 원하는 장소를 찾아주는 서비스입니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Staggered Oval / Capsule Photos & Big Typography Section */}
      <section className="w-full py-12 px-4 sm:px-8 max-w-[1000px] mx-auto flex flex-col gap-6 sm:gap-8 items-center">
        {/* Row 1: Left Text, Right Oval */}
        <div className="w-full flex items-center justify-center gap-4 sm:gap-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#131B2E] font-heading text-right shrink-0">
            아직 공간 고민 중이신가요?
          </h2>
          <div className="w-48 sm:w-64 h-18 sm:h-22 rounded-full overflow-hidden shadow-sm bg-slate-100 shrink-0">
            <img
              src={ponderingFaceImg}
              alt="고민하는 수강생"
              className="w-full h-full object-cover object-[center_25%]"
            />
          </div>
        </div>

        {/* Row 2: Left Oval, Right Text */}
        <div className="w-full flex items-center justify-center gap-4 sm:gap-8">
          <div className="w-48 sm:w-64 h-18 sm:h-22 rounded-full overflow-hidden shadow-sm bg-slate-100 shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB51X2xDdlqRcr7eDNznT53NsIcFdat5QH64tmmaZB0SEZMf56mhtltyhDOXHm1Pzg-ny2e-0KLt331zYJB4vKivKCukpdQnoY44dVJJkKj4Pn3iaXqA2lu0Y1MphgzduC8fAHGrAjP1YfootTn8ICJC7x-HGfiBtWoqT5jXi1dt06wR8rRuPQVZqtdKXzA92v0SRO_i2rdMfT1J4Nwx0iOZGq77VTRWT3WAfZ0QZ0fNVmsSebV7hGC"
              alt="스마트 작업 부스"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#131B2E] font-heading text-left shrink-0">
            나와 가장 잘 맞는
          </h2>
        </div>

        {/* Row 3: Left Text, Right Oval */}
        <div className="w-full flex items-center justify-center gap-4 sm:gap-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#131B2E] font-heading text-right shrink-0">
            장소에서 공부하세요
          </h2>
          <div className="w-56 sm:w-80 h-18 sm:h-22 rounded-full overflow-hidden shadow-sm bg-slate-100 shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDli3zKPMOiV3EFDgBMR8l0g25JuEw-XrVfMcR7p2KhmHK0Ub5SzieNWPGNmK6fQBOks23ue9sdc-SuE3S4xnhRvcRlj6ScduQjIRTE4MfpIGQ7QjHOicL69Ugg6_n-BCGu5GydU3gj2JYfv4IWCJObl4u0HqL6DV9wZ6JOzXmx3lKo1P5fu0OGq0VGsP25yz6LGkxW0Xd0G5KuhhYwgGpxKivg81Nw_l3xvXLOGwoK1XMLyDzrtUfY"
              alt="협업 공간"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 3. Section: ESSENTIAL EVALUATION TIERS */}
      <section className="w-full py-16 px-4 sm:px-8 max-w-[1240px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#2D62ED] tracking-wider uppercase block mb-1">
              ESSENTIAL EVALUATION TIERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#131B2E] font-heading">
              왜 부트캠프 수강생 전용 공간 탐색인가?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              일반 독서실이나 카페와는 평가 기준이 다릅니다. 매일 몰입해야 하는 개발자 부트캠프 루틴에 최적화된 3대 필터를 확인하세요.
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2D62ED]">
            <span>신뢰도 높은 현장 전수조사 데이터</span>
            <ShieldCheck className="w-4 h-4 text-[#2D62ED]" />
          </div>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-2xl bg-[#F0F4FF] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#2D62ED] shadow-2xs mb-5">
                <span className="material-symbols-outlined text-[24px]">record_voice_over</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-[#DCE7FF] text-[#2D62ED] text-[11px] font-bold">
                  필터 01
                </span>
                <span className="text-xs font-bold text-slate-800">발화 허용 등급</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading mb-2">
                눈치 없는 발화 허용 등급
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                조용한 스터디카페에서 슬랙 마이크를 켤 수 없어 곤란하셨나요? '자유 발화 가능', '속삭임 허용', '폰부스 한정 발화' 등 실제 소음 허용 기준을 단계별로 투명하게 공개합니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2D62ED]" />
                자유 발화석 비율
              </span>
              <span className="font-bold text-[#2D62ED]">총 공간의 73%</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl bg-[#F0F4FF] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#2D62ED] shadow-2xs mb-5">
                <span className="material-symbols-outlined text-[24px]">phone_in_talk</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-[#DCE7FF] text-[#2D62ED] text-[11px] font-bold">
                  필터 02
                </span>
                <span className="text-xs font-bold text-slate-800">인프라 완비</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading mb-2">
                1인 폰부스 완비 여부
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                최종 프로젝트 멘토링, 데일리 스크럼, 실시간 기술 코딩 면접에 즉시 들어갈 수 있는 독립 방음 폰부스의 실시간 보유 개수와 예약 규칙을 사전에 안내해 헛걸음을 방지합니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2D62ED]" />
                평균 부스 수용력
              </span>
              <span className="font-bold text-[#2D62ED]">지점당 3.8개</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl bg-[#F0F4FF] p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-[#2D62ED] shadow-2xs mb-5">
                <span className="material-symbols-outlined text-[24px]">calculate</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded bg-[#DCE7FF] text-[#2D62ED] text-[11px] font-bold">
                  필터 03
                </span>
                <span className="text-xs font-bold text-slate-800">가격 비교 지표</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading mb-2">
                1시간 기준 환산 요금 비교
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                월 정기권, 1일 데이패스, 4시간 패키지 등 복잡하고 상이한 가격 모델을 '1시간 단위'로 정규화하여 계산합니다. 내 하루 학습량에 딱 맞는 최적의 비용을 한눈에 대조하세요.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-600 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2D62ED]" />
                단위 요금 표시제
              </span>
              <span className="font-bold text-[#2D62ED]">100% 규격화</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: REAL-TIME RANKING */}
      <section className="w-full py-16 px-4 sm:px-8 bg-[#FAF8FF]">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#2D62ED]" />
                <span className="text-xs font-bold text-[#2D62ED] tracking-wider uppercase">
                  REAL-TIME RANKING
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#131B2E] font-heading">
                실시간 인기 부트캠프 작업 공간
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                동료 부트캠퍼들이 지금 가장 많이 체크인하고 마이크를 켜는 검증된 공간들입니다.
              </p>
            </div>

            {/* Region Filter Buttons matching Stitch */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F0F4FF] rounded-lg">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-white text-[#2D62ED] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                전체 인기순
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('gangnam')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'gangnam'
                    ? 'bg-white text-[#2D62ED] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                강남/역삼권
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('seongsu')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'seongsu'
                    ? 'bg-white text-[#2D62ED] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                성수/건대권
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('hongdae')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'hongdae'
                    ? 'bg-white text-[#2D62ED] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                홍대/마포권
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('pangyo')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'pangyo'
                    ? 'bg-white text-[#2D62ED] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                판교 테크밸리
              </button>
            </div>
          </div>

          {/* Cards Grid: 4 Cards Exactly Matching Stitch Screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredSpaces.map((space) => {
              const voiceLabel =
                space.voiceVerificationStatus === 'confirmed'
                  ? '독립실 화상회의 가능'
                  : space.voiceTierLabel || '발화 규정 확인 필요';

              const boothText =
                space.phoneBoothCount !== null
                  ? `폰부스 ${space.phoneBoothCount}개`
                  : space.phoneBoothInstalled === 'confirmed'
                  ? '폰부스 설치 확인'
                  : '폰부스 미확인';

              return (
                <div
                  key={space.id}
                  onClick={() => onSelectSpace(space)}
                  className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Thumbnail & Overlaid Badges */}
                  <div className="relative w-full h-44 overflow-hidden bg-slate-100 flex items-center justify-center">
                    {space.heroImage ? (
                      <img
                        src={space.heroImage}
                        alt={space.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center">
                        <span className="material-symbols-outlined text-3xl text-slate-300">
                          image
                        </span>
                        <span className="text-xs font-semibold text-slate-500">사진 준비 중</span>
                      </div>
                    )}

                    {/* Left Tag: Voice Tier */}
                    <div className="absolute top-2.5 left-2.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-xs text-white ${
                          space.voiceVerificationStatus === 'confirmed'
                            ? 'bg-emerald-600'
                            : 'bg-slate-700'
                        }`}
                      >
                        {voiceLabel}
                      </span>
                    </div>

                    {/* Right Tag: Phone Booth Count */}
                    <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-medium px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#2D62ED]">
                        phone_in_talk
                      </span>
                      <span>{boothText}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Distance */}
                      <div className="flex items-center text-xs text-slate-500 mb-1.5">
                        <span className="flex items-center gap-0.5 truncate">
                          <span className="material-symbols-outlined text-[14px] text-slate-400">
                            location_on
                          </span>
                          {space.transit.summary}
                        </span>
                      </div>

                      {/* Space Name */}
                      <h3 className="font-bold text-slate-900 font-heading text-sm mb-1.5 truncate group-hover:text-[#2D62ED] transition-colors">
                        {space.name}
                      </h3>

                      {/* Voice distinction row */}
                      <div className="flex flex-col gap-1 mb-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/60 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500 font-medium">발화 가능</span>
                          <span className={`font-bold truncate ${space.voiceVerificationStatus === 'confirmed' ? 'text-emerald-700' : 'text-slate-700'}`}>
                            {space.voiceVerificationStatus === 'confirmed' ? '● ' : '○ '}
                            {space.voiceTierLabel}
                          </span>
                        </div>
                        <div className="flex items-center justify-between border-t border-slate-200/50 pt-1 text-[10px]">
                          <span className="text-slate-400">장시간(6h+)</span>
                          <span className="text-amber-800 font-medium truncate">{space.longDurationVoiceLabel || '미확인'}</span>
                        </div>
                      </div>

                      {/* Highlight */}
                      <p className="text-xs text-slate-500 line-clamp-1 mb-3">
                        {space.highlights[0] || '최적의 코딩 집중 환경'}
                      </p>
                    </div>

                    {/* Bottom Pricing Row */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block leading-tight">
                          1시간 환산 요금
                        </span>
                        <span className="text-base font-extrabold text-[#2D62ED] font-heading">
                          {space.hourlyRate !== null ? `₩${space.hourlyRate.toLocaleString()}` : '미확인'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSpace(space);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-[#2D62ED] text-white hover:bg-[#1E4FD9] transition-colors text-xs font-semibold cursor-pointer"
                      >
                        상세보기
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Map Link Banner matching Stitch */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-[#EEF4FF] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-white text-[#2D62ED] flex items-center justify-center shrink-0 shadow-2xs">
                <Compass className="w-5 h-5 text-[#2D62ED]" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                  서울 및 수도권 전역 240여 개 제휴 공간 확인
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  정확한 위치, 실시간 공실 현황, 부트캠프 제휴 할인가를 인터랙티브 지도에서 둘러보세요.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onGoToMap()}
              className="px-5 py-2.5 rounded-xl bg-[#181F38] hover:bg-slate-900 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>공간 탐색 및 지도 열기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. Bottom 1-MINUTE SMART MATCH Banner */}
      <section className="w-full px-4 sm:px-8 max-w-[1240px] mx-auto my-10">
        <div className="rounded-2xl bg-[#2D62ED] text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="text-center md:text-left">
            <span className="text-[11px] font-bold text-blue-200 tracking-wider uppercase block mb-1">
              1-MINUTE SMART MATCH
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mb-2">
              원하는 지역에서 공부 장소를 찾아보세요
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
              실시간 발화 시간대와 이동 동선만 선택하면, 눈치 보지 않고 코딩할 수 있는 최적의 3곳을 알고리즘이 즉시 추출합니다.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartSurvey}
            className="px-6 py-3.5 rounded-xl bg-white text-[#2D62ED] hover:bg-blue-50 text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>3단계 맞춤 매칭 시작하기</span>
            <span className="material-symbols-outlined text-[16px] text-[#2D62ED]">bolt</span>
          </button>
        </div>
      </section>
    </div>
  );
};
