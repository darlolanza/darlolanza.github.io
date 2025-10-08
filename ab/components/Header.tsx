
import React from 'react';

const BrushIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 4.5A2.5 2.5 0 0 0 16.5 2H13v3.542l4.89 4.89a2.5 2.5 0 0 0 0-3.536L19 5.89V4.5zM3.5 12a1.5 1.5 0 0 0-1.06 2.56l7.952 7.953a1.5 1.5 0 0 0 2.122 0l7.952-7.953A1.5 1.5 0 0 0 20.5 12h-17zM11 2h- теории .5a2.5 2.5 0 0 0-2.5 2.5V11h5V2z"/>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-6 text-center shadow-lg border-b border-gray-700">
      <div className="flex items-center justify-center gap-4">
        <BrushIcon className="w-10 h-10 text-amber-400" />
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Generador de Arte Bíblico AI
        </h1>
      </div>
      <p className="mt-2 text-lg text-gray-400">
        Transforma la Escritura en impresionantes obras de arte visual.
      </p>
    </header>
  );
};
