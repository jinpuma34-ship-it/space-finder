import React, { useState } from 'react';
import { Space } from '../types';
import { X, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface PhotoModalProps {
  space: Space;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ space, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const images = space.galleryImages;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white max-w-5xl mx-auto w-full py-2">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" />
          <span className="font-bold text-sm sm:text-base font-heading">
            {space.name} 사진 갤러리
          </span>
          <span className="text-xs text-slate-400 ml-2">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Frame */}
      <div className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full my-4 overflow-hidden">
        <img
          src={images[currentIndex]?.url || space.heroImage}
          alt={images[currentIndex]?.alt || space.name}
          className="max-h-[70vh] max-w-full rounded-xl object-contain shadow-2xl"
        />

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer backdrop-blur-xs"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-colors cursor-pointer backdrop-blur-xs"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Caption & Thumbnails */}
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center gap-3">
        <p className="text-xs sm:text-sm text-slate-200 text-center font-medium max-w-2xl bg-black/40 px-4 py-2 rounded-xl backdrop-blur-xs">
          {images[currentIndex]?.caption}
        </p>

        {/* Thumbnail Strip */}
        <div className="flex items-center gap-2 overflow-x-auto py-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                currentIndex === i
                  ? 'border-blue-500 scale-105'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
