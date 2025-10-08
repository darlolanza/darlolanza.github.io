
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateImageFromPassage = async (passage: string, style: string): Promise<string> => {
  try {
    const detailedPrompt = `Genera una imagen visualmente impactante y espiritualmente resonante inspirada en el pasaje bíblico: "${passage}". El estilo artístico debe ser ${style}. Concéntrate en capturar los temas centrales y las emociones del texto con reverencia e integridad artística, creando una obra maestra visual.`;

    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: detailedPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0 && response.generatedImages[0].image.imageBytes) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
      throw new Error("La API no devolvió una imagen válida.");
    }
  } catch (error) {
    console.error("Error generating image with Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Fallo en la generación de imágenes: ${error.message}`);
    }
    throw new Error("Un error desconocido ocurrió durante la generación de la imagen.");
  }
};
