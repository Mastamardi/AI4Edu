import { TranslationRequest, TranslationResponse, TranslationError } from '../types/translator';

/**
 * Translation service using the MyMemory Translation API (free, no API key required)
 * Docs: https://mymemory.translated.net/doc/spec.php
 */
export class TranslationService {
  static async translate(request: TranslationRequest): Promise<TranslationResponse | TranslationError> {
    try {
      const { text, sourceLanguage, targetLanguage } = request;
      
      if (!text || text.trim().length === 0) {
        return {
          message: 'Please enter text to translate',
          code: 'EMPTY_INPUT'
        };
      }
      
      if (sourceLanguage === targetLanguage) {
        return {
          message: 'Source and target languages cannot be the same',
          code: 'SAME_LANGUAGES'
        };
      }

      // MyMemory API endpoint
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        return {
          message: 'Translation API error. Please try again.',
          code: 'API_ERROR'
        };
      }
      
      const data = await response.json();
      
      if (data.responseStatus === 403) {
        return {
          message: 'Translation limit reached. Please try again later.',
          code: 'RATE_LIMIT'
        };
      }
      
      if (data.responseStatus !== 200) {
        return {
          message: data.responseDetails || 'Translation failed. Please try again.',
          code: 'API_ERROR'
        };
      }
      
      return {
        translatedText: data.responseData.translatedText,
        sourceLanguage,
        targetLanguage,
        confidence: data.responseData.match || 0.8
      };
      
    } catch (error) {
      console.error('Translation error:', error);
      return {
        message: 'Translation service is temporarily unavailable. Please try again.',
        code: 'SERVICE_ERROR'
      };
    }
  }

  static async detectLanguage(text: string): Promise<string> {
    // MyMemory doesn't have a detect endpoint, so we'll use a simple heuristic
    if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Devanagari
    if (/[\u0980-\u09FF]/.test(text)) return 'bn'; // Bengali
    if (/[\u0A00-\u0A7F]/.test(text)) return 'pa'; // Gurmukhi
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu'; // Gujarati
    if (/[\u0B00-\u0B7F]/.test(text)) return 'or'; // Odia
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'; // Tamil
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te'; // Telugu
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kn'; // Kannada
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ml'; // Malayalam
    if (/[\u0600-\u06FF]/.test(text)) return 'ur'; // Arabic (Urdu)
    
    return 'en'; // Default to English
  }
}

export default TranslationService; 