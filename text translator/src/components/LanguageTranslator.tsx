import React, { useState, useCallback, useEffect } from 'react';
import { Copy, RotateCcw, Loader2, AlertCircle } from 'lucide-react';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../data/languages';
import { TranslationService } from '../services/translationService';
import { TranslatorState } from '../types/translator';

const LanguageTranslator: React.FC = () => {
  // Component state
  const [state, setState] = useState<TranslatorState>({
    inputText: '',
    outputText: '',
    sourceLanguage: 'en',
    targetLanguage: 'hi',
    isTranslating: false,
    error: null,
    lastTranslated: ''
  });

  // Auto-translate on input change (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (state.inputText.trim() && state.inputText !== state.lastTranslated) {
        handleTranslate();
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timeoutId);
  }, [state.inputText, state.sourceLanguage, state.targetLanguage]);

  // Handle translation
  const handleTranslate = useCallback(async () => {
    if (!state.inputText.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter text to translate' }));
      return;
    }

    if (state.sourceLanguage === state.targetLanguage) {
      setState(prev => ({ ...prev, error: 'Source and target languages cannot be the same' }));
      return;
    }

    setState(prev => ({ 
      ...prev, 
      isTranslating: true, 
      error: null,
      outputText: ''
    }));

    try {
      const result = await TranslationService.translate({
        text: state.inputText,
        sourceLanguage: state.sourceLanguage,
        targetLanguage: state.targetLanguage
      });

      if ('translatedText' in result) {
        setState(prev => ({
          ...prev,
          outputText: result.translatedText,
          isTranslating: false,
          lastTranslated: state.inputText,
          error: null
        }));
      } else {
        setState(prev => ({
          ...prev,
          isTranslating: false,
          error: result.message
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isTranslating: false,
        error: 'Translation failed. Please try again.'
      }));
    }
  }, [state.inputText, state.sourceLanguage, state.targetLanguage]);

  // Handle copy output
  const handleCopyOutput = useCallback(async () => {
    if (!state.outputText) return;

    try {
      await navigator.clipboard.writeText(state.outputText);
      // Show success feedback (you could add a toast notification here)
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }, [state.outputText]);

  // Handle clear all
  const handleClearAll = useCallback(() => {
    setState({
      inputText: '',
      outputText: '',
      sourceLanguage: 'en',
      targetLanguage: 'hi',
      isTranslating: false,
      error: null,
      lastTranslated: ''
    });
  }, []);

  // Handle swap languages
  const handleSwapLanguages = useCallback(() => {
    setState(prev => ({
      ...prev,
      sourceLanguage: prev.targetLanguage,
      targetLanguage: prev.sourceLanguage,
      inputText: prev.outputText,
      outputText: prev.inputText,
      lastTranslated: prev.outputText
    }));
  }, []);

  // Handle input change
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(prev => ({ ...prev, inputText: e.target.value, error: null }));
  }, []);

  // Handle language change
  const handleLanguageChange = useCallback((type: 'source' | 'target', value: string) => {
    setState(prev => ({
      ...prev,
      [type === 'source' ? 'sourceLanguage' : 'targetLanguage']: value,
      error: null
    }));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8">
      {/* Language Selection Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Source Language */}
        <div>
          <label htmlFor="sourceLanguage" className="block text-sm font-medium text-gray-700 mb-2">
            From Language
          </label>
          <select
            id="sourceLanguage"
            value={state.sourceLanguage}
            onChange={(e) => handleLanguageChange('source', e.target.value)}
            className="language-select"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex items-end justify-center">
          <button
            onClick={handleSwapLanguages}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title="Swap languages"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Target Language */}
        <div>
          <label htmlFor="targetLanguage" className="block text-sm font-medium text-gray-700 mb-2">
            To Language
          </label>
          <select
            id="targetLanguage"
            value={state.targetLanguage}
            onChange={(e) => handleLanguageChange('target', e.target.value)}
            className="language-select"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name} ({lang.nativeName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Display */}
      {state.error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-red-700 text-sm">{state.error}</span>
        </div>
      )}

      {/* Translation Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Area */}
        <div>
          <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-2">
            Input Text
          </label>
          <textarea
            id="inputText"
            value={state.inputText}
            onChange={handleInputChange}
            placeholder={`Enter text in ${getLanguageByCode(state.sourceLanguage)?.name || 'selected language'}...`}
            className="text-area min-h-[200px]"
            rows={8}
          />
          <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
            <span>{state.inputText.length} characters</span>
            <span>{state.inputText.split(' ').filter(word => word.length > 0).length} words</span>
          </div>
        </div>

        {/* Output Area */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="outputText" className="block text-sm font-medium text-gray-700">
              Translated Text
            </label>
            <div className="flex gap-2">
              {state.outputText && (
                <button
                  onClick={handleCopyOutput}
                  className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                  title="Copy translated text"
                >
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              )}
            </div>
          </div>
          <div className="relative">
            <textarea
              id="outputText"
              value={state.outputText}
              readOnly
              placeholder="Translation will appear here..."
              className="text-area min-h-[200px] bg-gray-50"
              rows={8}
            />
            {state.isTranslating && (
              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-lg">
                <div className="flex items-center gap-2 text-primary-600">
                  <Loader2 className="w-5 h-5 loading-spinner" />
                  <span>Translating...</span>
                </div>
              </div>
            )}
          </div>
          <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
            <span>{state.outputText.length} characters</span>
            <span>{state.outputText.split(' ').filter(word => word.length > 0).length} words</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleTranslate}
          disabled={state.isTranslating || !state.inputText.trim()}
          className="btn-primary flex items-center justify-center gap-2"
        >
          {state.isTranslating ? (
            <>
              <Loader2 className="w-5 h-5 loading-spinner" />
              Translating...
            </>
          ) : (
            'Translate'
          )}
        </button>
        
        <button
          onClick={handleClearAll}
          className="btn-secondary flex items-center justify-center gap-2"
        >
          Clear All
        </button>
      </div>

      {/* Features Info */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">✨ Features</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Real-time translation with 1-second debounce</li>
          <li>• Support for 13+ major Indian languages</li>
          <li>• Handles conversational, technical, and academic text</li>
          <li>• Responsive design for desktop and mobile</li>
          <li>• Easy copy functionality for translated text</li>
        </ul>
      </div>
    </div>
  );
};

export default LanguageTranslator; 