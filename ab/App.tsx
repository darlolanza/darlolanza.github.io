
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { StyleSelector } from './components/StyleSelector';
import { ImageDisplay } from './components/ImageDisplay';
import { ART_STYLES } from './constants';
import { generateImageFromPassage } from './services/geminiService';
import type { ArtStyle } from './types';

const App: React.FC = () => {
  const [passage, setPassage] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateClick = useCallback(async () => {
    if (!passage.trim() || !selectedStyle) {
      setError('Por favor, ingresa un pasaje bíblico y selecciona un estilo de arte.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageDataUrl = await generateImageFromPassage(passage, selectedStyle.prompt);
      setGeneratedImage(imageDataUrl);
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al generar la imagen. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  }, [passage, selectedStyle]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left Column: Inputs */}
          <div className="lg:w-1/2 flex flex-col gap-6">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
              <label htmlFor="passage" className="block text-lg font-semibold mb-3 text-amber-400">
                1. Ingresa un Pasaje Bíblico
              </label>
              <textarea
                id="passage"
                value={passage}
                onChange={(e) => setPassage(e.target.value)}
                placeholder="Ej: Juan 3:16, Salmo 23, o 'Porque de tal manera amó Dios al mundo...'"
                className="w-full h-36 p-3 bg-gray-700 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-300 placeholder-gray-500 text-gray-200 resize-none"
              />
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
               <h2 className="text-lg font-semibold mb-4 text-amber-400">2. Elige un Estilo Artístico</h2>
              <StyleSelector
                styles={ART_STYLES}
                selectedStyle={selectedStyle}
                onSelectStyle={setSelectedStyle}
              />
            </div>
            
            <button
              onClick={handleGenerateClick}
              disabled={isLoading || !passage || !selectedStyle}
              className="w-full bg-amber-500 text-gray-900 font-bold py-3 px-6 rounded-lg text-lg hover:bg-amber-400 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg disabled:shadow-none"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generando...
                </>
              ) : (
                'Crear Arte'
              )}
            </button>
            
          </div>

          {/* Right Column: Display */}
          <div className="lg:w-1/2">
             <div className="bg-gray-800 p-6 rounded-2xl shadow-lg h-full">
               <h2 className="text-lg font-semibold mb-4 text-amber-400">3. Tu Obra Maestra</h2>
                <ImageDisplay 
                    isLoading={isLoading} 
                    imageUrl={generatedImage} 
                    error={error} 
                />
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
