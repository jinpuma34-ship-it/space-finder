import React from 'react';
import { X, CheckCircle2, AlertCircle, Sparkles, Bookmark, Lightbulb, Target, ArrowRight } from 'lucide-react';

interface PrdReviewModalProps {
  onClose: () => void;
}

export const PrdReviewModal: React.FC<PrdReviewModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/80 flex items-center justify-between bg-gradient-to-r from-[#FAF8FF] to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#214FC7] text-white flex items-center justify-center shadow-xs">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 font-heading text-base">
                기획 검토 피드백: "관심 공간 찜하기" 넣는 것이 맞을까요?
              </h3>
              <p className="text-xs text-slate-500">
                PRD 핵심 질문에 대한 시니어 프로덕트 매니저(PM) 관점의 분석 및 구현 전략
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 text-sm text-slate-700 leading-relaxed">
          {/* Question Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-bold text-slate-400 block mb-1">PRD 기획 질문</span>
            <blockquote className="text-slate-800 font-semibold italic">
              "관심 공간 찜하기: 결정을 미루고 저장만 한 채 이탈하는 행동을 방지하기 위해 제외합니다. -&gt; 저는 넣고 싶은데 제외하는 게 맞을까요??"
            </blockquote>
          </div>

          {/* Conclusion Highlight */}
          <div className="p-4 rounded-xl bg-[#EAEDFF] border border-[#DCE1FF] flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#214FC7] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-[#214FC7] text-sm">
                결론: 네, MVP에 "비교형 찜하기" 형태로 꼭 포함하는 것을 강력 권장합니다!
              </h4>
              <p className="text-xs text-slate-700 mt-1">
                사용자의 고민("결정을 미루고 이탈할까 봐")은 <strong>단순 저장(Bookmarking)</strong>일 때 발생하는 문제입니다. 하지만 부트캠프 수강생은 매일 8시간씩 3~6개월을 다닐 고관여 상품을 선택하기 때문에, <strong>"최종 후보 2~3곳을 담아두고 시간당 요금과 폰부스를 맞비교(Compare)"</strong>할 수 있는 경로가 있어야 오히려 빠른 결정을 내립니다.
              </p>
            </div>
          </div>

          {/* 3 Core Reasons */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-slate-900 font-heading text-sm flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#214FC7]" />
              찜하기 기능을 넣어야 하는 3가지 핵심 근거
            </h4>

            <div className="grid grid-cols-1 gap-2.5">
              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white">
                <span className="text-xs font-bold text-[#214FC7] block mb-0.5">
                  1. 고관여 결정(High-involvement decision)의 특성
                </span>
                <p className="text-xs text-slate-600">
                  스터디카페/공유오피스는 한 번에 10~25만 원 상당의 정기권이나 패키지를 결제합니다. 쇼핑몰처럼 1분 만에 충동 구매하기 어렵고, 집과의 도보 거리나 폰부스 예약 규칙을 최소 2곳 이상 비교한 뒤 결정합니다.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white">
                <span className="text-xs font-bold text-[#214FC7] block mb-0.5">
                  2. 재방문 수강생의 재검색 피로도(Search Fatigue) 제거
                </span>
                <p className="text-xs text-slate-600">
                  찜 기능이 없으면 다음 날 다시 들어왔을 때 설문을 처음부터 다시 하거나 지도를 일일이 확대해 찾아야 합니다. 찜한 목록이 있으면 1초 만에 길찾기나 예약 링크로 직행합니다.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200/80 bg-white">
                <span className="text-xs font-bold text-[#214FC7] block mb-0.5">
                  3. 본 앱에 적용된 스마트 해결책 (이탈 방지 UI)
                </span>
                <p className="text-xs text-slate-600">
                  저장 모달(저장한 공간) 안에서 <strong>1시간 환산 요금과 폰부스 개수를 즉시 한눈에 비교</strong>하고, 바로 <strong>[상세보기 / 길찾기]</strong> 버튼을 배치하여 저장만 하고 나가지 않고 바로 액션으로 이어지도록 설계했습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            상단 바와 상세 페이지에서 언제든 찜하기를 테스트해 보세요.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#214FC7] text-white text-xs font-bold hover:bg-[#1a3fa2] transition-colors"
          >
            확인 및 서비스 이용하기
          </button>
        </div>
      </div>
    </div>
  );
};
