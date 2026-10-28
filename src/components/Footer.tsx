import React from 'react';

interface FooterProps {
  onOpenPrdReviewModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrdReviewModal }) => {
  return (
    <footer className="w-full bg-[#FAF8FF] border-t border-slate-200/80 py-6">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left copyright and logo */}
        <div className="flex items-center gap-3">
          <img
            alt="Space Finder"
            className="h-5 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCs_5TH4FnboXVAuING_Dx6QvmoJq8VtLwOTg4f6TNQ7MsfZDyP0K58ulRSNR_Xp6-sf34rM2gaxNJF_4QhkRrGipZWRG6dj3p8zFLS4hDEYKie0B3hBbyAkGvVO-lqA_ccQhfXAhrNWbemSgnNRbPfyb6vyRIH08IPT5GApidHdxFmD8xnZ_3vdPqZFK920FDIHe4oU8uH7p0-6J2XtRgvhDNaIVfhKwqBZcgSPYE9NRJlKroj1plL2GGFC8XE5wTMyw"
          />
          <span className="text-slate-300">|</span>
          <p className="text-xs text-slate-500">
            © 2025 Space Finder. 모든 권리 보유.
          </p>
        </div>

        {/* Right navigation links */}
        <div className="flex items-center gap-5 text-xs text-slate-600">
          <button
            onClick={onOpenPrdReviewModal}
            className="text-[#4169E1] font-semibold hover:underline cursor-pointer"
          >
            기획 피드백
          </button>
          <a href="#about" className="hover:text-slate-900 transition-colors">
            서비스 소개
          </a>
          <a href="#contact" className="hover:text-slate-900 transition-colors">
            문의하기
          </a>
          <a href="#terms" className="hover:text-slate-900 transition-colors">
            이용약관
          </a>
          <a href="#privacy" className="hover:text-slate-900 transition-colors">
            개인정보처리방침
          </a>
        </div>
      </div>
    </footer>
  );
};
