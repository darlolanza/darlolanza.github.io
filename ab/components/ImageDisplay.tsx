
import React from 'react';

interface ImageDisplayProps {
  isLoading: boolean;
  imageUrl: string | null;
  error: string | null;
}

const PlaceholderIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
);


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ isLoading, imageUrl, error }) => {
  const loadingMessages = [
    "Consultando a los maestros del arte...",
    "Mezclando la paleta de colores divinos...",
    "El pincel digital está en movimiento...",
    "Dando forma a la inspiración...",
    "Renderizando la visión celestial...",
    "Añadiendo los últimos detalles..."
  ];
  const [currentMessage, setCurrentMessage] = React.useState(loadingMessages[0]);

  React.useEffect(() => {
    if (isLoading) {
      const intervalId = setInterval(() => {
        setCurrentMessage(prev => {
          const currentIndex = loadingMessages.indexOf(prev);
          const nextIndex = (currentIndex + 1) % loadingMessages.length;
          return loadingMessages[nextIndex];
        });
      }, 2500);
      return () => clearInterval(intervalId);
    }
  }, [isLoading]);


  return (
    <div className="aspect-square w-full bg-gray-700/50 rounded-lg flex items-center justify-center p-4 border-2 border-dashed border-gray-600">
      {isLoading && (
        <div className="text-center">
            <div className="relative h-16 w-16 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-amber-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-t-4 border-amber-500 rounded-full animate-spin"></div>
            </div>
          <p className="text-lg font-semibold text-amber-400">Creando tu imagen...</p>
          <p className="text-gray-400 mt-1">{currentMessage}</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="text-center text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-semibold">¡Error!</p>
          <p>{error}</p>
        </div>
      )}

      {!isLoading && !imageUrl && !error && (
        <div className="text-center text-gray-500">
          <PlaceholderIcon className="w-20 h-20 mx-auto mb-4" />
          <p className="text-lg font-semibold">Tu imagen aparecerá aquí.</p>
          <p>Completa los pasos y haz clic en "Crear Arte".</p>
        </div>
      )}

      {imageUrl && !isLoading && (
        <img
          src={imageUrl}
          alt="Generated biblical art"
          className="w-full h-full object-contain rounded-md animate-fade-in"
          style={{ animation: 'fadeIn 0.5s ease-in-out' }}
        />
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};
