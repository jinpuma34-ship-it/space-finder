import React from 'react';
import { Space } from '../types';
import { X, Bookmark, Trash2, ArrowRight, PhoneCall } from 'lucide-react';

interface SavedSpacesModalProps {
  savedSpaces: Space[];
  onClose: () => void;
  onSelectSpace: (space: Space) => void;
  onRemoveBookmark: (spaceId: string) => void;
  onOpenPrdReview?: () => void;
}

export const SavedSpacesModal: React.FC<SavedSpacesModalProps> = ({
  savedSpaces,
  onClose,
  onSelectSpace,
  onRemoveBookmark,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#214FC7] text-white flex items-center justify-center">
              <Bookmark className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 font-heading text-base">
                저장한 관심 공간 ({savedSpaces.length})
              </h3>
              <p className="text-xs text-slate-500">
                찜해둔 후보 공간의 시간당 환산 요금과 폰부스를 한눈에 비교해 보세요.
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


        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
          {savedSpaces.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center text-slate-400">
              <Bookmark className="w-10 h-10 stroke-1 mb-2 text-slate-300" />
              <p className="text-sm font-semibold text-slate-600">아직 저장한 공간이 없습니다</p>
              <p className="text-xs text-slate-400 mt-1">
                목록이나 상세 화면에서 북마크 아이콘을 눌러 후보 공간을 담아보세요.
              </p>
            </div>
          ) : (
            savedSpaces.map((space) => (
              <div
                key={space.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {space.heroImage ? (
                    <img
                      src={space.heroImage}
                      alt={space.name}
                      className="w-16 h-16 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] text-slate-400 font-medium shrink-0">
                      사진 준비 중
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm truncate font-heading">
                      {space.name}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">{space.transit.summary}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-extrabold text-[#214FC7]">
                        {space.hourlyRate !== null ? `₩${space.hourlyRate.toLocaleString()} / 1h` : '시간당 요금 미확인'}
                      </span>
                      <span className="text-[11px] text-slate-400">·</span>
                      <span className="text-[11px] text-slate-600 flex items-center gap-0.5">
                        <PhoneCall className="w-3 h-3 text-blue-600" />{' '}
                        {space.phoneBoothCount !== null
                          ? `폰부스 ${space.phoneBoothCount}개`
                          : space.phoneBoothInstalled === 'confirmed'
                          ? '폰부스 있음(총 수량 미확인)'
                          : '폰부스 미확인'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => onRemoveBookmark(space.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="저장 취소"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectSpace(space);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#214FC7] hover:bg-[#1a3fa2] text-white text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>상세보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
