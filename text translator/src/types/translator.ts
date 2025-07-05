// Language interface for supported languages
export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag?: string;
}

// Translation request interface
export interface TranslationRequest {
  text: string;
  sourceLanguage: string;
  targetLanguage: string;
}

// Translation response interface
export interface TranslationResponse {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence?: number;
}

// Translation error interface
export interface TranslationError {
  message: string;
  code?: string;
}

// Component state interface
export interface TranslatorState {
  inputText: string;
  outputText: string;
  sourceLanguage: string;
  targetLanguage: string;
  isTranslating: boolean;
  error: string | null;
  lastTranslated: string;
} 