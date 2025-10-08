
import React from 'react';
import type { ArtStyle } from '../types';

interface StyleSelectorProps {
  styles: ArtStyle[];
  selectedStyle: ArtStyle | null;
  onSelectStyle: (style: ArtStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelectStyle }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
      {styles.map((style) => (
        <div
          key={style.id}
          onClick={() => onSelectStyle(style)}
          className={`relative cursor-pointer rounded-lg overflow-hidden group border-2 transition-all duration-300 ${
            selectedStyle?.id === style.id ? 'border-amber-500 scale-105 shadow-2xl' : 'border-transparent hover:border-amber-400'
          }`}
        >
          <img 
            src={style.imageUrl} 
            alt={style.name} 
            className="w-full h-24 object-cover group-hover:scale-110 transition-transform duration-300" 
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-40 transition-colors duration-300 flex items-center justify-center p-2">
            <span className="text-white text-center font-semibold text-sm drop-shadow-md">
              {style.name}
            </span>
          </div>
           {selectedStyle?.id === style.id && (
            <div className="absolute top-1 right-1 bg-amber-500 rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
