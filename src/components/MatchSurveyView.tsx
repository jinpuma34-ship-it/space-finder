import React, { useState } from 'react';
import { Space, VoiceTier } from '../types';
import { Search, X, Check, ArrowRight, RotateCcw, Volume2, Mic, VolumeX, PhoneCall, ShieldCheck } from 'lucide-react';

interface MatchSurveyViewProps {
  spaces: Space[];
  onCompleteSurvey: (criteria: {
    region: string;
    voiceTier: VoiceTier;
    boothRequired: boolean;
  }) => void;
}

export const MatchSurveyView: React.FC<MatchSurveyViewProps> = ({
  spaces,
  onCompleteSurvey,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('강남/역삼');
  const [regionInput, setRegionInput] = useState<string>('강남/역삼');
  const [selectedVoice, setSelectedVoice] = useState<VoiceTier>('free');
  const [boothRequired, setBoothRequired] = useState<boolean>(true);

  const regionChips = [
    '강남/역삼',
    '성수/서울숲',
    '홍대/합정',
    '판교',
    '영등포/여의도',
    '신촌/이대',
  ];

  // Calculate live matching count
  const matchedSpaces = spaces.filter((sp) => {
    // Region match
    const reg = selectedRegion || regionInput;
    const matchReg =
      sp.region.includes(reg) ||
      reg.includes(sp.region) ||
      sp.address.includes(reg);

    // Voice match
    let matchVoice = true;
    if (selectedVoice === 'free') {
      matchVoice = sp.voiceTier === 'free' || sp.voiceVerificationStatus === 'confirmed';
    } else if (selectedVoice === 'booth_only') {
      matchVoice =
        sp.voiceTier === 'free' ||
        sp.voiceVerificationStatus === 'confirmed' ||
        sp.voiceTier === 'booth_only';
    }

    // Booth match
    let matchBooth = true;
    if (boothRequired) {
      matchBooth =
        (sp.phoneBoothCount !== null && sp.phoneBoothCount >= 1) ||
        sp.phoneBoothInstalled === 'confirmed';
    }

    return (matchReg || reg === '') && matchVoice && matchBooth;
  });

  const handleSelectChip = (chip: string) => {
    setSelectedRegion(chip);
    setRegionInput(chip);
  };

  const handleReset = () => {
    setSelectedRegion('강남/역삼');
    setRegionInput('강남/역삼');
    setSelectedVoice('free');
    setBoothRequired(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCompleteSurvey({
      region: selectedRegion || regionInput || '강남/역삼',
      voiceTier: selectedVoice,
      boothRequired,
    });
  };

  return (
    <div className="relative w-full py-12 px-4 sm:px-8 flex items-center justify-center min-h-[calc(100vh-64px)] bg-[#FAF8FF]">
      {/* Ambient Atmospheric Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-[#214FC7]/10 via-[#4169E1]/5 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="relative w-full max-w-[700px] flex flex-col gap-6">
        {/* Top Wizard Tracker Header */}
        <header className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAEDFF] rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#214FC7] animate-pulse" />
              <span className="text-xs font-semibold text-[#214FC7] tracking-wide">
                30초 맞춤 매칭
              </span>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              <span className="text-[#214FC7] text-base font-bold">1</span> / 3 단계
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline justify-between">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#131B2E] font-heading tracking-tight">
                수강 환경 맞춤 공간 검색
              </h1>
              <span className="text-xs text-slate-400 hidden sm:inline">
                실시간 발화 & 폰부스 정밀 필터
              </span>
            </div>
            <p className="text-sm text-slate-600">
              매일 노트북과 헤드셋을 챙기는 개발자를 위한 노이즈 프리존
            </p>
          </div>

          {/* Stepper Progress Bars */}
          <div className="grid grid-cols-3 gap-2 mt-1">
            <div className="h-1.5 rounded-full bg-[#214FC7] transition-all" />
            <div className="h-1.5 rounded-full bg-[#214FC7] transition-all" />
            <div className="h-1.5 rounded-full bg-[#214FC7] transition-all" />
          </div>

          {/* Step Labels */}
          <div className="flex justify-between items-center text-xs text-slate-500 px-1 pt-1">
            <span className="text-[#214FC7] font-bold">1. 동네 선택</span>
            <span className="text-[#214FC7] font-bold">2. 발화 수준</span>
            <span className="text-[#214FC7] font-bold">3. 폰부스 필요</span>
          </div>
        </header>

        {/* Central Form Card */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 sm:p-8 flex flex-col gap-7"
        >
          {/* STEP 1: REGION SELECTOR */}
          <section className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EAEDFF] text-[#214FC7] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                01
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-heading">
                  어느 동네 근처를 찾으시나요?
                </h2>
                <p className="text-xs text-slate-500">
                  캠퍼스, 지하철역, 집 근처 도보권 거점을 선택해주세요.
                </p>
              </div>
            </div>

            {/* Search Input Box */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={regionInput}
                onChange={(e) => {
                  setRegionInput(e.target.value);
                  setSelectedRegion(e.target.value);
                }}
                placeholder="동네, 역 이름 또는 도로명 검색 (예: 강남역, 성수동)"
                className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl text-sm focus:bg-white focus:border-[#214FC7] focus:ring-2 focus:ring-[#214FC7]/10 transition-all outline-none font-medium"
              />
              {regionInput && (
                <button
                  type="button"
                  onClick={() => {
                    setRegionInput('');
                    setSelectedRegion('');
                  }}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Curated Region Chips */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">수강생 인기 밀집 권역</span>
                <span className="text-[#214FC7] font-semibold flex items-center gap-1">
                  실시간 추천
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {regionChips.map((chip) => {
                  const isActive = selectedRegion === chip;
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleSelectChip(chip)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#214FC7] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      }`}
                    >
                      <span>{chip}</span>
                      {isActive && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-slate-100 w-full" />

          {/* STEP 2: VOICE LEVEL */}
          <section className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EAEDFF] text-[#214FC7] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                02
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 font-heading">
                    수업 중 말을 얼마나 하시나요?
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-semibold">
                    핵심 필터
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  눈치 보지 않고 말할 수 있는 음향 허용 기준 공간을 매칭합니다.
                </p>
              </div>
            </div>

            {/* Voice Radio Cards */}
            <div className="flex flex-col gap-3">
              {/* Option A: Free Speech */}
              <label
                onClick={() => setSelectedVoice('free')}
                className={`relative block p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedVoice === 'free'
                    ? 'border-[#214FC7] bg-[#EAEDFF]/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5 ${
                      selectedVoice === 'free' ? 'bg-[#214FC7]' : 'border-2 border-slate-300'
                    }`}
                  >
                    {selectedVoice === 'free' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#214FC7]">
                          자유롭게 대화 필요
                        </span>
                        <span className="px-1.5 py-0.2 rounded bg-[#214FC7] text-white text-[10px] font-bold">
                          추천
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#214FC7] flex items-center gap-1">
                        <Volume2 className="w-3.5 h-3.5" /> 마이크 상시 ON
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">
                      코드 리뷰, 짝 프로그래밍, 데일리 스크럼
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      카페 소음 수준(50~65dB)이 자연스럽게 허용되는 오픈형 데스크 및 토론 구역
                    </p>
                  </div>
                </div>
              </label>

              {/* Option B: Intermittent Speech */}
              <label
                onClick={() => setSelectedVoice('booth_only')}
                className={`relative block p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedVoice === 'booth_only'
                    ? 'border-[#214FC7] bg-[#EAEDFF]/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5 ${
                      selectedVoice === 'booth_only' ? 'bg-[#214FC7]' : 'border-2 border-slate-300'
                    }`}
                  >
                    {selectedVoice === 'booth_only' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-800">
                        질문이나 답변만 말하면 됨
                      </span>
                      <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                        <Mic className="w-3.5 h-3.5" /> 간헐적 질의
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-700">
                      간헐적인 질의응답 및 멘토 피드백 수신
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      낮은 목소리 발화가 가능하거나 라운지 통화 가능 구역이 분리된 복합형 공간
                    </p>
                  </div>
                </div>
              </label>

              {/* Option C: Silent Typing Only */}
              <label
                onClick={() => setSelectedVoice('silent')}
                className={`relative block p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedVoice === 'silent'
                    ? 'border-[#214FC7] bg-[#EAEDFF]/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0 mt-0.5 ${
                      selectedVoice === 'silent' ? 'bg-[#214FC7]' : 'border-2 border-slate-300'
                    }`}
                  >
                    {selectedVoice === 'silent' && <Check className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-800">
                        듣기만 하면 됨 (타자만 침)
                      </span>
                      <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                        <VolumeX className="w-3.5 h-3.5" /> 무음 집중
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-700">
                      강의 수강, 개별 과제 및 알고리즘 풀이
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      초저소음 스터디존 위주, 키보드 타이핑 소음만 허용되는 집중형 스터디카페
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-slate-100 w-full" />

          {/* STEP 3: PHONE BOOTH REQUIREMENT */}
          <section className="flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-[#EAEDFF] text-[#214FC7] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                03
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 font-heading">
                    폰부스가 꼭 있어야 하나요?
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                    방음 필수
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  긴급 면접, 1:1 상담, 카메라 켜진 비밀 화상 회의용 독립 부스 여부입니다.
                </p>
              </div>
            </div>

            {/* Booth Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Option 1: Essential */}
              <label
                onClick={() => setBoothRequired(true)}
                className={`relative p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all cursor-pointer ${
                  boothRequired
                    ? 'border-[#214FC7] bg-[#EAEDFF]/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#DCE1FF] text-[#214FC7] flex items-center justify-center">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${
                      boothRequired ? 'bg-[#214FC7]' : 'border-2 border-slate-300'
                    }`}
                  >
                    {boothRequired && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#214FC7]">꼭 있어야 함 (필수)</p>
                  <p className="text-xs font-medium text-slate-800 mt-0.5">
                    면접 · 1:1 코드 리뷰 · 실시간 화상 회의
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    방음 부스 최소 1개 이상 보유 공간만 필터
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1 text-[11px] font-semibold text-[#214FC7]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>부스 대기 현황 정보 제공</span>
                </div>
              </label>

              {/* Option 2: Optional */}
              <label
                onClick={() => setBoothRequired(false)}
                className={`relative p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all cursor-pointer ${
                  !boothRequired
                    ? 'border-[#214FC7] bg-[#EAEDFF]/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${
                      !boothRequired ? 'bg-[#214FC7]' : 'border-2 border-slate-300'
                    }`}
                  >
                    {!boothRequired && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">없어도 됨 (상관없음)</p>
                  <p className="text-xs font-medium text-slate-700 mt-0.5">
                    오픈 데스크 발화 공간이면 충분
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    부스 없는 대신 가성비 좋은 공간 포함
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1 text-[11px] text-slate-500">
                  <span>1시간 환산 평균 ₩1,800~</span>
                </div>
              </label>
            </div>
          </section>

          {/* Dynamic Match Count Preview */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EAEDFF] text-[#214FC7] flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block">현재 조건 매칭 공간</span>
                <span className="text-base font-extrabold text-[#214FC7]">
                  {Math.max(matchedSpaces.length, 1)}곳 발견됨
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-500">실시간 정규화 요금순</span>
          </div>

          {/* Primary Submit Action */}
          <div className="flex flex-col gap-2 pt-1">
            <button
              type="submit"
              className="w-full h-14 bg-[#214FC7] hover:bg-[#1a3fa2] text-white rounded-xl font-bold text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>추천 공간 보러가기</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="py-2 text-xs text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 transition-colors self-center cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>조건 초기화</span>
            </button>
          </div>
        </form>

        {/* Verified Social Proof Banner */}
        <footer className="p-4 bg-[#EAEDFF]/60 border border-[#DCE1FF] rounded-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#214FC7] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">수강생 실측 노이즈 검증 완료</p>
              <p className="text-[11px] text-slate-600 mt-0.5">
                약 1,200여 명의 부트캠프 수강생이 검증한 최적의 공간으로 즉시 필터링됩니다.
              </p>
            </div>
          </div>
          <div className="hidden sm:flex flex-col text-right shrink-0">
            <span className="text-xs font-bold text-[#214FC7]">정확도 98.4%</span>
            <span className="text-[10px] text-slate-400">소음 리포트 기준</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
